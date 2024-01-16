import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {

    console.log('Profile page load!!');

    const session = await getSession()
  
    if (!session) {
      throw redirect(303, '/')
    }

    let { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .maybeSingle();

      return { profile };

  }