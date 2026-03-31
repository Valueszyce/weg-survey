import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Lock, Loader2, User } from 'lucide-react'
import { saveResponse } from '@/lib/supabase'

interface EmailGateProps {
  archetypeCode: string
  archetypeName: string
  archetypeDescription: string
  capScore: number; setScore: number; exeScore: number
  capLetter: string; setLetter: string; exeLetter: string
  rawScores: Record<string, number>
  onSuccess: () => void
}

export default function EmailGate({
  archetypeCode, capScore, setScore, exeScore,
  capLetter, setLetter, exeLetter, rawScores, onSuccess,
}: EmailGateProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && firstName.trim().length > 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || loading) return
    setLoading(true); setError('')
    try {
      await saveResponse({
        email, first_name: firstName.trim(),
        archetype_code: archetypeCode,
        cap_score: capScore, set_score: setScore, exe_score: exeScore,
        cap_letter: capLetter, set_letter: setLetter, exe_letter: exeLetter,
        raw_scores: rawScores,
      })
      onSuccess()
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
      >
        <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
          <Lock className="w-7 h-7 text-primary" />
        </div>

        <h2 className="text-xl font-extrabold text-foreground mb-2">Your results are ready</h2>

        <p className="text-sm text-muted-foreground mb-6">
          Enter your details to unlock your pricing archetype, maturity scores, and a tailored improvement plan.
        </p>

        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-1">Your archetype code</p>
          <p className="font-mono text-3xl font-extrabold tracking-widest text-foreground">
            {archetypeCode}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-sm disabled:opacity-40 hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
          >
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Unlocking...</>
              : <>See my full results <ArrowRight className="w-4 h-4" /></>
            }
          </button>
        </form>
        <p className="text-[11px] text-muted-foreground mt-4">
          No spam. We use this to send you relevant pricing insights.
        </p>
      </motion.div>
    </div>
  )
}
