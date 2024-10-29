---
title: "Contract Testing Workflows"
categories:
  - Contract Testing
tags:
  - pact
  - workflows
toc: true
toc_label: "Table of contents"
toc_sticky: true
excerpt: "Understand the basic workflows related to Contract Testing"
header:
  overlay_image: /assets/images/header-workflows.png
  overlay_filter: 0.5
  teaser: /assets/images/teaser-workflows.png
---

# Intro

This is the first of a series of articles aiming to cover common processes or configurations you will need to face on your _road to PactFlow Enterprise_.   
We are going to cover here the very first topic that you will want to talk about when starting the process of adopting contract testing at the enterprise level: **The Workflows.**

At this point, you probably already know what contract testing is, you have been playing with a PoC (proof of concept), and even maybe you have an MVP (minimum viable product). But now **it’s the moment of defining the workflows to be applied in real-world scenarios**. That is the exact point when things start to get a little bit more complicated, and we are going to share with you some tips we have learned along the way.

First of all, it’s fair to say that each enterprise environment is different. Probably you will have a bunch of different pipelines to cover the CI/CD process, here we are going to try to summarize some general concepts or common changes that you should take into account. But of course, those concepts would need to be adapted to each specific situation.

The details included in these workflows will go deeper than any typical hands-on or demo article, and we assume you have a basic knowledge of the methodology.

# Coverage

As you may know, there are two main methodologies when talking about contract testing:

* **Consumer Driven:** The flow is started (*and fully handled*) by the consumers. Providers must validate the contract, requiring them to include code in their testing phase. <a href="https://dzone.com/articles/improve-microservice-testing-with-contract-testing" target="_blank">Check out this article</a> if you want more information.  
* **Bi-directional:** For situations where there is no control over the provider's code (or maybe there is control, but there's no will to include new testing code in their source). We have published at Sngular <a href="https://www.sngular.com/the-easy-way-to-get-started-with-bi-directional-contract-testing/" target="_blank">some nice articles related</a>.

Bi-directional and consumer-driven are much more similar than expected, there is a slight difference in how the provider is handled (for obvious reasons), but the workflows in bi-directional could be understood as a subgroup of the workflows defined as consumer-driven with minimum differences. In this article, we will focus on the consumer-driven approach, as covering both would create a very long entry, but we will go over the bi-directional in future articles.

**I will always recommend using the consumer-driven approach in all possible situations, it fully exploits the potential of this testing technique.** On the other hand, everyone will have examples in their mind about situations and products that cannot follow that approach. That is the moment to use bi-directional, and it’s great to have it to cover more of our services. But from my perspective, it comes to help in only very specific cases, and it should not be treated as an “anytime” alternative.

# Workflows

## First Execution \- Consumer Driven

Everything should start with a meeting (*yeah, I know you were thinking we would get rid of meetings if we used contract testing, right? Well, that’s partially true… you will have fewer of them, but no one will save you from the kick-off ones*). 

Both teams will present their needs to ensure that communication between the two systems remains correct, and the requests and expected responses for each of them must be agreed upon. It’s pretty probable that your teams will not be starting from scratch, if that’s the case you can just agree on the (*hopefully*) working versions you’re using at that moment to use them as starting points. Once an agreement has been reached, the consumer side should generate, as soon as possible, a contract with the specification of the communications and publish it to PactFlow. From that moment on, both teams can work independently (*yay! no more meetings\!*)

Both sides will be synchronized through CI's pipelines and the PactFlow webhooks. They will be constantly notified about changes, the pact’s verification status, and most importantly: **if it is safe to deploy.** If a contract is not verified, the consumer will be blocked and unable to deploy (the same situation can happen for a provider). 

Keep in mind that in your first run as a consumer, after publishing your contract, the <a href="https://docs.pact.io/pact_broker/can_i_deploy" target="_blank">can-i-deploy tool</a> will block the deployment. That is totally expected: the provider is not deployed, and your contract is not yet validated, so the framework can not allow you to deploy. That’s why the provider CI needs to be run to validate the first version of the contract **and be deployed** in the target environment. This is a situation that you will face in almost any deployment that contains a communication change, your consumer will be forced to wait for the provider to include the changes on their side.

**Disclaimer! →** The CIs for consumers or providers are being represented as timelines. When there’s a webhook callback, even though we are using the same timeline it does not mean it should be the same execution (you may not want to pause your pipelines) class.
{: .notice--warning}

{% include figure popup=true image_path="/assets/images/diagram-consumer-driven-workflow.png" alt="Consumer Driven Workflow" caption="Consumer Driven Workflow" %}

## Consumer \- Deployment without impact on provider

Common situation, it could be a simple hotfix or a new release done by the consumer. The point is that the consumer wants to update their service in an already working production environment. The changes included theoretically do not have an impact on the communication, but we should make sure about that. 

The situation is pretty straightforward, the code will be developed and verified against the currently deployed version of the provider. If the verification is green, the changes can be safely deployed.

In the following example, we are assuming that the contract has changed even though there’s no impact on the communication (for example, your consumer has started   
consuming one extra existing attribute). If the changes to the consumer didn’t affect the contract (for example, just changes in your business code), PactFlow would be smart enough to pre-verify the contract without requesting the provider to build/validate it. This is a pretty important feature, that will save a lot of computing time on your pipelines.  

{% include figure popup=true image_path="/assets/images/diagram-consumer-deploy-no-impact-provider.png" alt="Consumer deployment without impact on provider" caption="Consumer deployment without impact on provider" %}

## Provider \- Deployment without impact on consumer

Opposite situation to our previous point, now we are trying to update our provider in production including updates/fixes/whatever… the point is that we expect our changes to not have an impact on the communication with the provider. The team will ensure that with the following process.

{% include figure popup=true image_path="/assets/images/diagram-provider-deploy-no-impact-consumer.png" alt="Provider deployment without impact on consumer" caption="Provider deployment without impact on consumer" %}

## Consumer \- Deployment with impact on provider

This case is pretty similar to the [initial base case](#first-execution---consumer-driven). Actually, we will not include a diagram in this section, because is exactly the same.   
The consumer has created a new contract version, different from the ones already validated in PactFlow. And furthermore, the new contract version is not compatible with the provider versions currently deployed. **The deployment of the new consumer version will be blocked until we have a compatible provider version.**

The moment the new compatible provider version is available (and deployed), our consumer will be free to deploy. Keep in mind that even though the diagram shows this process as sequential, there could be days or even weeks before moving forward. **The teams are working asynchronously.** The good point is that PactFlow enables us even to automatically trigger the notification webhook to the consumer once the compatible provider version is available without requiring any human intervention.  
We have blocked a problematic deployment, and not only that… we have automatically deployed the blocked version at the moment we know the incompatibility was fixed.

## Provider \- Deployment with impact on consumer

Now let’s see the opposite situation, a provider wants to include some changes that will cause a problem in the communication with one of its consumers. **The framework will stop the deployment and prevent errors in lower environments.**   
Actually, **developers can be aware of that problem even while writing code** if the issue is related to the latest contract published by the consumer. When developing in the local environment, the framework will download the latest version of the contract to perform the validations on the provider (at least by default, of course, you would be able to point to a specific version or environment).  
   
But it can *(and will)* happen that in upper environments, the version deployed may not be the latest one. 

The situation is a little bit more complicated than on the consumer side, when the provider tries to deploy a breaking change, it will be blocked. But if the consumer tries to create a new contract compatible with the “future” provider breaking change version, it will not be able to deploy either (as it will be not compatible with the currently deployed version of the provider).  
To solve this, the logical steps are:

1. The provider will need to include those breaking changes incrementally: ***“expand & contract”***. If we are talking for example about a field (*change from name to firstName*), you will need to include in a first provider version both values for the field, the old one and the new one, to keep the compatibility with the consumer.  
2. Consumer can now deploy the new version created, where they are only using *firstName* because is already supported by the provider.  
3. Provider can create a new version and get rid of the old field *name*, as it is already not used by any consumer.

{% include figure popup=true image_path="/assets/images/diagram-provider-deploy-impact-consumer.png" alt="Provider deployment with impact on consumer" caption="Provider deployment with impact on consumer" %}

## Breaking Changes

Although we have seen how to handle changes with impact from the consumer & provider side, it’s important to clarify the advantage provided by the consumer-driven approach when dealing with breaking changes. 

**This is a methodology that puts the focus on the consumer**, any change on a provider API should (*or even must*) be originated due to a consumer need. Consumer-driven defends that we should try to evolve from those old days when the API changed its contract definition without caring about how the consumers are going to adapt (*“they’ll need to be aware of my changes, I am providing the information”*).   
Although that could make sense in some specific situations, in a modern microservice architecture scenario I personally agree that is not the way to go. That is the reason why any breaking-change flow is much easier to achieve if it’s started from the consumer, [as explained in this section of the article](#consumer---deployment-with-impact-on-provider). Actually, if you think about it, [when you try to start the breaking change from the provider side](#provider---deployment-with-impact-on-consumer) you will be basically triggering a consumer to start its own breaking change process.

On the other hand, don’t worry, we also have those *“specific situation APIs”* covered. Maybe you’re consuming a 3rd party API over which you have no control, or maybe you have in your company a big central API with a lot of consumers that will not agree to develop contract tests. For that kind of situation, we have <a href="https://www.sngular.com/the-easy-way-to-get-started-with-bi-directional-contract-testing/" target="_blank">the bi-directional approach</a>.

# Work strategy

This _bonus_ section will summarize some basic considerations to take into account when working with PactFlow & contract testing. Keep in mind this basics tips when designing your integrations.

## Test locally\!

Pretty obvious, but extremely important.   
Your users **must** have access to PactFlow (*but remember: read-only access, only your CI/CD tool should have permission to write in PactFlow*). Enabling the access, the users will be able to develop and execute all the tests locally, before even pushing them to their own branch. 

**This is a powerful feature, as the feedback about your communication status is almost instantaneous**, avoiding discovering these issues in later development stages. 

Having the developers familiarized with the framework will allow them to test their code compatibility against any environment, tag, or specific contract version. And that is a game changer, your time lost identifying and reporting bugs during the E2E or even during the functional tests will be reduced drastically.

## Branches contract testing is important for CI/CD

We were going through some high-level CI/CD diagrams, but keep in mind that all that diagrams should be included globally. That means that they **do not only apply to your main branch, those validations must be performed in your feature branches as well.**  
If the tests are not passing, the pipeline would fail and prevent you from merging the code into the main branch. And also will prevent you from deploying broke services in DEV environments (if you are allowing users to deploy from their feature branches).

## Enable pending pacts

This is <a href="https://docs.pact.io/pact_broker/advanced_topics/pending_pacts" target="_blank">a core functionality</a>, and somehow confusing. Let’s try to clarify its purpose.  
**The pending pacts flag will ensure that the provider build only fails when it’s breaking an already verified contract.**  
Typically, in your pipelines when building a provider, you will validate all the deployed versions of a contract as well as the latest one.

Imagine you have version 1.0 of your consumer in PROD. It’s compatible with your provider, and everything runs smoothly. Now the consumer has started working in 2.0, and that version requires a new parameter from your provider, meaning that is not compatible with the current code.  
The consumer 2.0 will be generated (ideally from a feature branch initially) and the contract will be published in PactFlow. When your provider tries to build its code, it will try to validate both versions of the consumer (1.0 because is the deployed, 2.0 because is the latest one), if your pending pacts flag is not enabled, the build will break. That will block the provider team from working on anything not related to that specific change.

By enabling pending pacts, you’re telling your provider to only break the build if the failure in the verification **is against an already verified contract** (consumer 1.0 in our case).

At this point maybe you’re asking yourself *“why would I want to validate the latest version of a contract then? If I remove that validation, I would not need the pending pacts feature at all”*. The answer is pretty straightforward: You need that validation for ANY update you want to do on your communication, the consumer will not be able to deploy without the provider verification.

Including this configuration enabled as the default is something that is over the table for a long time but has not been done yet (at least at the time this article was published). The reason is that this is the kind of configuration mandatory in a real-world environment, for proofs of concepts or demos everyone would be waiting for the build to fail.

## Understand the WIP behavior

WIP stands for “work in progress” and describes a pretty useful feature to be implemented in our contract testing pipelines. We will cover this kind of behaviors much in detail in <a href="https://apenlor.github.io/contract%20testing/contract-testing-and-ci/" target="_blank">our Contract Testing & CI article</a>, but as the first approach just keep in mind this advice when implementing your verifications: **Pact CLI offers the possibility to verify not only the contract that has triggered the verification but all the contracts that you want**. And we would personally recommend validating the contract deployed in each one of the environments as well as the last version published.  
This approach simplifies a lot all the flows, and even more will save you time in pipelines related to higher environments, as the verification would have been done in the lower ones. As commented before, we will go over this concept much more in detail in further articles.

## Create a GoP (Group of Practice)

It’s not related to the technical work to be done, but it will help a lot to be successful with the adoption of the methodology, so we think it is worth mentioning it at least briefly.  
The GoP (Group of Practice) would be composed of different organizational roles and will be in charge of guiding, supporting, and continuously tracking the degree of adoption of contract testing within the organization. Its importance is crucial, as it will help the technical team to get to all the teams and departments involved in this process.

Keeping it simple, it would be composed of at least the Contract Testing SME, a GoP manager, and the main contract-testing stakeholders' supporters. **You will need the collaboration of the stakeholders to be successful when trying to implement a methodology like this in a big organization**, as it will imply working with a lot of different departments only to provide the platform, and later on, start the adoption process.

You can find more information in <a href="https://docs.pactflow.io/docs/workshops/org_scale/" target="_blank">PactFlow documentation here</a>, or if you have time you can even <a href="https://www.youtube.com/watch?v=LyVSmRtwFkc&list=PLdCQaMqIu9qxa8O-R-yi__JSkf_ebFZp3&index=1&t=22s" target="_blank">watch a full bank case study we’ve done with PactFlow</a>.

# See you soon\!

Well, first of all… if you have read until here, congrats, and thank you so much\! The article is somehow dense and not precisely hands-on, but we really hope it could be useful for you if you’re starting your journey to PactFlow Enterprise.