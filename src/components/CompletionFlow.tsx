import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'
import { saveResponse } from '@/lib/supabase'
import type { CompanyType } from '@/data/questions'

interface CompletionFlowProps {
  archetypeCode: string
  capScore: number
  setScore: number
  exeScore: number
  capLetter: string
  setLetter: string
  exeLetter: string
  rawScores: Record<string, number>
  companyType: CompanyType
  onSuccess: () => void
}

type Step = 'ask' | 'details' | 'saving' | 'submitted' | 'thankyou'

export default function CompletionFlow({
  archetypeCode, capScore, setScore, exeScore,
  capLetter, setLetter, exeLetter, rawScores, companyType, onSuccess,
}: CompletionFlowProps) {
  const [step, setStep] = useState<Step>('ask')
  const [firstName, setFirstName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [noSaving, setNoSaving] = useState(false)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const detailsValid = firstName.trim().length > 0 && companyName.trim().length > 0 && emailValid

  async function handleSubmit() {
    if (!detailsValid || loading) return
    setLoading(true)
    setStep('saving')
    try {
      await saveResponse({
        email,
        first_name: firstName.trim(),
        company_name: companyName.trim(),
        company_type: companyType,
        archetype_code: archetypeCode,
        cap_score: capScore,
        set_score: setScore,
        exe_score: exeScore,
        cap_letter: capLetter,
        set_letter: setLetter,
        exe_letter: exeLetter,
        raw_scores: rawScores,
      })
    } catch (err) {
      console.error('Save failed, continuing anyway:', err)
    } finally {
      setLoading(false)
      setStep('submitted')
    }
  }

  return (
    <div className="bg-card rounded-xl border p-8">
      <AnimatePresence mode="wait">

        {/* STEP: ask */}
        {step === 'ask' && (
          <motion.div
            key="ask"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 text-center"
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-success" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-extrabold text-foreground">Survey complete</h2>
              <p className="text-sm text-muted-foreground">
                Thank you for taking part in the Pricing Strategy Self-Assessment.
              </p>
              <p className="text-sm text-foreground font-medium">
                Would you like to receive your personalised report and a practical set of next steps?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setStep('details')}
                className="flex-1 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-bold text-sm hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
              >
                Yes, send me the report <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={async () => {
                  setNoSaving(true)
                  try {
                    await saveResponse({
                      email: '',
                      first_name: '',
                      company_name: '',
                      company_type: companyType,
                      archetype_code: archetypeCode,
                      cap_score: capScore,
                      set_score: setScore,
                      exe_score: exeScore,
                      cap_letter: capLetter,
                      set_letter: setLetter,
                      exe_letter: exeLetter,
                      raw_scores: rawScores,
                    })
                  } catch (err) {
                    console.error('Save failed:', err)
                  } finally {
                    setNoSaving(false)
                    setStep('thankyou')
                  }
                }}
                disabled={noSaving}
                className="flex-1 border-2 border-border text-foreground py-3 px-6 rounded-lg font-semibold text-sm hover:border-primary/40 transition-all disabled:opacity-40"
              >
                {noSaving ? 'Saving...' : 'No, thanks'}
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP: details */}
        {step === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="space-y-2 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">Almost there</p>
              <h2 className="text-2xl font-extrabold text-foreground">Tell us a bit about yourself</h2>
              <p className="text-sm text-muted-foreground">
                We'll send your personalised Pricing Strategy report to your email within one business day.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">
                  What is your name? *
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">
                  What company do you currently work for? *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1.5">
                  Your email address *
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep('ask')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!detailsValid || loading}
                className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-bold disabled:opacity-40 hover:opacity-90 transition-all"
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  : <>Submit <ArrowRight className="w-4 h-4" /></>
                }
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP: saving */}
        {step === 'saving' && (
          <motion.div
            key="saving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 flex flex-col items-center gap-4"
          >
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Submitting your responses…</p>
          </motion.div>
        )}

        {/* STEP: submitted — Yes path */}
        {step === 'submitted' && (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-success" />
              </div>
              <h2 className="text-2xl font-extrabold text-foreground">Thank you</h2>
              <p className="text-base text-foreground font-medium">
                Thank you for completing the Pricing Strategy Self-Assessment!
              </p>
            </div>

            <p className="text-sm text-foreground leading-relaxed">
              Your responses have been successfully submitted. They will now be used to generate your personalised Pricing Strategy report, highlighting your current pricing maturity, key strengths, and the areas with the greatest opportunity for impact.
            </p>

            <div className="bg-accent/30 rounded-lg p-5 space-y-3">
              <p className="font-bold text-foreground text-sm">What happens next?</p>
              <p className="text-sm text-foreground leading-relaxed">
                You should receive an email within one business day from{' '}
                <a href="mailto:krzysztof_szyszkiewicz@valueships.com" className="text-primary underline hover:opacity-80">
                  krzysztof_szyszkiewicz@valueships.com
                </a>
                . The email will include:
              </p>
              <ul className="text-sm text-foreground space-y-1.5 pl-1">
                <li>• Your personalised Pricing Strategy report</li>
                <li>• A registration link to book an individual 30-minute consultation with a Valueships pricing expert</li>
              </ul>
              <p className="text-sm text-foreground leading-relaxed">
                If you haven't received the email within one business day, please don't hesitate to check in with us at:{' '}
                <a href="mailto:krzysztof_szyszkiewicz@valueships.com" className="text-primary underline hover:opacity-80">
                  krzysztof_szyszkiewicz@valueships.com
                </a>
                .
              </p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              This diagnostic is part of the CEE Growth Platform pricing enablement initiative, delivered in collaboration with{' '}
              <a href="https://www.valueships.com" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80">
                Valueships
              </a>.
            </p>

            <p className="text-sm text-foreground font-medium">
              Thank you for your time and insights — we look forward to continuing the pricing conversation with you.
            </p>

            <div className="pt-2">
              <button
                onClick={onSuccess}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-bold text-sm hover:opacity-90 transition-all"
              >
                See my full results <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP: thankyou — No path */}
        {step === 'thankyou' && (
          <motion.div
            key="thankyou"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-center"
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-success" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-extrabold text-foreground">Thank you</h2>
              <p className="text-base text-foreground font-medium">
                Thank you for completing the Pricing Strategy Self-Assessment!
              </p>
            </div>

            <p className="text-sm text-foreground leading-relaxed">
              Your responses have been successfully recorded. We appreciate your time and honest perspective.
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed">
              This diagnostic is part of the CEE Growth Platform pricing enablement initiative, delivered in collaboration with{' '}
              <a href="https://www.valueships.com" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80">
                Valueships
              </a>.
            </p>

            <p className="text-sm text-foreground font-medium">
              Thank you for your time and insights.
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
