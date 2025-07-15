import { supabase } from '../lib/supabaseClient'


export const insertUser = async () => {
    console.log("START")
  const { data, error } = await supabase
    .from('users')
    .insert([
      { name: 'Alice', email: 'alice@example.com' } // your columns
    ])

  if (error) {
    console.error('Insert failed:', error.message)
  } else {
    console.log('Inserted:', data)
  }
  console.log("END")
}