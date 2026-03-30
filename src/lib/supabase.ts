import { supabase } from '@/integrations/supabase/client'

export async function saveResponse(data: {
  email: string
  archetype_code: string
  cap_score: number
  set_score: number
  exe_score: number
  cap_letter: string
  set_letter: string
  exe_letter: string
  raw_scores: Record<string, number>
}) {
  const { error } = await supabase.from('responses').insert([{
    email: data.email,
    archetype_code: data.archetype_code,
    cap_score: data.cap_score,
    set_score: data.set_score,
    exe_score: data.exe_score,
    cap_letter: data.cap_letter,
    set_letter: data.set_letter,
    exe_letter: data.exe_letter,
    raw_scores: data.raw_scores,
    q2:  data.raw_scores['Q2']  ?? null,
    q3:  data.raw_scores['Q3']  ?? null,
    q4:  data.raw_scores['Q4']  ?? null,
    q5:  data.raw_scores['Q5']  ?? null,
    q6:  data.raw_scores['Q6']  ?? null,
    q7:  data.raw_scores['Q7']  ?? null,
    q8:  data.raw_scores['Q8']  ?? null,
    q9:  data.raw_scores['Q9']  ?? null,
    q10: data.raw_scores['Q10'] ?? null,
    q11: data.raw_scores['Q11'] ?? null,
    q12: data.raw_scores['Q12'] ?? null,
    q13: data.raw_scores['Q13'] ?? null,
    q14: data.raw_scores['Q14'] ?? null,
    q15: data.raw_scores['Q15'] ?? null,
    q16: data.raw_scores['Q16'] ?? null,
    q17: data.raw_scores['Q17'] ?? null,
    q18: data.raw_scores['Q18'] ?? null,
    q19: data.raw_scores['Q19'] ?? null,
    q20: data.raw_scores['Q20'] ?? null,
    q21: data.raw_scores['Q21'] ?? null,
    q22: data.raw_scores['Q22'] ?? null,
    q23: data.raw_scores['Q23'] ?? null,
    q24: data.raw_scores['Q24'] ?? null,
    q25: data.raw_scores['Q25'] ?? null,
    q26: data.raw_scores['Q26'] ?? null,
    q27: data.raw_scores['Q27'] ?? null,
    q28: data.raw_scores['Q28'] ?? null,
    q29: data.raw_scores['Q29'] ?? null,
  }])
  if (error) throw error
}
