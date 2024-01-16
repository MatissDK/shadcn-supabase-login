import { expoInOut } from 'svelte/easing';
import type { Actions } from './$types'
import { fail } from "@sveltejs/kit";
import { superValidate, message } from 'sveltekit-superforms/server';
import { registerSchema } from './register.schema';
import { AuthApiError } from '@supabase/supabase-js';

export const load = (async () => {
	const form = await superValidate(registerSchema);
	return { form };
});

export const actions: Actions = {
	default: async (event) => {

		const { request, url, locals: { supabase } } = event

		const form = await superValidate(request, registerSchema);

		// Convenient validation check:
		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}


		const email = form.data.email as string;
		const password = form.data.password as string;

		const { data, error: err } = await supabase.auth.signUp({
			email: email,
			password: password,
		})

		if (err) {

			if (err instanceof AuthApiError) {
				return message(form, 'Uppsss... Invalid registeration. Please try again.', {
					status: 400
				});
			}

			return message(form, 'Server error. Please try again later.', {
				status: 500
			});
		}

		return message(form, 'Registeration successful!');

	}
}