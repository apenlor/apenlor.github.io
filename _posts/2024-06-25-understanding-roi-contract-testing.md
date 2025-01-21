---
title: "Understanding the ROI for Contract Testing"
categories:
  - Contract Testing
tags:
  - ROI
  - pact
  - PactFlow
toc: true
toc_label: "Table of contents"
toc_sticky: true
excerpt: "Explore the economic impact potential of Contract Testing."
header:
  overlay_image: /assets/images/header-roi.png
  overlay_filter: 0.6
  teaser: /assets/images/teaser-roi.png
---
# Introduction

Welcome to a new exploration into Contract Testing. In this instance, I won't be delving into technical concepts, implementation strategies, or adoption techniques. Instead, our focus shifts to one of the key factors to consider when adopting a methodology or product: Return on Investment (ROI).

**This article aims to shed some light on how to perform a Return on Investment (ROI) calculation for Contract Testing**, even though we must use hypothetical data since the circumstances of each company are vastly different. We'll discuss the benchmarks, values utilized, and internal calculations that will help us understand the potential impact of this practice.

I assume you're familiar with Contract Testing and its significant value impact on organizations working with complex architectures aiming to streamline deployment processes. In case you want to learn more about this quality engineering framework, feel free to read some of my previous technical articles.

Now, let's delve deeper into its cost implications 🤑

## What is ROI?

If you're reading this, you probably know perfectly well what it is, but just to ensure we're all aligned....

ROI, or Return on Investment, stands at the core of business evaluation. It serves as a compass, guiding organizations in their decision-making processes by quantifying the **returns generated for every dollar invested**.

When embarking on technology transformations or considering the adoption of methodologies such as Contract Testing, organizations weigh the potential benefits against the investment required. This evaluation encompasses two main components: the investment, which encompasses both monetary and resource allocation, and the anticipated return, which represents the expected benefits and outcomes.

|                   The Formula                   |
|:-----------------------------------------------:|
| ROI = (Return - Investment / Investment) x 100% |

## But it's not all about the money... right?

Studies like ```Google's State of DevOps Report```[^1] & ```ROI of DevOps Transformation```[^2] highlight the significant impact of automation techniques on **employee satisfaction** and well-being.

Having Contract Testing validation checks in place to ensure that deployments won't break the system provides peace of mind, reduces the risk of burnout, and increases satisfaction with the work being done, creating a better environment for a high-performance context.

This study also reveals that employees who work in high-performance teams are **2.2 times more likely to recommend their workplaces** as _"great places to work"_. Retaining existing talent preserves institutional knowledge and gives organizations an advantage by having a strong technical workforce that is engaged and continually learning. If this were not enough, in today's competitive landscape for talent, the costs of turnover are pretty significant. According to the ```Center for American Progress```[^3], the typical cost of turnover amounts to 21% of an employee's annual salary.

So, it is not only value or direct costs. It's also about **creating a better environment for your employees and business to grow**.

# Calculating the Costs

Let's explore a hypothetical scenario to estimate the costs of implementing and maintaining Contract Testing. It's important to understand that this context should be analyzed and studied carefully and in detail for each company's specific situation. However, we need to establish some base numbers and assumptions for this article.

## Assumptions

**Contract Testing SME rate** - $180/hour.  
**PactFlow license** - $10,000 yearly.

| Indicator          | Details                                                                                                                                                                                       | Formula                                                                                                 | Work Hours  |        Cost        |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|:-----------:|:------------------:|
| **Implementation** | - Design and development of pipelines for process automation.<br/>- Documentation and support materials.<br/>- Training plan for development teams.<br/>- Design of a monitoring methodology. | Under normal conditions, once standardized, implementation will be carried out by 2 people for 4 weeks. |     320     | $57,600 (one-time) |
| **Maintenance**    | - Support and maintenance of pipelines.<br/>- Support and assistance for development teams.                                                                                                   | Initially, it requires more dedication. Estimate 1 day/week of dedication  throughout the year.         | 400  / year |  $72,000  / year   |

## Financial Summary

| Description                  | First Year Costs | Subsequent Years Costs |
|------------------------------|:----------------:|:----------------------:|
| **With PactFlow License**    |     $139,600     |    $82,000 per year    |
| **Without PactFlow License** |     $129,600     |    $72,000 per year    |


# Calculating the Savings

To complement our analysis of costs, we now turn our attention to evaluating the potential savings that Contract Testing can bring to an organization. Savings can differ significantly based on a variety of factors unique to each organization's structure and technological landscape. In this section, we will establish some general benchmarks and hypothetical scenarios to illustrate these potential savings.

## Assumptions

For our analysis, let's consider a typical scenario involving just one team:

| Team members                  | 5 (800h/month)   | A small development team.                                                                                                                                                                          |
|:------------------------------|:-----------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Average Salary per hour       | $60 / hour       | Equivalent to $100,000 annually, assuming 1700 working hours per year.                                                                                                                             |
| Time dedicated to testing     | 200h/month (25%) | It's a commonly accepted ```rule of thumb```[^4] to estimate that 20%-40% of time is dedicated to testing, depending on project complexity.                                                        |
| Time dedicated to bug-solving | 160h/month (20%) | Based on a ```DevOps.com survey```[^5], the percentage could be even higher in many contexts, but using 20% simplifies the calculation.                                                            |
| E2E Infrastructure costs      | $1,700 / month   | Estimation for maintaining 2 t3.medium instances and one PostgreSQL RDS <a href="https://calculator.aws/#/estimate?id=114862e0e26d1928d31fc049167e1b899591f09e" target="_blank">AWS Calculator</a> |

With this hypothetical data, we calculate the expenses of the team in testing activities:

|                                       Expenses                                       |
|:------------------------------------------------------------------------------------:|
| Monthly Costs = Infra Costs + (Time dedicated to testing & bug solving  Hour Salary) |

With the following results:

|     Testing activities costs      |
|:---------------------------------:|
| $23,300 / month – $279,600 yearly |

![image-center](/assets/images/diagram-roi-savings.png){: .align-center}

## Savings

Let's now calculate how much savings can be achieved with the implementation of Contract Testing:

| Activity                         | Reduction | Hours    | Justification                                                                             |
|----------------------------------|-----------|----------|-------------------------------------------------------------------------------------------|
| Testing time reduction           | 30%       | 60 hours | These percentage-based time reductions are based on our own experience helping customers. |
| Bug-solving time reduction       | 60%       | 96 hours |                                                                                           |
| E2E Infrastructure use reduction | 20%       | $340     |                                                                                           |

Using the same formula as before, here are the impacts in numbers:

|    Testing activities savings    |
|:--------------------------------:|
| $9,700 / month – $116,400 yearly |

# Return on Investment

At this point, we have calculated the initial investment cost, ongoing maintenance, and the potential savings related to Contract Testing. We are now ready to apply the suggested ROI formula:

|                   The Formula                   |
|:-----------------------------------------------:|
| ROI = (Return - Investment / Investment) x 100% |

The results are:

|                      | Formula                                   | Return on Investment |
|----------------------|-------------------------------------------|:--------------------:|
| **First Year**       | (($116,400 - $139,600) / $139,600) * 100% |     **-16.62%**      |
| **Subsequent Years** | (($116,400 - $82,000) / $82,000) * 100%   |      **61.67%**      |

The ROI for the first year indicates a short-term loss. This result is common in investment scenarios where upfront costs for implementation and initial setup exceed the immediate savings. However, this initial loss will yield higher efficiencies and cost savings shortly.

In subsequent years, the ROI turned positive to 61.67%, reflecting the significant reduction in ongoing costs due to the efficiencies gained from Contract Testing. This positive ROI highlights the longer-term benefits of the investment, where **the initial costs are recouped and additional savings are realized**, **leading to a substantial net gain**. This underscores once again the importance of considering the lifetime value of investments in technology and process improvements rather than focusing solely on immediate returns.

These ROI figures illustrate the critical point that while initial investments in Contract Testing can be significant, the cost savings and efficiencies realized over time make it a worthwhile endeavor for organizations aiming to enhance their software development lifecycle and reduce long-term operational costs.

It's important to note that **these calculations have been performed considering only one team**, suggesting that scaling up this practice could potentially amplify these benefits across larger organizational contexts.

# Payback Period

We can take our financial analysis a step further by calculating the payback period. This will clearly show the time it takes for the initial investment in Contract Testing to be fully recouped through savings.

| Year  |     Cumulative Investment     | Cumulative Savings |
|-------|:-----------------------------:|:------------------:|
| **1** |           $139,600            |    **$116,400**    |
| **2** | $139,600 + $82,000 = $221,600 |    **$232,800**    |
| **3** | $221,600 + $82,000 = $303,600 |    **$349,200**    |

The table demonstrates that by the end of the second year, the cumulative savings exceed the cumulative investments, effectively paying back the initial outlay. This analysis assumes full realization of the estimated savings; however, it's prudent to note that in the first year, actual savings may be lower than projected due to factors like the onboarding process for teams and the learning curve for developers.

Given this consideration, **while the second year might already show a net positive return, a more conservative estimate would place the complete recovery of the initial investment within 3 to 4 years**.

And once again, it's important to note that **these calculations have been performed considering only one team.** So, you can imagine the magnified impact in larger organizations where multiple teams simultaneously reap the benefits.

# The Value Beyond Costs

Typically, ROI assessments encompass both tangible and intangible returns, categorized into two main types: value-driven and cost-driven.

* **Value-driven**: This approach emphasizes the delivery of value to customers, focusing on aspects such as opportunity cost, the ability to adapt quickly to market demands, and the efficiency of delivering value to customers.
* **Cost-driven**: This type focuses on cost savings and efficiency gains. It includes considerations such as time and resource savings and the improvements brought about by lean practices.

Throughout our analysis, we have primarily focused on the cost-driven benefits associated with Contract Testing, quantifying the direct costs and savings involved. However, it's important to acknowledge that our evaluation did not address the value-driven aspect. This is primarily due to the complexity of estimating such benefits in specific numerical terms. These value-driven aspects contribute to a more agile, efficient, and competitive organization, which are indispensable in today's fast-paced market environments.

Let's recap some of the value-driven features that Contract Testing provides, all of them mentioned in the ```Contract Testing Report from 2021```[^6]:

## Cost of Delay

Represents the economic loss associated with any delay in time-to-market or product updates. By implementing Contract Testing, organizations can significantly accelerate their development cycles, reducing the cost of delays and gaining a competitive advantage through faster market entry or updates.

## Cost of Downtime

Downtime can lead to significant financial losses, lost customers, and damage to your brand's reputation. Contract Testing improves the reliability and stability of applications, ensuring that system components function well together before going live. This reduces the frequency and likelihood of downtimes, helping to avoid these costly disruptions.

## Costs Related to Failed Deployments

Failed deployments can lead to significant losses of time and resources, and they often bring considerable stress. Such failures typically happen when a deployment to production does not go as planned, resulting in rollbacks and the need for emergency fixes. Contract Testing helps reduce these occurrences by ensuring that all integrations between different components or services meet predefined agreements. By detecting potential failures early in the development cycle, issues can be addressed before they impact any deployment. This proactive approach not only saves costs associated with emergency interventions but also helps maintain the reliability and integrity of systems.

## Potential Value Added from Reinvestment in New Features

The time and resources saved through implementing Contract Testing can be redirected toward innovation and the development of new features. This reinvestment not only enhances product offerings but can also increase revenue and market share.

## Reduction in Blocking Situations Between Teams

Facilitating clearer and more precise interactions between different components or services, significantly reducing dependencies and the potential for blocking situations between teams. This improvement leads to a smoother workflow and increased productivity across departments, ultimately enhancing overall operational efficiency.

# Conclusion

The results are in, and honestly, I think they're pretty exciting!

Our analysis demonstrates that Contract Testing not only saves substantial amounts of time and resources but also delivers very positive ROI figures. The payback period is remarkably short, revealing that the initial investment can be recouped much faster than anticipated. Furthermore, the benefits of Contract Testing scale dramatically with the size and complexity of teams and systems. As your organization grows and systems become more intricate, the advantages of implementing Contract Testing multiply, significantly boosting productivity and efficiency across all operations.

Additionally, the value-driven features we discussed play a crucial role in enhancing your organization's strategic positioning and competitive advantage.

Embracing this methodology not only improves your current processes but also sets a robust foundation for future growth and success.

[^1]:  [https://services.google.com/fh/files/misc/2023\_final\_report\_sodr.pdf](https://services.google.com/fh/files/misc/2023_final_report_sodr.pdf)

[^2]:  [https://services.google.com/fh/files/misc/whitepaper\_roi\_of\_devops\_transformation\_2020\_google\_cloud.pdf](https://services.google.com/fh/files/misc/whitepaper_roi_of_devops_transformation_2020_google_cloud.pdf)

[^3]:  [https://www.americanprogress.org/wp-content/uploads/sites/2/2015/08/CostofTurnover0815.pdf](https://www.americanprogress.org/wp-content/uploads/sites/2/2015/08/CostofTurnover0815.pdf)

[^4]:  [https://techjury.net/blog/software-testing-statistics/](https://techjury.net/blog/software-testing-statistics/)

[^5]:  [https://devops.com/survey-fixing-bugs-stealing-time-from-development/](https://devops.com/survey-fixing-bugs-stealing-time-from-development/)

[^6]:  [https://pactflow.io/pactflow-contract-testing-report-2021/](https://pactflow.io/pactflow-contract-testing-report-2021/)