import type { Actions } from './$types'
import { fail } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { forgotPasswordSchema } from './forgot-password.schema';


export const load = async () => {
  return {
	  form: await superValidate(zod(forgotPasswordSchema)),
	};
};

export const actions: Actions = {
  default: async (event) => {

    const { request, url, locals: { supabase } } = event

    const form = await superValidate(request, zod(forgotPasswordSchema));

    // Convenient validation check:
    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    // const email = form.data.email as string;

    // const { data, error: err } = await supabase.auth.resetPasswordForEmail(email);

    // if (err) {
    //   return message(form, 'Uppsss... Please try again', {
    //     status: 403
    //   });
    // }
    
    return message(form, 'Password reset email sent! Please check your inbox.');
  }
}