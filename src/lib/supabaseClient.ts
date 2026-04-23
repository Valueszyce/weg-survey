import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://dirpbqdjlwebcxdubrxr.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_3JE76ZTTzgFkiJdo-EB5Ow_W2BmiOsh"

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
