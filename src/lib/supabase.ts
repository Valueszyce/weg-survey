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
  const { error } = await supabase.from('responses').insert([data])
  if (error) throw error
}
