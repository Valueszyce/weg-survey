import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { surveySteps, totalQuestions, type Question } from '@/data/questions'

interface SurveyProps {
  onComplete: (answers: Record<string, number>) => void
}

function LikertQuestion({
  question, value, onChange, index,
}: {
  question: Question; value: number | undefined
  onChange: (v: number) => void; index: number
}) {
  return (
    <div className="bg-card rounded-lg border p-5 space-y-3">
      <p className="text-sm font-semibold text-foreground leading-snug">
        <span className="text-muted-foreground mr-1">{index + 1}.</span>
        {question.text}
      </p>

      <div className="flex gap-2">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex-1 h-11 rounded-lg border-2 font-bold text-sm transition-all ${
              value === n
                ? 'border-primary bg-primary text-primary-foreground shadow-md scale-105'
                : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex justify-between text-[11px] text-muted-foreground leading-tight">
        <span className="max-w-[35%]">{question.anchor1}</span>
        <span className="max-w-[25%] text-center">{question.anchor3}</span>
        <span className="max-w-[35%] text-right">{question.anchor5}</span>
      </div>
    </div>
  )
}

export default function Survey({ onComplete }: SurveyProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const currentStep = surveySteps[step]
  const answeredInStep = currentStep.questions.filter(q => answers[q.id] !== undefined).length
  const stepComplete = answeredInStep === currentStep.questions.length
  const isLastStep = step === surveySteps.length - 1
  const totalAnswered = Object.keys(answers).length
  const progress = Math.round((totalAnswered / totalQuestions) * 100)
  const questionOffset = surveySteps.slice(0, step).reduce((s, st) => s + st.questions.length, 0)

  function handleNext() {
    if (!stepComplete) return
    if (isLastStep) { onComplete(answers) }
    else { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }

  function handleBack() {
    if (step > 0) { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border p-5 space-y-3">
        <div className="flex justify-between text-xs text-muted-foreground font-medium">
          <span>{totalAnswered} of {totalQuestions} answered</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex gap-2">
          {surveySteps.map((s, i) => (
            <div key={i} className="flex-1 space-y-1">
              <div className={`h-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-border'}`} />
              <p className="text-[10px] text-muted-foreground truncate">{s.title}</p>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div className="mb-2">
            <h2 className="text-lg font-bold text-foreground">{currentStep.title}</h2>
            <p className="text-sm text-muted-foreground">{currentStep.subtitle}</p>
          </div>
          {currentStep.questions.map((q, i) => (
            <LikertQuestion
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={v => setAnswers(prev => ({ ...prev, [q.id]: v }))}
              index={questionOffset + i}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-3">
          {!stepComplete && (
            <span className="text-xs text-muted-foreground">
              {currentStep.questions.length - answeredInStep} remaining
            </span>
          )}
          {stepComplete && (
            <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> All answered
            </span>
          )}
          <button
            onClick={handleNext}
            disabled={!stepComplete}
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-bold disabled:opacity-40 hover:opacity-90 transition-all"
          >
            {isLastStep ? 'See my results' : 'Next section'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
