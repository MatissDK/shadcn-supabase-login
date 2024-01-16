import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {

    console.log('About page load!!');

    const session = await getSession()
  
    if (!session) {
      throw redirect(303, '/')
    }

  }