---
title: "PactFlow: Self-hosted vs SaaS"
categories:
  - Contract Testing
tags:
  - PactFlow
toc: true
toc_label: "Table of contents"
toc_sticky: true
excerpt: "Which option best suits my needs?"
header:
  overlay_image: /assets/images/header-saas.png
  overlay_filter: 0.5
  teaser: /assets/images/teaser-saas.png
---
# Intro
Welcome to the second entry on the _Road to PactFlow Enterprise_ series!

This time, I will talk about the classic Self-Hosted vs SaaS doubt: *which option is a better fit for my needs? Do I have the knowledge and resources required for a self-hosted approach? What problems will I face when choosing one or another?* 🤔

**Spoiler alert: there is no easy answer**, and there is no "one-size-fits-all" solution. That’s why the article will be structured into key points, and inside those points, the differences between one approach and the other will be covered.

Let’s try to summarize what we should be thinking about when having to answer the question: ***SaaS or Self-Hosted for PactFlow Enterprise?***

## A quick definition

I guess it makes sense to start from the beginning, with a quick definition of what this article understands for Self-Hosted and SaaS.

### SaaS

Software as a Service (SaaS) is a model where the software is licensed on a subscription basis, and hosted in a remote data center. You can think about it like "on-demand software".  
You will have a PactFlow instance, accessible and private for your use, hosted in PactFlow/SmartBear data centers.

### Self-Hosted

When following a self-hosted model, we will be running and maintaining PactFlow using our private platform. Self-Hosting is based on running your own application by setting up servers and networking by yourself.

In this article, I´ll use the term self-hosting to talk about deployments using cloud platforms or on-premise. class.
{: .notice--warning}

We may make use of the on-premise version of PactFlow Enterprise to deploy it to a cloud platform like AWS, Azure, or Google Cloud. Or we may run PactFlow on our own premises, making use of our own physical data centers to host the whole product.   
If any details apply specifically to on-premises or cloud, I will indicate this.

# Implementation

The first and more obvious difference: how hard is it to get PactFlow up and running?

For the **SaaS approach**, the process is pretty straightforward. Once you <a href="https://pactflow.io/pricing/" target="_blank">create an account with PactFlow</a>, the service will be ready, and you will have access to your instance almost instantly and from any place. PactFlow will be able to manage the users, but the recommendation is that the first thing you should do is configure the SSO access. You will be able to rely on Google or GitHub with a pretty simple and direct configuration or use any SAML 2.0 IdP provider. For this last option, remember that you will need to coordinate with the support team, <a href="https://docs.pactflow.io/docs/user-interface/settings/authentication/#3-export-idp-metadata" target="_blank">more information here, in PactFlow official documentation</a>.

Other than that, you will only have to worry about your use of PactFlow, but the platform problems will not be your responsibility.

For the **self-hosted approach**, the process is much longer and needs planning for execution. You will need to have a dedicated team with experience in the platform you’re using to host it.

The architecture for hosting PactFlow is not extremely complicated, but your team will be responsible for provisioning, upgrading, maintaining, and supporting the platform. The team should deal with the disaster recovery configuration and also have knowledge about PactFlow to work on the bug-fixing & configuration. Although it’s a lot of work, it’s also true that you have much more control over your data.

**For any of both situations, you will need to count on a team specialized in PactFlow and Contract Testing**. With SaaS, you will avoid the product deployment bug-fixing and setup duties, but you will need to handle all the integrations and setups required by this testing framework. We can say the only difference for the self-hosted approaches is that you will need a role with deployment platform knowledge (AWS in our following example case). So be prepared to count on your team with some folks experts in Contract Testing 😜

Let’s give a quick look at the architecture and requirements, so you can have an idea of what would you face with a self-hosted approach.

## Architecture overview

The following diagram reflects a standard architecture for PactFlow, assuming that we are deploying using AWS services with EKS & PostgreSQL RDS. Self-hosted, but in the cloud.

Of course, this is just an example, you could be using EC2 instead of EKS, or not be using AWS at all and opt for Google Cloud, or Azure, or even avoid the cloud and use your self-hosted Openshift.

In our architecture diagram, we are reflecting the deployment in just one region, but using multiple availability zones. For implementing a good disaster recovery, we should probably extend this solution with two regions replicating the same architecture. PactFlow is a stateless application, so at least there will be no worries about configuring sticky sessions or similar.

{% include figure popup=true image_path="/assets/images/diagram-pactflow-aws-architecture.png" alt="PactFlow AWS sample architecture" caption="PactFlow AWS sample architecture" %}

Any team with experience in AWS will be able to create a similar architecture pretty fast.

## System requirements

This is the other key point to take into consideration before the provisioning: what kind of infrastructure do I need to run PactFlow?

Fortunately, the requirements are quite reasonable, with the following minimum requirements:

|                |   CPU   | Memory  |  Disk   | Details                         |
|:---------------|:-------:|:-------:|:-------:|---------------------------------|
| **PactFlow**   | 4 vCPUs | 4.0 GiB | 4.0 GiB | Docker \> 20.10.0               |
| **PostgreSQL** | 4 vCPUs | 4.0 GiB | 5.0 GiB | IO perf \- 10 read/s 25 write/s |

If you want to go deeper into this topic, you can always review the <a href="https://docs.pactflow.io/docs/on-premises/system-requirements/" target="_blank">PactFlow official documentation</a>.

Keep in mind that those would be the **minimum requirements**, but we will need to scale up the resources based on the platform usage. And that takes us to the next topic to be covered in this article…

# Scalability

When using the **SaaS option**, all the responsibility related to the scalation will be on PactFlow’s side. Based on the license purchased, which is directly related to the active users expected, the team will prepare the configuration of your instance. As in the previous point, scalability is pretty straightforward for you, actually, you won't need to spend a minute on it.

On the other hand, when using the **self-hosted approach**, you will be responsible for the scalability of the platform. PactFlow shares a simple rule to make your own calculations based on the active users:

**1 compute unit** = 1 CPU, 256 MiB memory   
**1 database unit** = 1 CPU, 256 MiB memory, 1 GiB storage (per week), 25 writes/s, 10 read/s class.  
---  
For every 500 active users*, you should increment your total compute capacity by one unit, and each database server capacity by one unit.
{: .notice--primary}

_\* Active users are defined as a developer that either logs into PactFlow daily or commits code that would trigger a CI build that integrates with PactFlow._
{: .notice}

But of course, **it always will be better to monitor the platform and scale dynamically**.

Fortunately, the resources that PactFlow demands are not very high, making the scalability pretty easy to handle. In any case, you should be careful and aware of the needs related to resources and team allocation. You can find more information <a href="https://docs.pactflow.io/docs/on-premises/system-requirements/#scaling-and-monitoring" target="_blank">in the official PactFlow documentation</a>.

# Costs & Budget

Controversial topic, and _(oh surprise!)_ without a clear answer. Each approach has its pros and cons, but the most sensitive one could be the balance between entry costs and long-term costs.

**SaaS has a lower entry cost**. It’s pretty obvious, you will be following a subscription model, and you will have the platform available since the first payment. There is no need to spend a large amount of money upfront but on the other hand, **you will be paying your fee monthly/annually**. It’s a great option to keep the costs low when starting.

**Self-Hosted approach startup is costly**, you will need to provide the infrastructure, and cover the setup and implementation. But in the long run, there are other nuances to take into account.

If we talk about **on-premise, the costs are always going to be higher.** It is not only the maintenance of the platform but the hardware as well. There is no doubt at this point.

**But the situation can be different if you’re hosting your services in the cloud**, especially if you have a large volume of applications already deployed. The price per resource improves significantly based on the number of resources used, making the hardware/servers related costs decrease significantly with this approach.  
Of course, you will still need staff to maintain the platform, but you probably already have a platform team in this context (note that this will incur an overhead operating for the team, so plan it accordingly).   
**The point is that in some situations, a self-hosted rollout based on the cloud could be a better (more economical) option in the long run.**

# Maintenance & Upgrade

As you may imagine, **maintenance & upgrade when using SaaS will completely rely on PactFlow**. Those processes should be transparent for you as a customer.  
For the maintenance & upgrade of the platform, PactFlow will follow the classic procedure of setting up planned downtimes and notifying the users enough time in advance.

**Coming to the self-hosted option, again, you will be responsible for all the maintenance & upgrade** of the platform and application. You will not only need a team with experience in the platform used for deployment, but also with experience on PactFlow itself. The supporting team should have knowledge about how to deal with any kind of problem or troubleshooting related to the product.

The backups management would be as well on your side, but that’s a pretty easy process, you just need to take care of your PostgreSQL instance backups.

In my experience, an approach that is working pretty well is to create a dedicated **team specialized in PactFlow and Contract Testing.** This team will be responsible for the maintenance & upgrade, working hand-in-hand with the platform team. And also would be the team responsible for the rollout of the methodology, training, giving support, and tracking the usage metrics across the whole organization.   
You can find more information in <a href="https://docs.pactflow.io/docs/workshops/org_scale/" target="_blank">this PactFlow official article</a>, or even <a href="https://www.youtube.com/watch?v=LyVSmRtwFkc" target="_blank">watch in YouTube the video that is being summarized in the article.</a>

# Support

No support is needed from your side when you’re **using the SaaS option, all the responsibility would be on the PactFlow side**. You will have a proper communication channel to notify any kind of issue, but probably it will not be used a lot.

**The situation is pretty different when you’re hosting PactFlow on your platform.** The product is distributed as a Docker image, and that gives huge flexibility in terms of options about how to be deployed. That flexibility comes with a price, and that price is that PactFlow team will give you support with anything related to the application but not for the components that live outside the application itself.  
Some examples of topics that are covered could be configuration issues, logs interpretation,  and diagnosis of the behavior of the application. But things like network issues, deployment orchestration, or infrastructure automation tools are totally out of scope. Of course, the team will do its best to help, but there are so many factors beyond PactFlow's control that it would be impossible to cover them all.

You can read more about the support policy <a href="https://docs.pactflow.io/docs/on-premises/support-policy/" target="_blank">here</a>.

# Security

Well, this is probably the other controversial point in this article (besides the costs one).

Before jumping to the self-hosted section, I would like to put my two cents on the SaaS approach. Contrary to the popular belief, **it does not have to be risky to store your data on the cloud**.

Some highlights about PactFlow SaaS platform:

* SaaS PactFlow is fully **hosted in AWS ap-southeast-2 region** (Sydney, Australia), meaning that it’s protected by all <a href="https://aws.amazon.com/compliance/data-center/controls/" target="_blank">the AWS data center security controls</a>.
* The core platform is making use of different AWS services, all of them **certified with the higher standards of security** (EC2, Lambda, Cognito, Route53, S3…)
* **Communication is encrypted in transit and at rest**, including the storage in S3 using AES-256 (considered as <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard#Security" target="_blank">enough for TOP SECRET data by the NSA</a>).
* **Two-factor authentication** is mandatory for all users, and the access keys are rotated regularly. **SAML 2.0 SSO** access is available and every action on the platform is recorded in immutable logs. Even there are analysis tools that detect any suspicious activity and independent third-party penetration tests audits.
* The whole platform **complies with <a href="https://www.cisecurity.org/controls/implementation-groups/ig1" target="_blank">CIS IG 1</a> policies** and is looking to <a href="https://www.aicpa.org/resources/landing/system-and-organization-controls-soc-suite-of-services" target="_blank">SOC2 attestation</a> by 2023 Q4.

If you want to have more information about security you can read this entry: <a href="https://pactflow.io/security/" target="_blank">PactFlow Security.</a>

So yes, we can assume the **PactFlow SaaS environment is pretty safe.**

_BUT… (there is always a but…)_  
**You will always have more control over your data in a self-hosted setup.**   
Even if you decide to host it in the cloud, as we did in the architecture section, it will ensure that you are the only holder of all the information in PactFlow.

* Take advantage of the AWS **cloud security standards** (or from any other provider) while keeping full control of your information.
* Make **PactFlow available only to your private network**, improving significantly the security, as it would be not exposed to the internet.
* **No need to open the communication to your CI/CD pipelines** whitelisting the IP from PactFlow SaaS.

These three points listed are even more significant if we talk about an on-premise approach. The connectivity with your own servers couldn’t be more private and the data will be stored in your own hardware. But be careful, as with this approach you’re on your own as well for all the security management, so being up to date with the latest updates about security is a must.

Those are clearly the biggest advantages for some of our clients that have opted for a self-hosted approach, far exceeding the previous points that were usually favorable to the SaaS. Also, some clients have restrictions about the region where their data is stored, but that’s mainly related to regulations, not to any technical aspect, and that’s not the goal of this article.

# Team composition

Bonus section. I’ll give you a simple and quick overview of the roles that you may need for the adoption of the methodology. For any of the approaches, you will need a team expert in contract testing to help you with the process. If you go with self-hosted, that team should also include at least a cloud platform expert, it would be just one role more than with the SaaS approach.

A standard Contract Testing adoption team would be comprised of the following roles:

* **Solutions Architect:** Would be in charge of product deployment and maintenance in your platform, so you will need an expert on the platform that is going to host PactFlow. And not only the platform (AWS/Google Cloud/Azure/OpenShift) but also the technologies that are going to surround it, which could be for example Kubernetes, Istio, CertManager, or any other component used for orchestration. Only needed in a self-hosted approach.
* **Subject Matter Expert:** Role with a deep understanding of Contract Testing and PactFlow. Will act as lead for the technical team and the group of practice. A profile with good communication skills and management experience.
* **DevOps:** For CI/CD & Webhooks implementation. Specialized in pipeline implementation with the tool you use for the CI/CD (Jenkins, Bamboo, GitHub Actions…)
* **Engineers:** Roles for helping in the code implementation and adoption of Contract Testing. They need to have solid knowledge about how to implement contract testing using the languages from your stack and hopefully, really good skills for knowledge transfer with your teams members.

# Conclusion

If you ask me personally, I would say that all could be reduced to a combination of the following key questions:

* Security and specific regulations' compliance.
* Control over your data
* Cloud platform maturity and compromise with the methodology.

The first and second ones, related to security, regulations, and control over the data, are the most critical. In some industries, it would be a no-brainer and the self-hosted would be mandatory.

But if this is not the case, and we can evaluate both options, then we should calculate the costs for hosting the product and what I would call "compromise" with the methodology. Starting with the SaaS approach will be more affordable, but in the long term, the self-hosted option may be more beneficial in some specific situations.

## Summary Table

|                    |                                                     Saas                                                      |                                                               Self-Hosted Cloud                                                               |                                                       Self-Hosted on-premise                                                       |
|:-------------------|:-------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------:|
| **Implementation** |    <span style="background-color:#DFF0D8; display: block; padding: 10px;">Not your responsibility.</span>     |                       <span style="background-color:#FCF8E3; display: block; padding: 10px;">Your responsibility.</span>                       |                 <span style="background-color:#FCF8E3; display: block; padding: 10px;">Your responsibility.</span>                  |
| **Scalability**    |    <span style="background-color:#DFF0D8; display: block; padding: 10px;">Not your responsibility.</span>     |               <span style="background-color:#FCF8E3; display: block; padding: 10px;">Simple, but you will be responsible.</span>               |            <span style="background-color:#F2DEDE; display: block; padding: 10px;">Limited by physical resources.</span>             |
| **Costs**          | <span style="background-color:#DFF0D8; display: block; padding: 10px;">Easy start. Subscription model.</span> | <span style="background-color:#FCF8E3; display: block; padding: 10px;">Costly to start. Can be significantly improved in the long term.</span> | <span style="background-color:#F2DEDE; display: block; padding: 10px;">Keep physical resources up to date make it expensive.</span> |
| **Maintenance**    |    <span style="background-color:#DFF0D8; display: block; padding: 10px;">Not your responsibility.</span>     |               <span style="background-color:#FCF8E3; display: block; padding: 10px;">Simple, but you will be responsible.</span>               |         <span style="background-color:#FCF8E3; display: block; padding: 10px;">Simple, but you will be responsible.</span>          |
| **Support**        |    <span style="background-color:#DFF0D8; display: block; padding: 10px;">Not your responsibility.</span>     |               <span style="background-color:#FCF8E3; display: block; padding: 10px;">Cloud platform support on your side.</span>               |            <span style="background-color:#FCF8E3; display: block; padding: 10px;">Platform support on your side.</span>             |
| **Security**       |   <span style="background-color:#FCF8E3; display: block; padding: 10px;">Safer than popular belief.</span>    |                        <span style="background-color:#DFF0D8; display: block; padding: 10px;">Control over data.</span>                        |   <span style="background-color:#DFF0D8; display: block; padding: 10px;">Control over data, network and physical servers.</span>    |

# See you soon\!

As always, feel free to contact me, I'd love to hear your thoughts about the contents shared. And stay tuned for more updates in the _Road to PactFlow Enterprise_ series!