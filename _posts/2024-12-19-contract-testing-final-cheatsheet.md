---
title: "Contract Testing: The final cheatsheet"
categories:
  - Contract Testing
tags:
  - Adoption
  - PactFlow
  - pact
toc: true
toc_label: "Table of contents"
toc_sticky: true
excerpt: "Key points to consider adoption of contract testing, covering both kind of strategies (consumer driven & bi-directional)."
header:
  overlay_image: /assets/images/header-contract-testing-cheatsheet.png
  overlay_filter: 0.6
  teaser: /assets/images/teaser-contract-testing-cheatsheet.png
---
# Introduction

This article will summarize **what Contract Testing is and the differences between the two main testing strategies**. After reading it, you'll have _(hopefully)_ enough information to determine if one of them is a good match for your project.

Contract Testing focuses on **verifying the interactions between different components**, whether in a microservices architecture (the most common context) or any other kind of distributed environment. Unlike traditional integration testing, it does not test the entire system together. Instead, it validates that each service (consumer and provider) adheres to a mutually agreed-upon "contract" that defines how they communicate.

The main purpose is to ensure that changes in one service do not break the functionality of another.

## Benefits in the Development Lifecycle

Contract testing plays a crucial role in improving the software development lifecycle by:

* **Enhancing Agility**.  
  Teams can independently develop and release services without waiting for full system integration. This autonomy allows for faster iterations and reduced lead times.
* **Increasing Confidence in Integration**.  
  It builds confidence that changes to a service will not unexpectedly impact others, reducing the need for extensive manual integration testing.
* **Improving Overall Quality**.  
  By *"shifting left"*, it helps catch integration errors early in the development process, preventing issues from reaching later environments. This proactive approach leads to more stable releases and a smoother developer experience.

Want more details about the impact it can have on your business? Check out our article about <a href="https://apenlor.github.io/contract%20testing/understanding-roi-contract-testing/" target="_blank">the ROI of Contract Testing</a>.

# Types of Contract Testing

## Consumer Driven

With this strategy, the consumer drives the methodology _(who would expect that, given the name...)_. **The consumer defines the expectations for the interaction**. The contract specifies the requests that the consumer will send and the responses it expects from the provider, verifying it's capable of managing the given responses. Contracts are generated during the build and testing phase, where the Pact framework starts up a mock server to validate these defined interactions. If everything works as expected, a contract file is generated.

On the other side, **the provider is responsible for verifying each of the contracts related to it**. The provider retrieves the relevant contracts from PactFlow (or another Pact Broker), and Pact libraries use these during the build phase. The process involves starting up a consumer mock that will execute the defined requests against the provider's real code, and verifying the responses are the ones expected.

### Key Points

* Contracts are defined by consumers as "minimum viable contracts."
* The provider must include a verification-related code in its test classes to ensure that these contracts are satisfied.

This approach places the responsibility on the consumer to define what it needs, and the provider adapts its implementation to meet these expectations.

### Use Cases

In scenarios where you have **control over both sides** of the communication, such as an internal microservices architecture. Here, you value each component, knowing not only about whom they consume but also who consumes them.

You want the components to function as a team, even if they are managed by different teams.

## Bi-Directional

In this case, the name isn't as self-explanatory. **On the consumer side, nothing changes**; the framework still expects the same process: defining expectations and running tests during the build and testing phase. The contract is published to PactFlow _(note: this approach is not supported by the OSS pact broker, at least not yet)_.

The main difference lies on the provider side. **With bi-directional testing, the provider does not need to add test code**. Instead, the **provider _(or any other agent on its behalf)_ is expected to publish an OpenAPI Specification (OAS)** to PactFlow. This OAS should be valid (either generated from code or, if that's not possible, at least validated using any testing tool of your choice). PactFlow will rely on the provider team to uphold this OAS as the source of truth.

**Verification is performed by PactFlow itself, comparing the pact contract published by the consumer with the OAS specification from the provider.**

From this point forward, nothing changes. The workflows, automation, and other processes remain the same.

### Key Points

* Contracts are still defined by consumers as "minimum viable contracts."
* The provider does not need to implement specific test code; they simply need to have their OAS in PactFlow.

### Use Cases

This approach makes sense when **you do not have** _(or do not want to have)_ **control over the provider's codebase**. For example, it might be an API that integrates with too many consumers to make personalized tests feasible, perhaps a legacy API that is no longer evolving, or even a third-party component. The goal is to offer an alternative to consumer-driven testing in situations where direct provider involvement is limited.

## Personal Opinion

Go with consumer-driven testing whenever possible. In my experience, it provides more value. The shared knowledge and deeper integration it fosters are invaluable.

# Workflow

## Consumer Driven

{% include figure popup=true image_path="/assets/images/diagram-contract-testing-cheatsheet-consumer-driven.png" alt="Consumer Driven diagram" caption="Consumer Driven diagram" %}

1. The **consumer** defines the expectations in their codebase.
2. During the **build and test** phase, the Pact framework starts a mock provider to test the expectations using real requests.
3. If the tests pass successfully, a Pact file (in JSON format) is generated and published to PactFlow or the pact-broker.

**Provider side (Independent Process):**

1. The provider begins its build process. It downloads all related contracts from PactFlow or the Pact broker during the testing phase.
2. For each contract, the Pact framework starts a consumer mock service and validates the expectations using real requests.
3. A verification check is published to PactFlow for the contracts that have been verified.

## Bi-Directional

{% include figure popup=true image_path="/assets/images/diagram-contract-testing-cheatsheet-bidirectional.png" alt="Bidirectional diagram" caption="Bidirectional diagram" %}

1. The **consumer** defines the expectations in their codebase.
2. During the **build and test** phase, the Pact framework starts a mock provider to test the expectations using real requests.
3. If the tests pass successfully, a Pact file (in JSON format) is generated and published to PactFlow.

**Provider side (Independent Process):**

1. The provider publishes their OpenAPI Specification (OAS) to PactFlow, either generated from code (preferred) or validated using any testing tool of their choice (this step is not covered as it's not part of contract testing itself).
2. PactFlow will verify the compatibility between the published contracts and the OAS.

# Coding

## Consumer Driven

On the consumer side, you'll have several pairs like the ones shown in the following code. `@Pact` is used to define expectations, `@PactTestFor` is used to test those defined expectations, and the `@BeforeEach` method ensures that our tests are pointing to the mock server started by the framework.

### Consumer side code

```java
@SpringBootTest
@ExtendWith(PactConsumerTestExt.class)
class StudentProviderTest {


   public static final String STUDENT_1_EXISTS = "student with ID 1 exists";


   private StudentService studentService;


   @Pact(consumer = "consumer", provider = "student-provider")
   public V4Pact getStudentWithId1(PactDslWithProvider builder) {
       return builder.given(STUDENT_1_EXISTS)
               .uponReceiving("get an existing student")
               .path("/students/1")
               .method("GET")
               .willRespondWith()
               .status(200)
               .headers(Map.of("Content-Type", "application/json"))
               .body(newJsonBody(object -> {
                   object.numberType("id", 1L);
                   object.stringType("name", "Fake name");
                   object.date("birth", "yyyy-MM-dd", LocalDate.parse("2000-01-01"));
                   object.numberType("credits", 30);
                   object.stringMatcher("email", Regex.EMAIL, "some.email@sngular.com");
                   object.object("address", address -> {
                       address.stringType("street", "123 Main St");
                       address.stringType("city", "AnyTown");
                       address.stringType("zipCode", "12345");
                   });
                   object.minArrayLike("enrolledCourses", 2, course -> {
                       course.stringType("courseName", "Introduction to Computer Science");
                       course.stringType("professor", "Dr. Tech");
                       course.numberType("credits", 3);
                   });
               }).build())
               .toPact().asV4Pact().get();
   }


   @BeforeEach
   void setup(MockServer mockServer) {
       RestTemplate restTemplate = new RestTemplateBuilder().rootUri(mockServer.getUrl()).build();
       studentService = new StudentService(restTemplate);
   }


   @Test
   @PactTestFor(pactMethod = "getStudentWithId1")
   void getStudentWhenStudentExist() {
       Student expected = getStudentSample();


       Student student = studentService.getStudent(1L);


       assertStudentDetails(expected, student);
   }
}
```

### Provider side code

Meanwhile, the provider side would need to add tests to cover all the states defined in their consumer contracts (such as "Student 1 exists" in our example).

```java
@PactBroker
@Provider("student-provider")
@SpringBootTest()
class StudentProviderVerificationTest {


   public static final String STUDENT_1_EXISTS = "student with ID 1 exists";


   @TestTemplate
   @ExtendWith(PactVerificationInvocationContextProvider.class)
   void verifyPact(PactVerificationContext context) {
      context.verifyInteraction();
   }


   @BeforeEach
   void setUp(PactVerificationContext context) {
      MockMvcTestTarget testTarget = new MockMvcTestTarget();
      testTarget.setControllers(studentController);
      testTarget.setControllerAdvices(customExceptionHandler);
      context.setTarget(testTarget);
   }

   @State(STUDENT_1_EXISTS)
   public void student1Exists() {
      Student one = createFakeStudent(1L);
      when(studentRepository.findById(1L)).thenReturn(Optional.of(one));
      when(studentRepository.findAll()).thenReturn(List.of(one));
   }
}
```

## Bi-Directional

The same consumer sample code is valid for the bi-directional option. There's no change in how you implement, use, automate, or deploy your contracts on the consumer side.

**On the provider side, you won't need to add testing code to your codebase.** Remember, only the OpenAPI Specification is required.

Ideally, the best approach *(IMHO)* is to generate it directly from your code using tools like the <a href="https://springdoc.org/" target="_blank">`springdoc-openapi-maven-plugin`</a> or any other tool of your choice. It's also valid to generate it externally and validate it using testing tools such as <a href="https://smartbear.com/product/ready-api/" target="_blank">ReadyAPI</a>, <a href="https://rest-assured.io/" target="_blank">RestAssured</a>, <a href="https://dredd.org/en/latest/index.html" target="_blank">Dredd</a>, or <a href="https://www.postman.com/api-platform/api-governance/" target="_blank">Postman</a>. You can find a lot of great examples and documentation on the PactFlow website:

* <a href="https://docs.pactflow.io/docs/bi-directional-contract-testing" target="_blank">Bi-directional Contract Testing</a>
* <a href="https://docs.pactflow.io/docs/examples" target="_blank">Contract Testing Examples</a>

# Automation (CI)

I have a couple of detailed articles covering the workflows and CI/CD implications for the consumer-driven approach, but also applies to bi-directional. Feel free to deep dive into them:

* <a href="https://apenlor.github.io/contract%20testing/contract-testing-workflows/" target="_blank">Contract Testing Workflows</a>
* <a href="https://apenlor.github.io/contract%20testing/contract-testing-and-ci/" target="_blank">Contract Testing & CI</a>


## Consumer Driven

Key points:

* Consumer builds will publish their contracts to PactFlow.
* Provider builds will download related contracts from PactFlow to validate them and publish the results.
* Can-I-Deploy and other quality checks are in place for both consumers and providers, as we all know.

Your work will involve orchestrating this process: managing how the publish/download of contracts are tagged, organized, and filtered for download.

This strategy prioritizes the consumer. **Ideally, every change will start on the consumer side. However, this doesn't mean the provider fully depends on the consumers' roadmaps.** Each side can evolve independently, even though the evolution of contracts is driven by the consumers.

Sample basic steps for consumer:  

{% include figure popup=true image_path="/assets/images/diagram-contract-testing-cheatsheet-consumer-pipeline.png" alt="Consumer Driven pipeline diagram" caption="Consumer Driven pipeline diagram" %}

For the provider, the verification is usually done by delegating on the pact plugin executed within the build:  

{% include figure popup=true image_path="/assets/images/diagram-contract-testing-cheatsheet-provider-pipeline.png" alt="Consumer Driven, provider pipeline diagram" caption="Consumer Driven, provider pipeline diagram" %}

## Bi-Directional

Key points:

* Consumer builds will publish their contracts to PactFlow.
* The provider does not download any contracts from PactFlow. Their only responsibility is to publish the OpenAPI Specification.
* Can-I-Deploy and other quality checks are in place for both consumers and providers, as we all know.

As you can see, the only and very important difference is just the provider build. It does not download contracts and validate them using their code & tests. **The provider just publishes the OAS, and PactFlow itself will do its magic to compare that OAS against the contract and check the compatibility**.

With this approach, a sample provider build would look like this: 

{% include figure popup=true image_path="/assets/images/diagram-contract-testing-cheatsheet-bidirectional-pipeline.png" alt="Bidirectional pipeline diagram" caption="Bidirectional pipeline diagram" %}

**Implementing support for both techniques simultaneously is extremely easy and convenient.**
{: .notice--warning}

# Challenges

## Infrastructure and requirements

While the technical setup is straightforward _(at least in theory…)_ the reality often involves navigating organizational and technical complexities.

You'll need to set up PactFlow (or pact broker) as a central component of your SDLC. Consider it as critical as your CI/CD tool, as it becomes the hub for managing and verifying contracts between services, playing a pivotal role in enabling or blocking deployments.

Take great care in **designing and implementing your automation pipelines**. While the basic steps, such as publishing contracts, verifying them, and performing can-i-deploy checks are essential, the real complexity often lies in ensuring proper **tagging, versioning, filtering, and organization** of contracts. These aspects are crucial for maintaining clarity, scalability, and efficiency as your system grows.

The <a href="https://apenlor.github.io/contract%20testing/contract-testing-workflows/" target="_blank">Contract Testing Workflows article</a> is an excellent reference for this matter.

## Adoption Complexity

One of the most significant challenges, especially in large organizations, is driving adoption. Promoting this practice requires ongoing developer relations (DevRel) efforts, including educating teams, providing support, and offering training to ensure alignment across departments. The transition to a contract-testing-first approach might also involve resistance from teams used to traditional integration testing or who are hesitant to invest time in learning new methodologies.

You can get some good insights in the "Onboarding Teams” section from <a href="https://apenlor.github.io/contract%20testing/contract-testing-and-development/" target="_blank">the article Contract Testing & Development</a>.

## Contracts Synchronization

Evolving contract versions becomes easier over time as teams get familiar with the framework. However, the real challenge lies in managing specific situations or service evolutions that require custom handling. **Staying strict with the methodology while allowing for necessary customizations is key**.

While the basic theory is well known by all of us, special cases will inevitably arise. Check out the examples <a href="https://apenlor.github.io/contract%20testing/contract-testing-and-ci/" target="_blank">discussed in Contract Testing & CI article</a> for insights on managing them.

# Pact Broker vs PactFlow

Is the free OSS version (Pact Broker) enough, or do you need PactFlow? The answer, as usual, is _"it depends."_

Pact Broker (the open-source version) will work in many contexts. It will be a huge improvement to your testing suite and will provide most of the benefits of contract testing. However, **it does not support the bi-directional testing approach**. If that feature is crucial to you, or if you require commercial support, then the decision to opt for PactFlow becomes more clear.

Below is a table summarizing the key differences between the two options to help you make an informed decision:

|                                         |  Pact Broker   |      PactFlow       |
|:---------------------------------------:|:--------------:|:-------------------:|
|             Consumer Driven             |       ✅        |          ✅          |
|             Bi-Directional              |       🟥       |          ✅          |
|             AI Augmented CT             |       🟥       |          ✅          |
|            Formats supported            |      Pact      |   Pact \+ OpenAPI   |
|         SwaggerHub integration          |       🟥       |          ✅          |
|                 Hosting                 |  Self-hosted   | SaaS or Self-hosted |
|   Roles, User Management, Teams, etc.   |       🟥       |          ✅          |
| Secure access and administration (SAML) |       🟥       |          ✅          |
|             User interface              |     Basic      |      Advanced       |
|                 Support                 | Community only |          ✅          |
|               API Tokens                |       🟥       |          ✅          |
|                 Secrets                 |       🟥       |          ✅          |
|              Audit Trails               |       🟥       |          ✅          |

# Conclusion

**In today’s API-centric world, where API-first is the standard, contract testing is no longer optional.** It's a critical practice to ensure the robustness of your systems and the success of your digital strategy.

Pact, as an open-source framework, and PactFlow, as the licensed tool, are the leading options for implementing this practice. No matter which you choose, adopting contract testing is always a win for your teams _(and your business! Again, I encourage you to check out the <a href="https://apenlor.github.io/contract%20testing/understanding-roi-contract-testing/" target="_blank">ROI article</a> to learn more)_.

**Thanks for reading!**