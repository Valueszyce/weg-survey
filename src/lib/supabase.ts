import { supabase } from '@/integrations/supabase/client'

export async function saveResponse(data: {
  email: string
  first_name: string
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
    first_name: data.first_name,
    archetype_code: data.archetype_code,
    cap_score: data.cap_score,
    set_score: data.set_score,
    exe_score: data.exe_score,
    cap_letter: data.cap_letter,
    set_letter: data.set_letter,
    exe_letter: data.exe_letter,
    raw_scores: data.raw_scores,
    archetype_url: `https://epr-survey-short.lovable.app/result/${data.archetype_code}`,
    q2:  data.raw_scores['Q2']  ?? null,
    q3:  data.raw_scores['Q3']  ?? null,
    q8:  data.raw_scores['Q8']  ?? null,
    q12: data.raw_scores['Q12'] ?? null,
    q15: data.raw_scores['Q15'] ?? null,
    q23: data.raw_scores['Q23'] ?? null,
    q27: data.raw_scores['Q27'] ?? null,
    q28: data.raw_scores['Q28'] ?? null,
    q29: data.raw_scores['Q29'] ?? null,
  }])
  if (error) throw error
}
