---
title: "PactFlow & Contract Testing: A Business Case Study"
categories:
  - Contract Testing
tags:
  - Adoption
  - PactFlow
toc: true
toc_label: "Table of contents"
toc_sticky: true
excerpt: "An anonymized real-case study about Contract Testing adoption."
header:
  overlay_image: /assets/images/header-contract-testing-case-study.png
  overlay_filter: 0.6
  teaser: /assets/images/teaser-contract-testing-case-study.png
---
# Introduction

In today's article, I'll walk you through an anonymized **real-case scenario of a large financial institution in the US** adopting Contract Testing. By analyzing the context, challenge, proposed solution, project execution, and key learnings, we will construct a comprehensive picture of a project that exemplifies an ideal context for contract testing adoption.

For those interested in a deeper dive, I also have a <a href="https://www.youtube.com/watch?v=LyVSmRtwFkc" target="_blank">YouTube collaboration with the PactFlow team</a> that goes over the same business case and analyzes all these points in detail with our colleagues from PactFlow.

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/LyVSmRtwFkc?controls=0" frameborder="0" allowfullscreen></iframe>

# Challenge

In today's fast-paced tech environment, companies must optimize their delivery pipelines to remain competitive. The need for rapid deployment, cost reduction, and increased team confidence has driven many to embrace early bug detection and automation (I'm pretty fan of <a href="https://en.wikipedia.org/wiki/Shift-left_testing" target="_blank">Shift-Left Testing</a> 😊).

For this U.S. client, the transition from monolithic applications to a microservices architecture presented significant challenges. **They had previously relied heavily on manual end-to-end (E2E) testing, but with nearly 200 applications that needed to communicate seamlessly, this approach quickly proved impossible**. The dramatic increase in E2E testing led to higher costs, longer development times, and greater complexity in managing integration points, creating an urgent need for a more efficient and scalable testing approach.

# Proposed Solution

To address this challenge, SNGULAR is brought in to establish a comprehensive testing practice, starting with PactFlow and Contract Testing. Leveraging our experience with similar projects, we identify three core concepts that define the foundation for large-scale adoption:

1. **Stakeholder Buy-In**: Collaboration across departments is essential. Contract testing impacts not just development teams but also requires alignment with Security, DevOps, and Platform teams. We prioritize gaining buy-in from key stakeholders by aligning on clear goals, objectives, and strategies, ensuring everyone is on the same page from the start. It is crucial to have all departments working together to move forward effectively.
2. **Initial MVP**: We begin with a manageable project by creating a minimum viable product (MVP) to test and validate the concepts. This phase involves a small working group and limited pipeline coverage, allowing us to establish a solid working context and refine our approach. The success of this MVP provides valuable insights that guide the broader adoption across the organization.
3. **Establishing the Group of Practice (GoP)**: After proving the value of Contract Testing through the MVP, the next step is to scale the practice across the organization. We establish an internal GoP to drive adoption, provide training, and ensure the consistent application of contract testing principles. This group becomes instrumental in educating teams, promoting best practices, and supporting continuous improvement, laying the foundation for a sustainable, scalable testing framework.

So, we're all aligned, and everyone is ready to start the journey. How do we execute that crucial initial MVP and GoP establishment to set up the practice foundation?

# Execution

## MVP development

The execution phase initially focused on the development of the MVP to demonstrate the value of contract testing using PactFlow. The project was structured into three work streams:
{% include figure popup=true image_path="/assets/images/diagram-mvp-case-study.png" alt="MVP Planning" caption="MVP Planning" %}

### Tech Capability

Concentrated on establishing the necessary technical capability and infrastructure. Over **three sprints**, the team achieved the following:

* Established technical capability and infrastructure for PactFlow.
* Enabled three on-premises PactFlow instances.
* Configured and integrated PactFlow with the corporation's ecosystem.
* Implemented CI/CD pipelines for basic Contract Testing.

### Onboarding Teams

The second work stream focused on onboarding teams and building internal expertise. Over **four sprints**, the team accomplished:

* Onboarded two teams as pilots for the MVP.
* Generated sample consumer and provider contracts for the MVP APIs.
* Provided demos and tech talks to introduce the methodology.
* Provided training to teams to become self-sustaining with PactFlow and Contract Testing.

### Setting Up the Group of Practice

The third work stream focused on establishing the GoP to ensure continuous improvement and widespread adoption of contract testing. Over **two sprints**, the team:

* Defined the GoP composition.
* Identified and agreed on GoP deliverables.
* Defined KPI metrics and started collecting data.
* Agreed on report contents for stakeholders.
* Defined continuous improvement strategy.

## GoP Duties

The Group of Practice is essential in ensuring the effective and widespread adoption of contract testing within the organization. Here's how they contribute to the process:


### Metrics

The GoP establishes and tracks various metrics and KPIs to measure the speed and success of contract testing adoption across the organization. These metrics help in evaluating the impact and effectiveness of the new processes.

#### Quantitative Metrics

Quantitative metrics are crucial for measuring tangible outcomes and adoption rates. They can be categorized into two main types: engagement and impact. Some examples below:

| Engagement Metrics                             | Impact Metrics                |
|------------------------------------------------|-------------------------------|
| Number of pipelines with can-i-deploy enabled. | Time spent on manual testing. |
| Number of projects with contracts in PactFlow. | Deployment frequency.         |
| Number of endpoints covered with CT.           | Lead time for change.         |
|                                                | Change failure rates.         |
|                                                | Mean time to recovery (MTTR). |

#### Qualitative Metrics

Qualitative metrics provide insights into the overall satisfaction and effectiveness of the new tools. They should be tracked regularly and ideally using anonymous (blameless) surveys.

* Team satisfaction with the new tools.
* Pains and gains.
* PactFlow Activity.
* Community Engagement. How active and supportive is the community?

### Processes

Developing a standard methodology for team adoption is a crucial duty of the GoP. This includes creating step-by-step instructions for the workflow of all contract testing-related tasks within each sprint. The GoP also will recommend a development model that aligns with the release cycle ideally using a branching strategy. Additionally, they adapt the SDLC to incorporate contract testing and define onboarding and monitoring processes for all relevant teams.

### Support

Effective communication is always vital for the success of any structural change. The GoP facilitates real-time collaboration by enabling the rapid collection of data and ideas. Regular "open sessions" are organized to address and resolve any questions or issues. Furthermore, the GoP holds regular meetings with stakeholders, including development, quality assurance, site reliability engineering, and product owners to track progress. An open commenting and annotation system is also created to involve others and enhance coverage.

### Tracking

The GoP is responsible for reporting KPI progress to all key stakeholders. They provide support and follow-up for all teams to ensure continuous improvement. Feedback is gathered to refine and enhance all processes and practices, ensuring that the adoption of contract testing is both effective and efficient.

On the other hand, if you're interested in learning more about how we manage the onboarding process for each team, check out the 'Onboarding New Teams' section in the <a href="https://apenlor.github.io/contract%20testing/contract-testing-and-development/#onboarding-new-teams" target="_blank">Contract Testing & Development article</a>.

# Success and Full Adoption

The MVP phase successfully demonstrated the value of contract testing, leading to substantial improvements in testing efficiency, cost reduction, and deployment speed. This success convinced company VIPs to fully adopt contract testing across the organization. The decision marked the beginning of a comprehensive rollout, supported by the established technical infrastructure and the Group of Practice, ensuring ongoing success and continuous improvement.

## MVP results after 9 sprints

Throughout nine sprints, the implementation of contract testing yielded tangible results that underscored its effectiveness:

### Governance

* **Training and Expertise:** Two teams were fully trained in contract testing techniques, with four members becoming Contract Testing champions.
* **KPIs and GoP:** Eight KPIs were defined, and the GoP was established to engage teams and ensure ongoing adoption.
* **Security:** Role-Based Access Control, user authentication, and secure access with traceability were successfully implemented.

### Technical Achievements

* **Coverage:** Six critical endpoints were covered by contract testing.
* **Integration:** Two Jenkins pipelines were fully integrated with PactFlow, streamlining the testing process.
* **Bug Detection:** The approach was effective, as two bugs in production environments were detected through contract testing.

### Time Efficiency

* **First Test:** The first test was developed in just 8 hours.
* **Pipeline Integration:** Integration of the first pipeline took 3 weeks.
* **Bug Discovery:** Within 4 weeks of project initiation, the first bug was discovered and addressed.

## Client estimated impact on cost savings

The transition to contract testing streamlined processes and resulted in significant savings. After an internal analysis of the results, **the client estimated a 66% reduction in both time and costs associated with manual E2E testing**.

This estimate does not account for additional savings, such as the reduced time needed to resolve bugs detected by E2E tests, lower costs related to environment provisioning, and the anticipated future improvements in testing expertise and speed across teams. Again, if you want to learn more about Contract Testing ROI, <a href="https://apenlor.github.io/contract%20testing/understanding-roi-contract-testing/" target="_blank">here´s the related article</a>.

The implementation of contract testing has proven to be a transformative step for the organization, offering a scalable, efficient, and cost-effective solution that perfectly aligns with their transition to a microservices architecture. This success is the key reason behind fully adopting contract testing across the organization.

# Key Learnings

Just to finish, some of the key learnings we gained from this experience include:

* **Contract Testing Champions are essential:** They are crucial in driving adoption and ensuring the practice is embraced across teams.
* **Group of Practice is a must:** The GoP is the backbone of the practice, guiding, supporting, and sustaining the adoption process.
* **Monitoring metrics are vital:** Ad-hoc metrics are key to tracking success, ensuring alignment with goals, and identifying practice-specific areas for improvement.



