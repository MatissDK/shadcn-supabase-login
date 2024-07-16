import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, safeGetSession } }) => {

    const {session} = await safeGetSession()

    if (!session) {
      throw redirect(303, '/')
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .maybeSingle();

      return { profile };

  }