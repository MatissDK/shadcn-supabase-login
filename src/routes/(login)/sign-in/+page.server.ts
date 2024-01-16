import type { Actions } from './$types'
import { fail, redirect } from "@sveltejs/kit";
import { superValidate, setError, message } from 'sveltekit-superforms/server';
import { loginSchema } from './login.schema';


  export const load = (async () => {
	// Server API:
	const form = await superValidate(loginSchema);
  
	// Unless you throw, always return { form } in load and form actions.
	return { form };
  });

export const actions: Actions = {
    default: async (event) => {
        const { request, url, locals: { supabase } } = event

		const form = await superValidate(request, loginSchema);

		// const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
		// const a = await wait(4000);

		// Convenient validation check:
		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

        // const body = Object.fromEntries(await request.formData())

        const email = form.data.email as string;
        const password = form.data.password as string;

        const { data, error: err } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		})

        if (err) {
            // console.log('Error in sign up!! ', err);
			return message(form, 'Invalid login credentials', {
				status: 403
			});
			// if (err instanceof AuthApiError && err.status === 400) {
			// 	return fail(400, {
			// 		error: "Invalid email or password",
			// 	})
			// }
			// return fail(500, {
			// 	error: "Server error. Please try again later.",
			// })
		}
		throw redirect(303, "/")
    }
}