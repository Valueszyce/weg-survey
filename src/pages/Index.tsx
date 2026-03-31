import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ClipboardList } from 'lucide-react'
import logo from '@/assets/valueships-logo.png'
import Survey from '@/components/Survey'
import EmailGate from '@/components/EmailGate'
import { calculateScores } from '@/data/archetypes'

type Stage = 'survey' | 'gate' | 'done'

export default function Index() {
  const navigate = useNavigate()
  const [stage, setStage] = useState<Stage>('survey')
  const [scores, setScores] = useState<ReturnType<typeof calculateScores> | null>(null)
  const [rawScores, setRawScores] = useState<Record<string, number>>({})

  function handleSurveyComplete(answers: Record<string, number>) {
    const result = calculateScores(answers)
    setScores(result)
    setRawScores(answers)
    setStage('gate')
  }

  function handleEmailSuccess() {
    if (!scores) return
    navigate(`/result/${scores.code}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-t-4 border-primary">
        <div className="container max-w-3xl py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <img src={logo} alt="Valueships" className="h-16 md:h-20 mb-6" />
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-bold mb-4">
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Pricing Diagnostic</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
              Discover your pricing archetype
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl">
              9 questions. 5 minutes. A clear picture of where your professional services firm
              is losing margin — and what to fix first.
            </p>
          </motion.div>
          <div className="flex flex-wrap gap-2 mt-6">
            {['9 questions', '~5 minutes', 'Instant results', 'Free'].map(tag => (
              <span key={tag} className="bg-secondary text-foreground rounded-full px-3 py-1 text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-muted-foreground text-sm leading-relaxed">
              <span className="font-semibold">Here's how it works:</span> for each question, select a 1–5 rating that best matches your current situation (1 = basic, 5 = highly advanced). If you're between two answers, pick the middle number. There are no right answers — the goal is an honest picture of where you are today.
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-3xl py-8">
        <div>
          {stage === 'survey' && <Survey onComplete={handleSurveyComplete} />}
          {stage === 'done' && (
            <p className="text-center text-muted-foreground">Redirecting…</p>
          )}
        </div>
      </div>

      {stage === 'gate' && scores && (
        <EmailGate
          archetypeCode={scores.code}
          capScore={scores.capNorm}
          setScore={scores.setNorm}
          exeScore={scores.exeNorm}
          capLetter={scores.capLetter}
          setLetter={scores.setLetter}
          exeLetter={scores.exeLetter}
          rawScores={rawScores}
          onSuccess={handleEmailSuccess}
        />
      )}
    </div>
  )
}
