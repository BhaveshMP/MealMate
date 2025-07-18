import { supabase } from '../lib/supabaseClient'


export const insertUser = async ({name, email, password}) => {
  const { data, error } = await supabase
    .from('users')
    .insert([
      { name: name, email: email, password: password } // your columns
    ])

  if (error) {
    console.error('Insert failed:', error.message)
  } else {
    console.log('Inserted:', data)
  }
  console.log("END")
}