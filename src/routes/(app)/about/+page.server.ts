import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, safeGetSession } }) => {

  const {session} = await safeGetSession()
  
    if (!session) {
      throw redirect(303, '/')
    }

  }