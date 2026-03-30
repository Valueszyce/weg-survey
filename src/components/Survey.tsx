import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { surveySteps, totalQuestions, type Question } from '@/data/questions'

interface SurveyProps {
  onComplete: (answers: Record<string, number>) => void
}

const ANCHORS: Record<number, keyof Question | null> = {
  1: 'anchor1',
  3: 'anchor3',
  5: 'anchor5',
}

function LikertQuestion({
  question,
  value,
  note,
  onChange,
  onNote,
  index,
}: {
  question: Question
  value: number | undefined
  note: string
  onChange: (v: number) => void
  onNote: (n: string) => void
  index: number
}) {
  return (
    <div className="bg-card rounded-lg border p-5 space-y-3">
      <p className="text-sm font-semibold text-foreground leading-snug">
        <span className="text-muted-foreground mr-1">{index + 1}.</span>
        {question.text}
      </p>

      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map(n => {
          const anchorKey = ANCHORS[n]
          const anchorText = anchorKey ? question[anchorKey] : null
          const isSelected = value === n

          return (
            <div key={n} className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={() => onChange(n)}
                className={`w-full h-14 rounded-xl border-2 font-extrabold text-lg transition-all ${
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground shadow-md scale-105'
                    : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                {n}
              </button>
              <p className="text-[10px] text-muted-foreground leading-tight text-center min-h-[2.5rem]">
                {anchorText ?? 'between'}
              </p>
            </div>
          )
        })}
      </div>

      {(value === 2 || value === 4) && (
        <div className="pt-1 space-y-1">
          <label className="text-xs text-muted-foreground font-medium">
            Optional: describe your situation
          </label>
          <textarea
            value={note}
            onChange={e => onNote(e.target.value)}
            placeholder="What best describes where you are between these two options?"
            rows={2}
            className="w-full text-sm rounded-lg border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>
      )}
    </div>
  )
}

export default function Survey({ onComplete }: SurveyProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})

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

      {/* Progress block */}
      <div className="bg-card rounded-lg border p-4 space-y-3">
        <div className="flex justify-between text-sm font-medium text-foreground">
          <span>{totalAnswered} of {totalQuestions} answered</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Step indicators — horizontal scroll on mobile to prevent overflow */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {surveySteps.map((s, i) => (
            <div key={i} className="flex-shrink-0" style={{ width: `${100 / surveySteps.length}%`, minWidth: '60px' }}>
              <div className={`h-1 rounded-full transition-colors ${
                i < step ? 'bg-primary' : i === step ? 'bg-primary/50' : 'bg-border'
              }`} />
              <p className="text-[9px] text-muted-foreground truncate mt-1 hidden sm:block">{s.title}</p>
              <p className="text-[9px] text-muted-foreground mt-1 sm:hidden">{i + 1}/{surveySteps.length}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Questions */}
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
            <h2 className="text-xl font-bold text-foreground">{currentStep.title}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{currentStep.subtitle}</p>
          </div>

          {currentStep.questions.map((q, i) => (
            <LikertQuestion
              key={q.id}
              question={q}
              value={answers[q.id]}
              note={notes[q.id] ?? ''}
              onChange={v => setAnswers(prev => ({ ...prev, [q.id]: v }))}
              onNote={n => setNotes(prev => ({ ...prev, [q.id]: n }))}
              index={questionOffset + i}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        {step > 0 ? (
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-3">
          {stepComplete ? (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-green-600">
              <CheckCircle2 className="w-3.5 h-3.5" /> All answered
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">
              {currentStep.questions.length - answeredInStep} remaining
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
