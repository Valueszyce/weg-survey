export interface Question {
  id: string
  text: string
  anchor1: string
  anchor3: string
  anchor5: string
}

export interface SurveyStep {
  title: string
  subtitle: string
  questions: Question[]
}

export const surveySteps: SurveyStep[] = [
  {
    title: "How you price your services",
    subtitle: "Questions 1–5 of 28",
    questions: [
      { id:"Q2", text:"How do you set your prices?", anchor1:"We set prices based on gut-feeling or only our service costs.", anchor3:"We set prices based on costs and what competitors charge.", anchor5:"We set prices based on cost, competition, and the value we deliver to clients." },
      { id:"Q3", text:"How differentiated is your pricing by team composition, seniority, or specialisation?", anchor1:"We apply a flat rate or simple blended T&M rate regardless of who is on the project.", anchor3:"We differentiate by seniority level, but not by technology stack or domain specialisation.", anchor5:"We have a fully structured rate card differentiated by seniority, specialisation, and strategic value — and we defend it actively in negotiations." },
      { id:"Q4", text:"How has AI-driven productivity influenced the way you price your services?", anchor1:"We price the same way as before AI — primarily based on hours and headcount.", anchor3:"We recognise AI is changing our delivery economics but haven't formally updated our pricing model yet.", anchor5:"We have proactively restructured our pricing to decouple revenue from hours and reflect AI-driven value delivery." },
      { id:"Q5", text:"Do you measure the value created by your services for your clients?", anchor1:"We don't measure the value we deliver.", anchor3:"We occasionally measure client perceptions, but there is no formal process or consistency.", anchor5:"We have a well-defined and systematic process for measuring the value delivered regularly." },
      { id:"Q6", text:"How accurately do you assess clients' willingness to pay for your service?", anchor1:"We don't assess willingness to pay.", anchor3:"We use some basic surveys or interviews to test willingness to pay, but it is not fully reliable.", anchor5:"We use advanced methodologies, including price sensitivity meters and conjoint analysis, to assess willingness to pay with high accuracy." },
    ],
  },
  {
    title: "How you communicate and compete",
    subtitle: "Questions 6–10 of 28",
    questions: [
      { id:"Q7", text:"How accurately do you track the total cost of producing and delivering your services?", anchor1:"We do not track service delivery costs accurately.", anchor3:"We have basic cost tracking in place, but it is not comprehensive or real-time.", anchor5:"We track service costs in great detail, with comprehensive cost breakdowns." },
      { id:"Q8", text:"How do you communicate the cost of your services to potential clients?", anchor1:"We communicate costs purely in time units — man-days, hourly rates, or T&M estimates.", anchor3:"We communicate a fixed price for a defined scope, but the framing is still effort- and deliverable-based.", anchor5:"We communicate cost in terms of value delivered — framing the price around expected client outcomes." },
      { id:"Q9", text:"How well do you track and understand the service offerings of your competitors?", anchor1:"We have no formal tracking of competitors' service offerings.", anchor3:"We monitor competitors sporadically, but do not have a comprehensive view.", anchor5:"We have an ongoing, in-depth analysis of competitors' service offerings." },
      { id:"Q10", text:"How effectively do you track and evaluate the sales tactics used by your competitors?", anchor1:"We do not track competitors' sales tactics.", anchor3:"We know about competitors' sales tactics only from what our clients tell us.", anchor5:"We continuously monitor and analyse competitors' sales tactics via mystery shoppers and interviews." },
      { id:"Q11", text:"Do you communicate value delivered to your clients on your website?", anchor1:"We don't communicate service value on our website.", anchor3:"We communicate generic value delivered (not only feature descriptions).", anchor5:"We communicate quantified value delivered on our website (e.g. this solution increases profit by 5%)." },
    ],
  },
  {
    title: "How you handle scope and deals",
    subtitle: "Questions 11–15 of 28",
    questions: [
      { id:"Q12", text:"How do you handle changes to project scope during delivery?", anchor1:"We absorb scope changes without formally adjusting the price.", anchor3:"We occasionally charge for significant changes, but it's ad-hoc and negotiated case by case.", anchor5:"We have a well-defined change order process — any scope change triggers a separate pricing conversation automatically." },
      { id:"Q13", text:"When estimating a deal's value, how comprehensively do you factor in contextual variables?", anchor1:"We don't take any context into account — estimates are based on scope and costs alone.", anchor3:"We occasionally consider some context (e.g. client size or project urgency), but it's informal and inconsistent.", anchor5:"We have a well-defined process covering client context, deal context, and our own company context (capacity, strategic fit)." },
      { id:"Q14", text:"Do you implement success fees in your offers?", anchor1:"We do not implement them.", anchor3:"We occasionally implement them.", anchor5:"We have a well-defined and systematic approach for success fee implementation." },
      { id:"Q15", text:"When closing a deal, do you give discounts to your potential clients?", anchor1:"We give discounts to around half of clients who ask for one.", anchor3:"We rarely give discounts — only to strategic clients who provide additional benefit (case studies, logos).", anchor5:"Discounting is a strategic pricing tool that we use intentionally to optimise our P&L." },
      { id:"Q16", text:"Over time, are you increasing prices to clients who were discounted during the sales process?", anchor1:"We almost never increase prices to discounted clients.", anchor3:"We run bi-yearly price increase actions for discounted clients.", anchor5:"We have a set process for price increases for discounted clients." },
    ],
  },
  {
    title: "How you protect and grow margin",
    subtitle: "Questions 16–20 of 28",
    questions: [
      { id:"Q17", text:"Do you track how much revenue you are losing via discounts?", anchor1:"We don't know how much margin we are leaking through discounted clients.", anchor3:"We roughly know how much margin we are leaking through discounted clients.", anchor5:"We know exactly how much margin we are leaking through discounted clients." },
      { id:"Q18", text:"When was the last time you increased your prices?", anchor1:"We last increased prices more than 2 years ago.", anchor3:"We last increased prices more than 1 year ago.", anchor5:"We increased prices within the last year." },
      { id:"Q19", text:"What is the basis for your price increases?", anchor1:"Price increases are ad-hoc, based only on inflation.", anchor3:"There is a price increase plan, based on costs and competition.", anchor5:"There is a price increase plan. Price increases are based on the value our services deliver to clients." },
      { id:"Q20", text:"Do you measure how much revenue comes from uplifting existing clients?", anchor1:"We don't measure revenue uplift from existing clients.", anchor3:"We measure revenue uplift from existing clients.", anchor5:"We measure revenue, upsell, downsell, and churn from existing clients." },
      { id:"Q21", text:"How intentionally do you build recurring revenue into your business model?", anchor1:"Almost all revenue is project-based — one-off engagements with no structured follow-on.", anchor3:"We have some recurring contracts, but most revenue is still driven by new project sales.", anchor5:"We have deliberately structured our business around retainers and recurring engagements as a strategic growth lever." },
    ],
  },
  {
    title: "Your sales execution",
    subtitle: "Questions 21–24 of 28",
    questions: [
      { id:"Q22", text:"How important is expansion revenue for the growth of your business?", anchor1:"We don't measure or set any KPIs for expansion revenue.", anchor3:"Expansion revenue plays an important role in our growth.", anchor5:"Expansion revenue is a strategic business lever for us." },
      { id:"Q23", text:"What levers do your salespeople use when negotiating with a potential client?", anchor1:"Negotiations are only about price.", anchor3:"Negotiations are around price and value delivered — but we mostly end up reducing the price.", anchor5:"Negotiations start with value delivered. If there's a price decrease, there must be a scope reduction." },
      { id:"Q24", text:"Do your salespeople have additional assets they can use when closing a deal?", anchor1:"Salespeople close deals by discussing price alone.", anchor3:"Salespeople close deals with price and supporting materials, e.g. case studies and references.", anchor5:"Salespeople close deals with advanced toolkits, like value calculators and ROI models." },
      { id:"Q25", text:"Does your contract provide you with pricing agility?", anchor1:"Contracts don't give us any pricing agility.", anchor3:"Contracts give us some pricing agility, e.g. the option to increase prices on a yearly basis.", anchor5:"We have cost-of-living adjustments in our contracts and the option to increase prices at any time." },
    ],
  },
  {
    title: "Your internal capabilities",
    subtitle: "Questions 25–28 of 28",
    questions: [
      { id:"Q26", text:"How well are sales and negotiation tactics distributed throughout your organisation?", anchor1:"We don't have any sales or negotiation tactics codified in the company.", anchor3:"There are codified sales and negotiation tactics that increase our conversion rate.", anchor5:"We constantly improve our sales and negotiation capabilities via guidebooks and codified knowledge." },
      { id:"Q27", text:"Do you run sales training in your company?", anchor1:"No training.", anchor3:"Internal training only.", anchor5:"Internal and external training." },
      { id:"Q28", text:"How often is pricing brought up as a formal topic in your organisation?", anchor1:"We don't have any calls dedicated to the pricing process.", anchor3:"We schedule pricing calls when we feel the need.", anchor5:"We have a specific, recurring Pricing Committee meeting dedicated to pricing." },
      { id:"Q29", text:"Who is responsible for pricing at your company?", anchor1:"Responsibility is scattered — no one specific person addresses pricing.", anchor3:"There are people whose partial responsibilities are related to pricing.", anchor5:"There is a dedicated person responsible for pricing, with KPIs tied to pricing outcomes." },
    ],
  },
]

export const totalQuestions = surveySteps.reduce((sum, s) => sum + s.questions.length, 0)
