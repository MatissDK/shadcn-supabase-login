import type { Actions } from './$types'
import { fail, redirect } from "@sveltejs/kit";
import { superValidate, message } from 'sveltekit-superforms/server';
import { resetPasswordSchema } from './password-reset.schema';
import { AuthSessionMissingError } from '@supabase/supabase-js';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async ({ locals: { safeGetSession } }) => {

  const { session } = await safeGetSession()

  // no need to reset, when we have valid session
  if (session) {
    throw redirect(303, '/')
  }

  return {
	  form: await superValidate(zod(resetPasswordSchema)),
	};
});


export const actions: Actions = {
  default: async (event) => {

    const { request, url, locals: { supabase } } = event

    const form = await superValidate(request, zod(resetPasswordSchema));

    // Convenient validation check:
    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    const email = form.data.email as string;
    const password = form.data.password as string;

    const { data, error: err } = await supabase.auth.updateUser({
      email: email,
      password: password
    });

    if (err) {

      if (err instanceof AuthSessionMissingError && err.status === 400) {
        return message(form, 'Uppsss... Looks like your reset link has expired.', {
          status: 400
        });
      }

      return message(form, 'Server error. Please try again later.', {
        status: 500
      });
    }

    return message(form, 'Password reset successfully!');
  }
}
