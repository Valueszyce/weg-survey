import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import valueshipsLogo from '@/assets/valueships-logo.png'
import partnerLogo from '@/assets/partner-logo.png'
import Classifier from '@/components/Classifier'
import Survey from '@/components/Survey'
import CompletionFlow from '@/components/CompletionFlow'
import { calculateScores } from '@/data/archetypes'
import { getSurveySteps, type CompanyType } from '@/data/questions'

type Stage = 'classifier' | 'survey' | 'completion' | 'done'

export default function Index() {
  const navigate = useNavigate()
  const [stage, setStage] = useState<Stage>('classifier')
  const [companyType, setCompanyType] = useState<CompanyType | null>(null)
  const [scores, setScores] = useState<ReturnType<typeof calculateScores> | null>(null)
  const [rawScores, setRawScores] = useState<Record<string, number>>({})

  function handleClassifierComplete(type: CompanyType) {
    setCompanyType(type)
    setStage('survey')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSurveyComplete(answers: Record<string, number>) {
    const result = calculateScores(answers)
    setScores(result)
    setRawScores(answers)
    setStage('completion')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCompletionSuccess() {
    if (!scores || !companyType) return
    navigate(`/result/${scores.code}?type=${companyType}`)
  }

  const steps = companyType ? getSurveySteps(companyType) : []

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-t-4 border-primary">
        <div className="container max-w-3xl py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Two logos side by side with divider */}
            <div className="flex items-center gap-6 mb-8">
              <img src={valueshipsLogo} alt="Valueships" className="h-12 md:h-14" />
              <div className="h-10 w-px bg-border" />
              <img src={partnerLogo} alt="Warsaw Equity Group" className="h-12 md:h-14" />
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
              Pricing Strategy for Scaleups
            </h1>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Pressure-test your pricing as you scale from early traction to repeatable growth. Take the assessment to diagnose your pricing strengths and gaps, then get a practical set of next steps based on a proven pricing framework, brought for all CEE Growth Platform members.
            </p>

            <div className="bg-accent/30 rounded-lg p-5 mb-6">
              <p className="text-sm font-bold text-foreground mb-3">What to expect:</p>
              <ul className="text-sm text-foreground space-y-1.5">
                <li>• 9 questions, typically completed in 5 minutes</li>
                <li>• A simple 1–5 maturity scale for each topic (1 = basic / ad-hoc, 5 = highly advanced / systematic)</li>
                <li>• Tailored questions based on your company type</li>
                <li>• Instant results: your pricing archetype, maturity scores, and improvement recommendations</li>
              </ul>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Privacy notice: Your responses will be handled in accordance with{' '}
              <a href="https://www.valueships.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80">
                Valueships' Privacy Policy
              </a>
              . Personal data (such as your email address) will be used solely to deliver your pricing diagnostics and consultation information.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2 mt-6">
            {['9 questions', '~5 minutes', 'Instant results', 'Free'].map(tag => (
              <span key={tag} className="bg-secondary text-foreground rounded-full px-3 py-1 text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-3xl py-8">
        {stage === 'classifier' && <Classifier onComplete={handleClassifierComplete} />}
        {stage === 'survey' && companyType && (
          <Survey steps={steps} onComplete={handleSurveyComplete} />
        )}
        {stage === 'completion' && scores && companyType && (
          <CompletionFlow
            archetypeCode={scores.code}
            capScore={scores.capNorm}
            setScore={scores.setNorm}
            exeScore={scores.exeNorm}
            capLetter={scores.capLetter}
            setLetter={scores.setLetter}
            exeLetter={scores.exeLetter}
            rawScores={rawScores}
            companyType={companyType}
            onSuccess={handleCompletionSuccess}
          />
        )}
        {stage === 'done' && (
          <p className="text-center text-muted-foreground">Redirecting…</p>
        )}
      </div>
    </div>
  )
}
