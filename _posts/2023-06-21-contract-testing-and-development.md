---
title: "Contract Testing & Development"
categories:
  - Contract Testing
tags:
  - Adoption
toc: true
toc_label: "Table of contents"
toc_sticky: true
excerpt: "Initial steps for developers & tips for onboarding teams into the practice."
header:
  overlay_image: /assets/images/header-development.png
  overlay_filter: 0.6
  teaser: /assets/images/teaser-development.png
---
# Introduction

## Context

Welcome back to the fourth installment of Road to PactFlow Enterprise series. If you've followed along, you know we've come a long way together. At this point, we can assume we have our PactFlow instance up and running, and our pipelines are all configured and developed. Kudos to you for progressing this far in our shared adventure! (_and especially for having the patience to read me so far_ 😆)

With everything in place, **it's finally time to dive into the heart of the matter: developing contract tests**. However, if you're working with a large company as an integration team that's not all, you will probably be **also responsible for onboarding teams on these practices and showing them how to develop contract tests too**.

So, roll up your sleeves, and let's get into it!

## Goals of this article

In this article, we have set two primary objectives that will guide our discussion and help you in your journey.

**Our first goal is to provide you with advice on how to face the initial steps of developing contract tests, whether you're working with existing projects or starting from scratch**. This is a common situation when you're working as an integration responsible in a large company, with each team having varied responsibilities and objectives. Each context is unique, and we'll need to adapt to the challenges that may arise in each scenario. Our aim is to offer practical tips, references, and some of our practices to help you adapt and successfully implement contract testing across diverse teams and projects.

**Our second goal is to address strategies for onboarding and assisting other teams in adopting contract testing**. As the integration team in a large company, you'll likely be responsible for guiding other teams in implementing these practices. We will delve into various approaches that can make this process smoother, fostering collaboration and knowledge-sharing among teams.

By the end of this article, you'll be better equipped to not only develop contract tests but also help others overcome the hurdles and embrace this essential aspect of modern software development. _Yay, that sounded pretty cool, right?_ 😎

But before addressing the two objectives of the article, let's establish some basic concepts that will be essential for our integration team.

# Core concepts for an integration team

We are assuming that anyone reading this article has a solid understanding of how contract testing is developed. There are plenty of articles out there covering this topic from a developer perspective. For that reason, our focus in this section is to highlight the **fundamental concepts you should keep in mind when taking on the role of "integration team"** **and becoming a reference for contract testing development in an organization**.

Rather than diving into specific programming languages or teaching development, we'll concentrate on the essential knowledge and cross-functional skills necessary to successfully perform this role.

## Have a deep understanding of the framework

It is crucial to have a deep and precise understanding of the contract testing framework and how it operates. I know, this advice might sound pretty obvious… but in my personal experience, it's not always as clear as it seems. Just when I thought I had a solid knowledge of the framework and was getting the hang of developing new scenarios, there was always a surprise waiting around the corner.

{% include figure popup=true image_path="/assets/images/diagram-contract-testing.png" alt="Consumer Driven diagram" caption="Consumer Driven diagram" %}

Contract testing is a methodology with greater depth and complexity than initially apparent. As you work with it, you'll continuously encounter new situations and challenges. There are tons of languages, standards, libraries, frameworks, and other factors that can significantly impact how you approach development. My latest challenge was facing a SpringBoot application that relied almost entirely on <a href="https://spring.io/projects/spring-integration" target="_blank">Spring Integration</a>. Barely any custom code from the developers, just a bunch of Spring configurations. I found myself dealing with HTTP Gateways and MessageChannels that Spring had fully generated. Adjusting their behavior to point to our Pact Mock server was pretty complex.

To be prepared, it's essential to establish a solid and comprehensive base of knowledge of the framework: each step involved, how the mocks can be managed (whether internally using the DSL <a href="https://docs.pactflow.io/docs/examples/bi-directional/consumer/mountebank/" target="_blank">or externally, for example, using Mountebank</a>), understanding how the `@Pact` definitions behave on both ends of the testing process, recognizing error types, common issues, and more. **You can't be an expert in every language, framework, and library, but you must deeply understand the core tool you're implementing for your clients.**

## Consumer vs Provider

When engaging in contract testing, **the way you approach development will vary a lot depending on whether you're playing the role of a consumer or a provider.**

As a consumer, your focus should be on outlining the expectations from the provider. This involves specifying the exact details of the data you need, how you plan to request it, and the format you expect to receive it in. **Remember, in contract testing, the consumer drives the contract; it's your responsibility to articulate what you need clearly and unambiguously**.

On the other hand, **as a provider, your job is to ensure that you can meet the consumer's expectations consistently.** This involves confirming that your service can provide the data exactly as specified in the contract. A key aspect here is the use of `@State` annotation to define the data that will be returned in each test. Understanding and managing these states effectively will be central to your role as a provider. 

```java
    @State("Student 1 exists")
    public void student1Exists() {
        when(studentRepository.findById("1")).thenReturn(Optional.of(createFakeStudent("1")));
    }
```

The `@State` annotations are used to define a specific state of the Provider that the Consumer expects when making requests. These states essentially set up data on the provider side so that the provider can respond correctly to the consumer's requests during contract testing.

For that reason, communication between the consumer team and the provider team is absolutely crucial in contract testing. The main areas of focus in these discussions will be precisely the definition of states using the mentioned `@State` annotations. This will play a key role in establishing the framework. While in the early stages of the process, you might find yourself acting as an arbitrator between the two, it's important to educate both parties on how to coordinate and work together effectively. **Remember, contract testing is a collaborative process, and both consumers and providers need to understand their roles fully to make it work.**

## Consumer Driven or Bi-directional?

In contract testing, the strategy selected can have an important impact on your approach. You'll notice a shift in focus when switching between <a href="https://pactflow.io/what-is-consumer-driven-contract-testing/" target="_blank">Consumer-Driven</a> and <a href="https://pactflow.io/blog/introducing-bi-directional-contract-testing/" target="_blank">Bi-directional</a> testing.

**Bi-directional testing reduces the need for team coordination.** The focus here, as always, is on the consumer, but in this specific situation, the provider is generally passive. This approach is designed to work in situations where the provider can't inject testing code on their end (imagine you want to test a big legacy monolith in your company or even the Slack API).   
As for the provider, responsibilities may be as straightforward as simply uploading the OpenAPI Specification (OAS) to PactFlow. Sometimes, the provider may not even do that, and the consumer takes on this task. If that's the case, it should be accompanied by a set of tests validating the compatibility of the OAS with the deployed version of the provider, using tools like <a href="https://swagger.io/docs/swagger-inspector/how-to-use-swagger-inspector/" target="_blank">Swagger Inspector</a>, <a href="https://dredd.org/en/latest/index.html" target="_blank">Dredd</a>, or <a href="https://www.postman.com/" target="_blank">Postman</a>.

While this makes Bi-directional testing easier in terms of collaboration and coordination, it's worth noting that the level of coverage it provides may not be as comprehensive as that of Consumer Driven testing (at least in my opinion). In the Consumer Driven approach, the provider works more proactively to meet the consumer's expectations, providing a more in-depth validation of service interactions. In my personal opinion, bi-directional testing is here to cover a particular situation, but our first option when implementing contract testing should be consumer driven.

Therefore, when planning your contract testing approach, consider the testing strategy. Each has its strengths and weaknesses, and the right choice will depend on your specific needs and objectives.

## This is NOT functional testing

While both Contract Testing & Functional Testing are vital, understanding their individual purposes and how to use each is key to efficient testing. Sounds familiar? You're not alone… this is a topic that often sparks debates among developers when they start to work on their testing coverage.  
{% include figure popup=true image_path="/assets/images/diagram-testing-pyramid.png" alt="Testing pyramid" caption="Testing pyramid" %}

**Contract testing is all about the communication between a consumer and a provider.** It confirms that the two sides are on the same page regarding the exchanges happening between them. Let's say we have a scenario where we're creating a new customer via a POST request to an `/customers` endpoint. In this case, a contract test would check that both sides have the same understanding of what is required in terms of request and response for this operation. **However, it would not confirm the side effects of this operation,** like the correct creation and storage of the new customer, **that's where functional tests come in.**

Sounds reasonable, right? But with interactions that do not have side effects (like validating error responses), it’s easy to lose focus. Let’s assume we have a Customer Service that enforces specific rules for the names, like maximum length or allowed characters. It might seem tempting to include these rules in contract tests and validate the kind of error returned. But that would be stepping into the territory of functional testing. If the provider decided to modify these rules, they would then unintentionally break our contract, even though these aren't breaking changes for the communication. Instead of over-specifying, we should test how the provider responds to incorrect inputs more broadly. For instance: check the `400` error code and the existence of an `errorMessage` and `errorCode`, but do not check the kind of error or content of the message. You don’t care at all about that.

**Contract tests should aim to find consumer bugs and misunderstandings related to endpoints or payloads, as well as identify breaking changes by the provider. However, they should avoid digging into the provider's business logic.** 

There is <a href="https://docs.pact.io/consumer/contract_tests_not_functional_tests" target="_blank">a really good article about this topic in Pact documentation</a>. Actually, you have just read a summary of what you’re going to find there. 

# Developing contract tests

Alright folks, it's time to start coding! Keep in mind, our role here is a bit different from the usual development team. We are part of the PactFlow integration team, and it’s almost guaranteed that you will not start an application from scratch. So, how do we approach our first pilots? And how do we manage to make this process easier for the teams and for us? Four basic principles:

![image-center](/assets/images/diagram-4-principles.png){: .align-center}

Let’s talk about each one of them.

## Start small and easy

_The good ol’ advice_. **Applicable for almost every situation in software development or even life.** If you’re starting, start easy and small, and then gradually add more complexity. You should have some conversations with the team owner of the application to be onboarded. You should understand (not at a very deep level, but understand) the architecture of the components, and you should have a clear idea about how they are implementing the communication between components.

Having all that in mind, you’re in a good position to identify a starting point, and it should be simple enough to not be fighting weeks to have it running, but with the capacity to work as the first example for the team. I personally like to start with simple REST API calls, based in Java if possible. _I guess a leopard can't change its spots…_ 😅

**The point is to use baby steps and create a good foundation for the developers of the team to have as a reference.** As we commented in previous points, there will be a lot of unique and weird situations to be covered along the way, but for the start let’s try to use easy situations to solidify the core concepts.

## Establish the common criteria (and good practices)

When it comes to methodology adoption work, there's a lot more to it than just making sure everything works. It's about creating good coding habits, making sure the contract testing code is organized and well-structured, and getting everyone on the same page when it comes to how things are done. 

Keep in mind that when you start working on **the first pilots,** these **are going to be the standard to follow for future projects**. You want to focus on showing reusable patterns and samples of code, even the creation of common modules that can be used in several projects. And don't forget about DSL usage, there are many approaches to solve the same situation, try to establish a pattern and a clear style, this consistency can be a game changer.

Why does all this matter? Well, it’s all about making life easier for everyone. **You want it to be no big deal for a developer to move from one project to another**. And this isn't just for the developers, it's for you too. As you'll be the one helping all those teams, **knowing your way around the code will make your job a lot easier**. 

In the end, spending a bit of time getting things right at the beginning will save everyone a lot of time down the road. Plus, it's going to make the whole journey a lot smoother.

## Create the implementation references

We've found through our experience with our clients that **creating illustrative applications using contract testing is a super helpful practice**. These applications, playing both consumer and provider roles, should use the company's standard technologies and offer real-world examples of contract testing covering the most common scenarios.

But, these aren't static. These reference applications are continuously evolving and will grow while you find new situations during the onboarding of different teams. **The goal is for these applications to eventually encapsulate almost any situation a developer in the organization could find**. They're designed to be a dynamic resource, growing and changing just as your teams and projects do.

For developers, these applications offer a chance to learn contract testing in a "hands-on" way, using actual code and scenarios. They can even integrate and "deploy" _(please, note the quotation marks)_ these applications to a pre-production environment of PactFlow, allowing them to play around and familiarize themselves with the entire contract testing workflow.

**These reference applications do more than just teach. They create a sense of familiarity and confidence within the developers**, so when they're ready to tackle real projects, they're already comfortable with the process.

## Archetypes: The base project setup concept

Once you've got reference applications like the ones we've talked about in the previous point, the next step is to consider adding contract testing to the _(most likely already existing)_ "starter kit" in your organization. 

Remember, we're dealing with large-scale organizations here, and this is a pretty common practice. Using an archetype _(or similar)_ to generate a basic project structure has loads of benefits _(and sure, it has its disadvantages too, but we're not here to talk about that)_. The point is: If it's a product type that your client uses, then contract testing should definitely be part of the tech options to include.

Doing this **allows you to include the necessary global configurations** _(maybe something related to pipeline settings?)_, **the appropriate libraries for the base language and dependency manager, and even code examples for consumer or provider roles.** This approach not only provides a starting point for your teams but also helps to standardize the way contract testing is carried out across different projects, making it easier for everyone involved.

# Onboarding new teams

So, here we are at the last stop. In this section, **we're going to outline the process I like to follow with each team brought on board**.

![image-center](/assets/images/diagram-onboarding-process.png){: .align-center}

Let’s now describe each step in more detail.

## Tech Talk: Contract Testing Introduction 

Let's be totally honest here, **most teams won't have a clue about contract testing when you first approach them**. _If you're lucky, their technical leads might have a superficial understanding..._

**That's why the first thing we like to do is conduct a tech talk, purely theoretical, to establish a foundational knowledge base within the teams.** Our main goals are to ensure everyone understands how the framework works and to generate interest in highlighting the strengths and benefits of this methodology. **We want them to understand that the effort they're about to do is going to make their lives much easier in the near future.**

Often, a couple of sessions may be needed. **Contract testing is a methodology that challenges some deeply established concepts.** After all, we're proposing to test from the consumer's perspective... and the _"provider-centric"_ testing concept is VERY ingrained in our minds. But by providing a thorough introduction, we set the stage for successful adoption and help teams understand the value of this new perspective.

## Demo Time!: Hands-on

Moving on, we like to make use of those implementation references we discussed earlier and dive into a more practical tech talk. In this demo session, we will get deep into the code's details and watch the framework in action, integrated with the real pipelines _(in a non-production environment, of course)_.

**The target here is to give a deep dive to the technical people in the team**, providing them with a basic understanding of what contract testing code looks like, and what it's like to develop using this methodology. By getting hands-on with the reference applications and walking through the process in a real-world scenario, **we turn abstract concepts into concrete understanding**. This approach simplifies that crucial first moment when they start to develop the tests.

It's just all about transforming the unknown known and bringing clarity to the process of developing contract tests.

## Analysis: Team architecture review

After the educational sessions we’ve described in the previous points, it's now time to address the team's specific situation. **The initial conversations should be focused on understanding the team's architecture and the various components involved in their ecosystem.** At this stage, we'll be selecting the communication channels and APIs (or components) that will serve as the first scenarios for contract testing within the team. Don’t forget the advice from our _"Start Small and Easy"_ section - **we're aiming for something meaningful but relatively simple among the alternatives available**. 

Our focus is to establish a foundation for the team to start independently developing. This initial step is vital, setting the stage for further growth and adaptation of contract testing practices. It's about finding the right balance between value and complexity and choosing a starting point that gives the team the confidence to move forward.

## Example: Sample endpoint with real team code

Following that, we proceed with the development of contract testing for the endpoint or communication established in the prior step. **At this point, we, as the integration team, may take on the responsibility of creating the contract testing for the identified endpoint or communication.**

Since it's the first case this approach has its benefits, it sets a precedent and provides a clear direction and style on how to develop the testing. **However, it's not always possible.** We may not have expertise in the language used, or the situation covered _(or even maybe we don’t have the time or resources to do it…)_. So, in some cases, we wouldn't be able to independently develop this first example. In that case, we may transition directly to the next point: pair programming.

It's a decision that needs to be made on a case-by-case basis, with a constant focus on what's best for the team and the goals of the project.

## Collaboration: Pair programming & support

Excellent! Now, we've reached the point where the development team begins to actively work on creating tests. **At this stage, our role shifts towards providing support and guidance.** We'll be there to help with any questions, engage in pair programming when necessary, and offer best practices advice.

Setting up regular meetings, especially during the initial phases, can help in promoting the type of teamwork we are aiming for. This phase will continue as long as necessary until the onboarded team feels comfortable with the methodology.

Remember, it's not a race, but a journey. Every step towards understanding and applying better practices in contract testing is a step toward better _(and significantly safer)_ software development.

## Contract Testing Champions: Spread the word! 

The idea of a "contract testing champion" is a creative invention of mine... _Who am I trying to fool? This is purely <a href="https://www.x.com/morvader" target="_blank">Fran's</a> brainchild… feel free to credit (or blame) him for this idea_ 😂

**We've found that when it comes to new methodologies, nothing sparks interest and adoption quite like having peers discuss their positive experiences.** That's why we aim to identify developers who have started using contract testing and have embraced its benefits. These individuals, or "champions," can help us _"spread the word"_ about contract testing, pushing forward the adoption across different teams.

In simple terms, it's learning and promoting through fellow team members. **Hearing firsthand from colleagues about how contract testing has streamlined their processes and improved their results often has a more significant impact than hearing about it from the integration team**.

You could say it's akin to gamifying the entire process of adopting the methodology. We're encouraging developers to not only adopt and understand the methodology but also become its advocates. This way, the spread of contract testing knowledge and practices becomes organic, driven by positive user experiences rather than top-down instructions.

Keep in mind that in this article, we're discussing adoption in very large companies, with multiple departments and teams. Having "internal" help in promoting a new methodology can be a huge game changer.

# See you soon!

As always, thank you for reading. Again a pretty dense article...