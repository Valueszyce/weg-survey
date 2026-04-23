import { useParams, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, Target, Shield, ArrowLeft, ArrowRight } from "lucide-react";
import { getArchetype, dimensionLabels, dimensionDescriptions, levelDescriptions, getImprovements } from "@/data/archetypes";
import logo from "@/assets/valueships-logo.png";
import { useRef } from "react";

const dims = ["capabilities", "setting", "execution"] as const;
const dimIcons = { capabilities: TrendingUp, setting: Target, execution: Shield };

const letterColor = (l: string) =>
  l === "L" ? "text-maturity-l" : l === "M" ? "text-maturity-m" : "text-maturity-h";
const bgColor = (l: string) =>
  l === "L" ? "bg-maturity-l" : l === "M" ? "bg-maturity-m" : "bg-maturity-h";
const borderColor = (l: string) =>
  l === "L" ? "border-destructive" : l === "M" ? "border-warning" : "border-success";
const levelLabel = (l: string) => (l === "H" ? "High" : l === "M" ? "Medium" : "Low");
const barWidth = (l: string) => (l === "H" ? "w-full" : l === "M" ? "w-2/3" : "w-1/3");

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Result = () => {
  const { code } = useParams<{ code: string }>();
  const [searchParams] = useSearchParams();
  const companyType = searchParams.get("type");
  const archetype = getArchetype(code || "");
  const improvements = getImprovements(companyType);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!archetype) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-extrabold text-muted-foreground mb-4">?</p>
          <h1 className="text-xl font-bold text-foreground mb-2">Archetype not found</h1>
          <p className="text-muted-foreground mb-6">Code "{code}" is not a valid archetype.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to selector
          </Link>
        </div>
      </div>
    );
  }

  const letters = archetype.code.split("");

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="no-print bg-card border-b">
        <div className="container max-w-5xl py-4 flex items-center justify-between">
          <a
            href="https://www.valueships.com"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Valueships
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="no-print bg-card border-t-4 border-primary">
        <div className="container max-w-5xl py-10 md:py-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <img src={logo} alt="Valueships" className="h-16 md:h-20 mb-6" />
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/15 text-primary rounded-full px-3 py-1 text-xs font-bold">
                {archetype.class}
              </span>
              <span className="font-extrabold text-foreground">{archetype.leakage_range}</span>
            </div>
            <p className="font-mono text-5xl md:text-6xl font-extrabold tracking-[0.2em] mb-4">
              {letters.map((l, i) => (
                <span key={i} className={letterColor(l)}>{l}</span>
              ))}
            </p>
            <h1 className="text-2xl md:text-4xl font-extrabold text-foreground mb-3">
              {archetype.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{archetype.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Print-only header */}
      <div className="print-only mb-8 container max-w-5xl">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-primary/15 text-primary rounded-full px-3 py-1 text-xs font-bold">
            {archetype.class}
          </span>
          <span className="font-extrabold text-foreground">{archetype.leakage_range}</span>
        </div>
        <p className="font-mono text-4xl font-extrabold tracking-[0.2em] mb-2">
          {letters.map((l, i) => (
            <span key={i} className={letterColor(l)}>{l}</span>
          ))}
        </p>
        <h1 className="text-2xl font-extrabold text-foreground mb-2">{archetype.name}</h1>
        <p className="text-base text-muted-foreground">{archetype.description}</p>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="container max-w-5xl py-10">
        {/* Maturity Profile */}
        <motion.section data-pdf-section="maturity" {...fadeIn} transition={{ delay: 0.1 }}>
          <h2 className="text-xl font-bold text-foreground mb-6">Your Maturity Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {dims.map((dim, i) => {
              const Icon = dimIcons[dim];
              const l = letters[i];
              return (
                <div key={dim} className="bg-card rounded-lg border p-5 break-inside-avoid">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {dimensionLabels[dim]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`font-mono text-2xl font-extrabold ${letterColor(l)}`}>{l}</span>
                    <span className={`${bgColor(l)} text-primary-foreground text-[11px] font-bold px-3 h-6 rounded-full inline-flex items-center`}>
                      {levelLabel(l)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full">
                    <div className={`h-2 rounded-full ${barWidth(l)} ${bgColor(l)}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Dimension Analysis */}
        <motion.section data-pdf-section="dimensions" {...fadeIn} transition={{ delay: 0.2 }}>
          <h2 className="text-xl font-bold text-foreground mb-6">Dimension Analysis</h2>
          <div className="space-y-6 mb-12">
            {dims.map((dim, i) => {
              const Icon = dimIcons[dim];
              const l = letters[i];
              return (
                <div key={dim} className="bg-card rounded-lg border p-6 break-inside-avoid">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="font-bold text-lg text-foreground">{dimensionLabels[dim]}</span>
                    <span className={`ml-auto font-mono font-bold text-lg ${letterColor(l)}`}>{l}</span>
                  </div>
                  <p className="text-sm text-foreground mb-4">
                    {dimensionDescriptions[dim]}
                  </p>
                  <div className={`border-l-4 ${borderColor(l)} pl-4 py-2 rounded-r-lg bg-accent/30`}>
                    <p className="text-sm text-foreground">
                      {levelDescriptions[dim][l]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Recommended Improvements */}
        <motion.section data-pdf-section="improvements" {...fadeIn} transition={{ delay: 0.3 }}>
          <h2 className="text-xl font-bold text-foreground mb-6">Recommended Improvements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 print-break">
            {dims.map((dim, i) => {
              const Icon = dimIcons[dim];
              const l = letters[i];
              return (
                <div key={dim} className="bg-card rounded-lg border p-5 break-inside-avoid">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm text-foreground">{dimensionLabels[dim]}</span>
                    <span className={`ml-auto font-mono font-bold ${letterColor(l)}`}>{l}</span>
                  </div>
                  <ul className="space-y-3">
                    {improvements[dim][l].map((item, j) => (
                      <li key={j} className="flex gap-2 text-sm">
                        <span className="text-primary font-bold shrink-0">•</span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section className="no-print" {...fadeIn} transition={{ delay: 0.4 }}>
          <div className="bg-card rounded-lg border p-8 text-center">
            <h2 className="text-xl font-bold text-foreground mb-2">
              Want to go from {archetype.name} to Pricing Master?
            </h2>
            <p className="text-muted-foreground mb-6">
              Book a free pricing consultation with Valueships
            </p>
            <a
              href="https://www.valueships.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Result;
