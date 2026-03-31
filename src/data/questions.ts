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
    title: "Pricing strategy",
    subtitle: "Questions 1–3 of 9",
    questions: [
      {
        id: "Q2",
        text: "How do you set your prices?",
        anchor1: "Based on gut-feel or costs only.",
        anchor3: "Based on costs and competitors.",
        anchor5: "Based on cost, competition, and client value.",
      },
      {
        id: "Q3",
        text: "How differentiated is your rate card?",
        anchor1: "Flat rate — same regardless of seniority or specialisation.",
        anchor3: "Differentiated by seniority, not by specialisation.",
        anchor5: "Fully structured by seniority, specialisation, and strategic value.",
      },
      {
        id: "Q8",
        text: "How do you frame your price to clients?",
        anchor1: "In time units — days, hours, T&M.",
        anchor3: "Fixed price for defined scope, but effort-framed.",
        anchor5: "In terms of client outcomes and value delivered.",
      },
    ],
  },
  {
    title: "Commercial execution",
    subtitle: "Questions 4–6 of 9",
    questions: [
      {
        id: "Q15",
        text: "How do you handle discount requests?",
        anchor1: "We discount around half of clients who ask.",
        anchor3: "Rarely — only for strategic clients with clear upside.",
        anchor5: "Discounting is a deliberate tool, not a default response.",
      },
      {
        id: "Q12",
        text: "How do you handle scope changes mid-project?",
        anchor1: "We absorb them without adjusting price.",
        anchor3: "We charge sometimes, but it's ad-hoc.",
        anchor5: "Every scope change triggers a formal change order.",
      },
      {
        id: "Q23",
        text: "What do your salespeople negotiate with?",
        anchor1: "Price only.",
        anchor3: "Price and value — but we usually end up cutting price.",
        anchor5: "Value first. Any price cut requires a scope reduction.",
      },
    ],
  },
  {
    title: "Internal capabilities",
    subtitle: "Questions 7–9 of 9",
    questions: [
      {
        id: "Q29",
        text: "Who owns pricing in your company?",
        anchor1: "No one specific — it's scattered.",
        anchor3: "Someone partially, alongside other responsibilities.",
        anchor5: "A dedicated person with pricing KPIs.",
      },
      {
        id: "Q28",
        text: "How often is pricing discussed formally?",
        anchor1: "Never — no dedicated pricing calls.",
        anchor3: "When we feel the need.",
        anchor5: "Recurring Pricing Committee meeting.",
      },
      {
        id: "Q27",
        text: "Do you run sales training?",
        anchor1: "No training.",
        anchor3: "Internal training only.",
        anchor5: "Internal and external training.",
      },
    ],
  },
]

export const totalQuestions = surveySteps.reduce((sum, s) => sum + s.questions.length, 0)
