import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { type SurveyStep, type Question, getTotalQuestions } from '@/data/questions'

interface SurveyProps {
  steps: SurveyStep[]
  onComplete: (answers: Record<string, number>) => void
}

function LikertQuestion({
  question, value, onChange, index,
}: {
  question: Question
  value: number | undefined
  onChange: (v: number) => void
  index: number
}) {
  const anchors: Record<number, string | undefined> = {
    1: question.anchor1,
    3: question.anchor3,
    5: question.anchor5,
  }

  return (
    <div className="bg-card rounded-xl border p-6 space-y-5">
      <p className="text-base font-semibold text-foreground leading-snug">
        <span className="text-primary font-bold mr-2">{index + 1}.</span>
        {question.text}
      </p>

      {/* Desktop-first Likert — all 5 columns visible with comfortable spacing */}
      <div className="grid grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map(n => {
          const isSelected = value === n
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`h-16 rounded-xl border-2 font-extrabold text-xl transition-all ${
                isSelected
                  ? 'border-primary bg-primary text-primary-foreground shadow-md scale-105'
                  : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              {n}
            </button>
          )
        })}
      </div>

      {/* Anchor labels — 3 anchors under columns 1, 3, 5 */}
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-1">
          <p className="text-xs text-muted-foreground leading-snug text-left">{anchors[1]}</p>
        </div>
        <div className="col-span-1" />
        <div className="col-span-1">
          <p className="text-xs text-muted-foreground leading-snug text-center">{anchors[3]}</p>
        </div>
        <div className="col-span-1" />
        <div className="col-span-1">
          <p className="text-xs text-muted-foreground leading-snug text-right">{anchors[5]}</p>
        </div>
      </div>
    </div>
  )
}

export default function Survey({ steps, onComplete }: SurveyProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const totalQuestions = getTotalQuestions(steps)
  const currentStep = steps[step]
  const allAnsweredInStep = currentStep.questions.every(q => answers[q.id] !== undefined)
  const answeredCount = Object.keys(answers).length
  const progress = Math.round((answeredCount / totalQuestions) * 100)

  function setAnswer(id: string, value: number) {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }

  function next() {
    if (!allAnsweredInStep) return
    if (step < steps.length - 1) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      onComplete(answers)
    }
  }

  function back() {
    if (step > 0) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const remainingInStep = currentStep.questions.filter(q => answers[q.id] === undefined).length

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="bg-card rounded-lg border p-4 space-y-3">
        <div className="flex justify-between text-sm font-medium text-foreground">
          <span>{answeredCount} of {totalQuestions} answered</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex-1">
              <div className={`h-1 rounded-full transition-colors ${
                i < step ? 'bg-primary' : i === step ? 'bg-primary/50' : 'bg-border'
              }`} />
              <p className={`text-[10px] mt-1 truncate ${
                i === step ? 'text-foreground font-semibold' : 'text-muted-foreground'
              }`}>{s.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step header */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div>
            <p className="text-sm text-muted-foreground">{currentStep.subtitle}</p>
            <h2 className="text-xl font-bold text-foreground mt-0.5">{currentStep.title}</h2>
          </div>

          {currentStep.questions.map((q, idx) => {
            const globalIdx = steps.slice(0, step).reduce((sum, s) => sum + s.questions.length, 0) + idx
            return (
              <LikertQuestion
                key={q.id}
                question={q}
                value={answers[q.id]}
                onChange={v => setAnswer(q.id, v)}
                index={globalIdx}
              />
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        {step > 0 ? (
          <button
            onClick={back}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <div />}

        <div className="flex items-center gap-3">
          {remainingInStep > 0 ? (
            <span className="text-xs text-muted-foreground">{remainingInStep} remaining</span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
              <CheckCircle2 className="w-3.5 h-3.5" /> All answered
            </span>
          )}
          <button
            onClick={next}
            disabled={!allAnsweredInStep}
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-bold disabled:opacity-40 hover:opacity-90 transition-all"
          >
            {step === steps.length - 1 ? 'See my results' : 'Next section'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
