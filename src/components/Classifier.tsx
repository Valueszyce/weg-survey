import { motion } from 'framer-motion'
import { Building2, Code2, Package, HelpCircle } from 'lucide-react'
import type { CompanyType } from '@/data/questions'

interface ClassifierProps {
  onComplete: (companyType: CompanyType) => void
}

const OPTIONS: { value: CompanyType; label: string; desc: string; Icon: typeof Package }[] = [
  {
    value: 'SaaS',
    label: 'SaaS / Product company',
    desc: 'You sell software as a product — subscription, usage-based, or licence-based.',
    Icon: Package,
  },
  {
    value: 'SoftwareDevelopment',
    label: 'Software Development / Services',
    desc: 'You sell software development, consulting, or professional services.',
    Icon: Code2,
  },
  {
    value: 'Other',
    label: 'Other',
    desc: 'Something else — we\'ll use the product-focused question set.',
    Icon: HelpCircle,
  },
]

export default function Classifier({ onComplete }: ClassifierProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border p-8 space-y-6"
    >
      <div className="flex items-center gap-2">
        <Building2 className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Before we start
        </span>
      </div>

      <h2 className="text-2xl font-extrabold text-foreground">
        What type of company do you run?
      </h2>

      <p className="text-sm text-muted-foreground">
        This helps us tailor the questions and benchmark your results against the right peer set.
      </p>

      <div className="grid grid-cols-1 gap-3 pt-2">
        {OPTIONS.map(({ value, label, desc, Icon }) => (
          <button
            key={value}
            onClick={() => onComplete(value)}
            className="w-full text-left border-2 border-border rounded-xl p-5 hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground mt-1">{desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
