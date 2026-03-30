import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? ''

function getClient() {
  if (!supabaseUrl || !supabaseKey) return null
  return createClient(supabaseUrl, supabaseKey)
}

const supabase = getClient()

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
  if (!supabase) {
    console.warn('Supabase not configured — skipping save')
    return
  }
  const { error } = await supabase.from('responses').insert([data])
  if (error) throw error
}
