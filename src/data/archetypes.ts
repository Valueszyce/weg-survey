export interface Archetype {
  code: string;
  name: string;
  description: string;
  mrr_leakage_pct: number;
  class: string;
  leakage_range: string;
}

export const archetypes: Archetype[] = [
  { code:"LLL", name:"Improvisers", description:"Pricing is reactive, deal-driven, and inconsistent.", mrr_leakage_pct:25, class:"Class 1", leakage_range:"17–25% revenue leakage" },
  { code:"LLM", name:"Discount Survivors", description:"Sales discipline exists, but pricing logic and infrastructure are weak.", mrr_leakage_pct:20, class:"Class 1", leakage_range:"17–25% revenue leakage" },
  { code:"LML", name:"Spreadsheet Strategists", description:"Attempt structured pricing without systems or governance.", mrr_leakage_pct:18, class:"Class 1", leakage_range:"17–25% revenue leakage" },
  { code:"MLL", name:"Tool Collectors", description:"Have pricing tools/processes but still rely on gut pricing.", mrr_leakage_pct:17, class:"Class 1", leakage_range:"17–25% revenue leakage" },
  { code:"LLH", name:"Margin Guards", description:"Strong enforcement protects price, despite primitive pricing strategy.", mrr_leakage_pct:18, class:"Class 2", leakage_range:"10–18% revenue leakage" },
  { code:"LMM", name:"Process Followers", description:"Some structure exists, but pricing lacks insight and optimisation.", mrr_leakage_pct:12, class:"Class 2", leakage_range:"10–18% revenue leakage" },
  { code:"LMH", name:"Policy Enforcers", description:"Pricing rules are enforced well, even if strategy is basic.", mrr_leakage_pct:10, class:"Class 2", leakage_range:"10–18% revenue leakage" },
  { code:"LHL", name:"Value Guessers", description:"Ambitious value-based pricing without organisational support.", mrr_leakage_pct:15, class:"Class 2", leakage_range:"10–18% revenue leakage" },
  { code:"LHM", name:"Insight Translators", description:"Good pricing logic, but internal capability gaps limit impact.", mrr_leakage_pct:13, class:"Class 2", leakage_range:"10–18% revenue leakage" },
  { code:"MLM", name:"Negotiated Operators", description:"Pricing still deal-driven; some process and governance.", mrr_leakage_pct:15, class:"Class 2", leakage_range:"10–18% revenue leakage" },
  { code:"MLH", name:"Revenue Protectors", description:"Sales discipline exists, but pricing remains reactive.", mrr_leakage_pct:12, class:"Class 2", leakage_range:"10–18% revenue leakage" },
  { code:"MMM", name:"Competent Operators", description:"Balanced and functional pricing; typical mid-market maturity.", mrr_leakage_pct:18, class:"Class 2", leakage_range:"10–18% revenue leakage" },
  { code:"HLL", name:"Underleveraged Engines", description:"Strong pricing infrastructure but weak strategy and execution.", mrr_leakage_pct:16, class:"Class 2", leakage_range:"10–18% revenue leakage" },
  { code:"HLM", name:"Analytics Without Impact", description:"Good data and tools, but poor pricing decisions.", mrr_leakage_pct:18, class:"Class 2", leakage_range:"10–18% revenue leakage" },
  { code:"HML", name:"Operational Pricers", description:"Capabilities strong, but pricing strategy underdeveloped.", mrr_leakage_pct:11, class:"Class 2", leakage_range:"10–18% revenue leakage" },
  { code:"LHH", name:"Overachieving Enforcers", description:"Strong pricing logic and discipline, but fragile infrastructure.", mrr_leakage_pct:10, class:"Class 3", leakage_range:"8–14% revenue leakage" },
  { code:"MML", name:"Emerging Managers", description:"Pricing becoming structured, but inconsistently applied.", mrr_leakage_pct:8, class:"Class 3", leakage_range:"8–14% revenue leakage" },
  { code:"MMH", name:"Deal Enforcers", description:"Strong execution ensures price realisation.", mrr_leakage_pct:14, class:"Class 3", leakage_range:"8–14% revenue leakage" },
  { code:"MHL", name:"Aspiring Value Pricers", description:"Strong strategy ambition, execution lagging.", mrr_leakage_pct:8, class:"Class 3", leakage_range:"8–14% revenue leakage" },
  { code:"MHM", name:"Structured Monetisers", description:"Solid pricing logic supported by workable execution.", mrr_leakage_pct:8, class:"Class 3", leakage_range:"8–14% revenue leakage" },
  { code:"HLH", name:"Disciplined Executors", description:"Strong enforcement supported by advanced infrastructure.", mrr_leakage_pct:14, class:"Class 3", leakage_range:"8–14% revenue leakage" },
  { code:"HMM", name:"Pricing Builders", description:"Strong foundation; pricing approach becoming sophisticated.", mrr_leakage_pct:8, class:"Class 3", leakage_range:"8–14% revenue leakage" },
  { code:"HHL", name:"Strategy Leaders", description:"Advanced pricing design not yet fully enforced.", mrr_leakage_pct:8, class:"Class 3", leakage_range:"8–14% revenue leakage" },
  { code:"MHH", name:"Revenue Optimisers", description:"Strong pricing strategy and enforcement supported by structure.", mrr_leakage_pct:12, class:"Class 4", leakage_range:"6–12% revenue leakage" },
  { code:"HMH", name:"Revenue Engineers", description:"Excellent execution powered by strong pricing capabilities.", mrr_leakage_pct:10, class:"Class 4", leakage_range:"6–12% revenue leakage" },
  { code:"HHM", name:"Value Architects", description:"Sophisticated pricing strategy with solid rollout.", mrr_leakage_pct:6, class:"Class 4", leakage_range:"6–12% revenue leakage" },
  { code:"HHH", name:"Pricing Masters", description:"Best-in-class pricing: value-based, disciplined, and optimised.", mrr_leakage_pct:3, class:"Class 5", leakage_range:"3–8% revenue leakage" },
];

export function getArchetype(code: string): Archetype | undefined {
  return archetypes.find(a => a.code === code.toUpperCase());
}

export const dimensionLabels = {
  capabilities: 'Capabilities',
  setting: 'Price Setting',
  execution: 'Commercial Execution',
};

export const dimensionDescriptions = {
  capabilities: 'How well your firm manages pricing as a function — ownership, governance, recurring reviews, training, and the commercial infrastructure behind every deal.',
  setting: 'How intelligently you set prices — whether they reflect client value, delivery economics, AI impact, competitive positioning, and willingness to pay rather than just cost and gut feel.',
  execution: 'How consistently your commercial process protects margin — how you handle discounts, scope changes, renewals, and the assets and training your sales team uses to defend your rates.',
};

export const levelDescriptions: Record<string, Record<string, string>> = {
  capabilities: {
    L: "You don't have a dedicated pricing function or clear ownership. Pricing decisions happen in proposals and calls without a process behind them. No one tracks what you charged last quarter, let alone why. You're reactive by default.",
    M: "You've started to structure how pricing works internally, but it's still evolving. Someone owns it partially, there's some tracking in place, and there's a rough process for reviews — but it depends too much on who's in the room.",
    H: "Pricing is a managed function. There's clear ownership, recurring governance, a training culture around commercial negotiations, and visibility into expansion revenue. Price decisions are intentional, not improvised.",
  },
  setting: {
    L: "Your rates are based on costs and gut feel, or you match what competitors charge. You rarely differentiate by client context or the value you deliver. Scope changes, AI productivity gains, and outcome data play no role in how you price.",
    M: "You have some structure — a rate card, seniority-based tiers, maybe a defined scope change process. But your pricing still isn't connected to the value you generate for clients. You know you should be doing more; you haven't built the process yet.",
    H: "Your pricing reflects the value you deliver, not just the hours you bill. You have a structured rate card, you measure client outcomes, you assess willingness to pay, and you adapt pricing as AI changes your delivery economics. Price increases are planned and value-based.",
  },
  execution: {
    L: "Deals close at whatever price the client pushes back to. Discounts happen without tracking, scope creep gets absorbed quietly, and renewals rarely recover lost margin. You don't know how much you're losing — but it's significant.",
    M: "You have some discipline in how deals close. Discounts need a reason, scope changes get flagged sometimes, and you track a few numbers. But it's inconsistent across the team and deals still leak more than they should.",
    H: "Your commercial process protects margin. Discounts are strategic and tracked, scope changes trigger a pricing conversation automatically, sales assets back up your rates, and contracts give you room to grow prices over time.",
  },
};

// PS / Software Development improvements (tailored for services firms)
export const improvementsPS: Record<string, Record<string, string[]>> = {
  capabilities: {
    L: [
      "Assign one person — even part-time — to own pricing decisions and outcomes. Without ownership, nothing else sticks.",
      "Audit the last 10 proposals: what did you quote, what did you close at, and why was there a gap? That audit alone will surface your biggest leak.",
      "Pick three numbers to track: average realised rate per seniority level, average discount given, and revenue from existing clients.",
    ],
    M: [
      "Run a monthly pricing review using actual closed deal data — not targets, not estimates. Look at rate variance by client and by salesperson.",
      "Formalise your discount approval process. Define the threshold above which a price reduction needs a second signature.",
      "Build a pricing calendar: annual rate card review, quarterly discount audit, and a recurring Pricing Committee meeting — even if it's 30 minutes monthly.",
    ],
    H: [
      "Create a quarterly pricing experimentation cycle: one test per quarter on rate structure, packaging, or success fee logic. Document results and feed them back into strategy.",
      "Integrate pricing data into your QBRs and board reporting so leadership sees price realisation alongside revenue and margin.",
      "Build a cross-functional pricing council that includes delivery leads, finance, and sales. Your delivery team knows where value is being created or destroyed.",
    ],
  },
  setting: {
    L: [
      "Stop anchoring your price to hours. Start a list of the outcomes clients get from your work — time saved, revenue generated, risk avoided. That list is your pricing foundation.",
      "Define your rate card by seniority and specialisation, not just by role. A senior AI engineer and a junior generalist are not at the same price point.",
      "Look at your last three proposals: were they framed in effort and deliverables, or in what the client gains? Rewrite one and see how the client responds.",
    ],
    M: [
      "Run five client interviews asking what they'd pay for the outcome you deliver — not the service you provide. You'll likely find your current rates sit 20–40% below what the market accepts.",
      "Build a formal change order process. Any scope change — any — triggers a separate pricing conversation. Document it in your engagement letter.",
      "Decide how AI-driven productivity changes your model. If you're delivering in half the time, are you capturing that as margin or passing it to the client as lower fees?",
    ],
    H: [
      "Implement a willingness-to-pay assessment before major proposals — Van Westendorp or a simpler price sensitivity interview. Make it part of your discovery process.",
      "Build success fee structures into at least 20% of your engagements per year. Start with clients where outcomes are clearly measurable.",
      "Create a competitive intelligence loop: track competitor rate cards, monitor their pitches, and feed that into your annual pricing review.",
    ],
  },
  execution: {
    L: [
      "Set a maximum discount threshold any salesperson can offer without escalation. Write it down, share it with the team, and enforce it on the next deal.",
      "For every discounted deal, log: who asked, why, how much, and what you got in return. The act of logging changes behaviour immediately.",
      "Give your salespeople two things to use instead of cutting price: a case study that quantifies results, and a scope reduction option so price cuts require something back.",
    ],
    M: [
      "Build a scope change policy and put it in every engagement letter. Any change to agreed scope triggers a change order within five business days. Stop absorbing silently.",
      "Track revenue from existing clients separately — upsell, cross-sell, rate increases. If you can't see it, you can't grow it.",
      "Start running annual rate increase conversations with discounted clients. Even a partial recovery compounds over three years.",
    ],
    H: [
      "Make contract renewal the trigger for a rate review — every renewal, every time. Build in a cost-of-living clause and an option to reprice based on scope expansion.",
      "Build a negotiation playbook your whole team uses. Document the moves: when to offer reduced scope vs. payment terms vs. a success fee component. Consistency reduces leakage.",
      "Measure win rate by price point and by salesperson. The pattern will tell you where pricing discipline is breaking down and who needs coaching.",
    ],
  },
}

// SaaS / Product improvements (tailored for software product companies)
export const improvementsSaaS: Record<string, Record<string, string[]>> = {
  capabilities: {
    L: [
      "Assign one person — even part-time — to own pricing decisions. Without ownership, pricing stays reactive and scattered across Product, Sales, and Finance.",
      "Audit your last 20 closed deals: what was listed, what was contracted, and where you discounted. The audit alone will surface your biggest revenue leak.",
      "Pick three numbers to track monthly: average discount rate, net revenue retention (NRR), and expansion revenue as a percentage of total ARR.",
    ],
    M: [
      "Run a monthly pricing review using actual deal data — not targets. Look at discount variance by segment (SMB / Mid / Enterprise) and by sales rep.",
      "Formalise your discount approval process. Define the threshold above which a discount needs VP or CRO sign-off. Make it visible in your CRM.",
      "Schedule a recurring Pricing Committee meeting — even 30 minutes monthly — with Product, Finance, and Sales at the table.",
    ],
    H: [
      "Build a pricing experimentation roadmap: one controlled test per quarter on packaging, price points, or discount policy. Measure impact on win rate and ACV.",
      "Integrate pricing metrics into board reporting. Leadership should see price realisation and NRR alongside revenue and logo growth.",
      "Establish a cross-functional pricing council (Product, Finance, Sales, Customer Success) that meets quarterly and owns pricing decisions collectively.",
    ],
  },
  setting: {
    L: [
      "Stop pricing from costs or competitor benchmarks alone. List the outcomes your product creates — time saved, risk reduced, revenue generated — and anchor your price to those.",
      "Redesign your pricing metric around the unit of value customers actually care about (usage, outcomes, records processed) — not just seats by default.",
      "Build a transparent pricing page on your website that shows tiers clearly. Hiding prices filters serious buyers and signals you don't know your own value.",
    ],
    M: [
      "Run five buyer interviews asking what they'd pay for the outcome your product delivers. You'll likely find your price sits 20–40% below market tolerance.",
      "Introduce value-based packaging: tier your product around outcomes and usage depth, not feature checklists. Good / Better / Best with clear anchors.",
      "Build a systematic competitor pricing monitor — track changes in their pricing pages and packaging at least quarterly. Document the positioning.",
    ],
    H: [
      "Run a formal willingness-to-pay study (Van Westendorp or conjoint) before your next major pricing change. Let data, not gut, drive the decision.",
      "Introduce usage-based or hybrid pricing elements to capture more value from power users without raising the entry price for new customers.",
      "Formalise a pricing change management process: impact modelling, rollout sequencing, grandfathering rules, and customer communication playbooks for every price move.",
    ],
  },
  execution: {
    L: [
      "Set a maximum discount threshold any rep can offer without escalation. Write it down, share it with the team, and enforce it on the next deal.",
      "For every discounted deal, log: who asked, why, how much, and what you got in return. The act of logging alone changes sales behaviour.",
      "Equip sales with ROI calculators and quantified customer case studies so they can defend value instead of defaulting to price cuts.",
    ],
    M: [
      "Build a discount recovery process: identify all customers on legacy discounted rates and run structured price-increase conversations at renewal.",
      "Track expansion revenue (upsell, cross-sell, upgrades) as a separate KPI. If you can't see it in a dashboard, you can't grow it.",
      "Create a negotiation playbook with clear moves: shorter contract term, phased rollout, added services — so reps have levers other than lower price.",
    ],
    H: [
      "Automate discount guardrails in your CRM or CPQ so out-of-policy deals are flagged before they reach the customer.",
      "Make contract renewal the trigger for a price review. Build in CPI adjustments and usage-based escalators from day one of every contract.",
      "Benchmark price realisation by rep, segment, and deal size. The patterns tell you exactly where discipline is breaking down and who needs coaching.",
    ],
  },
}

// Helper: returns the right improvements set based on company type
export function getImprovements(companyType?: string | null): Record<string, Record<string, string[]>> {
  if (companyType === 'SoftwareDevelopment') return improvementsPS
  return improvementsSaaS // SaaS and Other default to SaaS set
}

// Backwards compatibility — default export points to SaaS set
export const improvements = improvementsSaaS

const SECTION_MAP: Record<string, 'capabilities' | 'setting' | 'execution'> = {
  // Software Development set
  Q2:  'setting',
  Q3:  'setting',
  Q8:  'setting',
  Q12: 'execution',
  // SaaS set
  Q4:  'setting',
  Q11: 'setting',
  Q17: 'execution',
  // Shared
  Q15: 'execution',
  Q23: 'execution',
  Q27: 'capabilities',
  Q28: 'capabilities',
  Q29: 'capabilities',
}

const MAX_SCORES = { capabilities: 15, setting: 15, execution: 15 }

export function calculateScores(answers: Record<string, number>) {
  let capRaw = 0, setRaw = 0, exeRaw = 0
  for (const [q, score] of Object.entries(answers)) {
    const s = SECTION_MAP[q]
    if (s === 'capabilities') capRaw += score
    else if (s === 'setting') setRaw += score
    else if (s === 'execution') exeRaw += score
  }
  const capNorm = Math.round((capRaw / MAX_SCORES.capabilities) * 100)
  const setNorm  = Math.round((setRaw  / MAX_SCORES.setting)      * 100)
  const exeNorm  = Math.round((exeRaw  / MAX_SCORES.execution)    * 100)
  const toLetter = (n: number) => n <= 40 ? 'L' : n <= 70 ? 'M' : 'H'
  const capLetter = toLetter(capNorm)
  const setLetter  = toLetter(setNorm)
  const exeLetter  = toLetter(exeNorm)
  return {
    capRaw, setRaw, exeRaw,
    capNorm, setNorm, exeNorm,
    capLetter, setLetter, exeLetter,
    code: `${capLetter}${setLetter}${exeLetter}`,
  }
}
