---
title: "Contract Testing as a service: Support your clients"
categories:
  - Contract Testing
tags:
  - Adoption
  - PactFlow
toc: true
toc_label: "Table of contents"
toc_sticky: true
excerpt: "An alternative use of Contract Testing for enhancing your API business."
header:
  overlay_image: /assets/images/header-contract-testing-aas.png
  overlay_filter: 0.6
  teaser: /assets/images/teaser-contract-testing-aas.png
---
# Introduction

Contract Testing is typically associated with managing integration, versioning, and compatibility across microservices in large-scale architectures. This is the most common and straightforward use case for the technology. However, there are other use cases. In this article, we'll explore what we think is a particularly interesting _(and original?)_ alternative use case: **supporting your clients when their business's core is based on an API you offer**.

This presents unique challenges but also valuable opportunities, where Contract Testing can play a crucial yet distinct role. In such a **symbiotic relationship**, where your API is the core of your client's operations, maintaining seamless integration is not just a priority, **it's a commitment to the success of both parties**.

Let's dive in.

# Context

A client approached us with a unique situation. Their entire business revolved around an API that clients used to integrate into their system. This API was their **core offering**, serving numerous clients who relied on it for their day-to-day operations. While everything ran smoothly most of the time, they had experienced a few isolated incidents where changes, despite careful planning, caused minor disruptions. Given the critical nature of their operations, they wanted to prevent such issues from occurring in the future.

So, instead of sticking with the traditional API versioning approach _(and chasing clients to update…)_, we proposed something different: **provide your clients with a platform** enabling them to perform Contract Testing on your API. **Engage them in the API lifecycle**. Give them more **control**, and **participation**: ensure better **peace of mind** for both parties.

At the end of the road, in this business case, that specific API integration was crucial for everyone involved.


# Challenges

In our conversations with the client, we identified several challenges they faced while managing their API. One of the primary issues was the **ongoing management of changes to the API**. Each modification created a ripple effect, forcing the maintenance of compatibility across various integrations and leading to an **overwhelming historical record of versions**.

Moreover, the pressure to ensure reliable and secure integrations weighed heavily on their team. They often **lacked clear feedback from clients** regarding how these changes impacted their operations, making it difficult to prioritize and address concerns effectively. This communication gap obstructed their ability to proactively manage integrations and respond to client needs on time.

Additionally, since the service they offered through this API was core to their client's businesses, any change, no matter how minor, could potentially disrupt client operations. This not only strained their resources but also put their relationships with clients at risk. **Balancing the need for innovation with the necessity of stability** became a critical challenge they had to navigate carefully.

# Contract Testing as a Service

We proposed offering Contract Testing as a service through a PactFlow instance, enabling clients to conduct testing collaboratively. This service could be offered exclusively to 'VIP' clients, extended to all, or even packaged as a perk for specific subscription tiers. While clients would need to provide effort from their side _(you know, small details like developing tests and publishing consumer contracts…)_, the potential benefits for both sides are significant:

* Increased agility in development.
* Drastic reduction of risks and conflicts with each update.
* Instant feedback and insights on API usage.
* Out-of-the-box mocks for all API versions and contracts.
* Substantial enhancement of the developer (client) experience.

I really like the last point. **Enhancing the developer experience should always be a top priority.** Remember that we will improve the stability of integrations and reduce the MTTI (Mean Time To Integration). A seamless integration process is key for new clients to quickly adopt the API, while ensuring existing use cases continue without disruption. This agility allows developers to focus on innovation rather than dealing with compatibility issues.

**Developer portals would also play a crucial role** in maximizing the effectiveness of this approach. These portals not only centralize documentation and integration tools, but also provide access to test environments and up-to-date contracts, streamlining the process for both provider and consumer teams. Developer portals allow operations to scale in an organized and efficient way, which is essential as API ecosystems grow.

Additionally, we will be able to **anticipate emerging use cases**. By analyzing the contracts, and the use each client does of our platform, we can uncover emerging use cases that need to be addressed to keep the API relevant. This not only improves reliability but also provides a deeper understanding of how customers are using the system in real-world scenarios.

This is not just about offering a technical tool. **It's about establishing a deeper collaboration with clients who are integral to your business**. In a context where breaking the integration is simply not an option, engaging your clients in the testing process offers a layer of assurance that benefits both sides.

![image-center](/assets/images/diagram-contract-testing-aas.png){: .align-center}

# Bi-directional or Consumer Driven?

When deciding between bi-directional and consumer-driven in this scenario, it's important to note that **the impact of the decision on clients is minimal**. It mainly impacts the provider. In a bi-directional setup, the provider chooses to publish their OpenAPI to PactFlow, relying on PactFlow to do its magic. On the other hand, in a consumer-driven approach, the provider needs to implement tests, covering the specific states specified in consumer contracts.

So, our two cents on this topic: If you decide to go with the *"VIP only"* approach, **a consumer-driven strategy may yield more comprehensive integration testing**, and although it would require greater effort on your part to cover different scenarios, it will also enhance your understanding of your client's needs.

However, **if the service is extended to a broader client base**, managing states for numerous contracts can be complex. You'd need to focus on homogenizing the states used by all your clients to simplify your life. And good luck with that… you'll end up having changed one problem for another. That's why, in such cases, **sticking with a bi-directional approach may simplify management** while ensuring reliable API integrations.

Let me do a bit of self-promotion and invite you to read <a href="https://apenlor.github.io/contract%20testing/contract-testing-workflows/" target="_blank">this article about consumer-driven workflows in Contract Testing</a>.

# Considerations about this Strategy

While the benefits of adopting Contract Testing as a Service are clear, some considerations should not be ignored when adopting a strategy like this:

* **Complexity in Business Relationships:** Sharing testing responsibilities with clients can be empowering, but it may also elevate expectations around API stability. VIP clients might anticipate quicker resolutions or personalized attention, which could lead to friction with standard-tier clients if not carefully managed. Setting clear expectations across different client tiers is essential to maintain balance.
* **Operational Overhead:** Clients will need to invest time in developing and maintaining their contract tests. On the provider's side, managing and supporting multiple contracts will require additional coordination to ensure all contracts are effectively handled. However, well-structured processes and automation can help minimize these challenges.
* **Contractual Risks:** While passing contract tests increases confidence in API changes, it doesn't eliminate the risk of failures. If not carefully managed, this could create a false sense of security. Clear communication about the limitations of testing and compliance expectations should be maintained to avoid misunderstandings.

# Conclusion

In summary, adopting Contract Testing as a Service offers a transformative opportunity to enhance the relationship with your clients in these kinds of contexts. **By involving clients in the API lifecycle and providing collaborative testing tools, your business can improve stability, agility, and communication**.

This approach mitigates risks associated with API changes and fosters stronger partnerships. Furthermore, developer portals and sandbox environments can elevate the entire API ecosystem, fostering trust and ensuring mutual success. A bi-directional approach simplifies management, while a consumer-driven strategy fosters deeper collaboration, aligning your service more closely with your clients' real-world needs.

For businesses whose clients rely on their API as a core component of their operations, **Contract Testing is not just a safety net. It's a way to deepen collaboration**, foster trust, and ensure mutual success.

Ultimately, the right strategy will depend on the client base and the specific challenges faced, paving the way for a more resilient API ecosystem.

Thanks for reading!

