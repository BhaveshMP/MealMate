// supabaseClient.js
// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// ✅ Best practice: use environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
