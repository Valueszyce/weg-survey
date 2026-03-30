import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseKey)

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
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase env vars not set — skipping save')
    return
  }
  const { error } = await supabase.from('responses').insert([data])
  if (error) throw error
}
