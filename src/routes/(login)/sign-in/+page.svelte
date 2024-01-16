<script lang="ts">
	import { Loader2 } from 'lucide-svelte';
	import * as config from '$lib/config';
	import * as Form from '$lib/components/ui/form';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { loginSchema } from './login.schema';
	import { toast } from "svelte-sonner";
	import FormContainer from '$lib/components/ux/login/FormContainer.svelte';

	export let data: PageData;

	const superFrm = superForm(data.form, {
		delayMs: 300,
		timeoutMs: 8000,
		validators: loginSchema,
		onResult: (result) => {
			if (result.result.status === 403) {
				const message = result.result.data.form.message;
				toast.error(message, {
					duration: 2000,
					position: "top-right",
				});
			}
		
		},
		taintedMessage: null
	});

	let delayed = superFrm.delayed;
	let errors = superFrm.errors;
</script>

<svelte:head>
	<title>Sign In</title>
</svelte:head>


<FormContainer>
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">Welcome back</h1>
		<p class="text-sm text-muted-foreground">Sign in to your account</p>
	</div>
	<div class="grid gap-6">
		<Form.Root method="POST" schema={loginSchema} controlled form={superFrm} let:config>
			<Form.Field {config} name="email">
				<Form.Item>
					<Form.Label>Email</Form.Label>
					<Form.Input
						class={$errors.email ? 'border-destructive' : ''}
						id="email"
						name="email"
						placeholder="name@example.com"
					/>
					<Form.Validation class="!mb-4 text-xs" />
				</Form.Item>
			</Form.Field>

			<Form.Field {config} name="password">
				<Form.Item>
					<Form.Label class="flex justify-between text-sm">
						<span>Password</span>
						<span><a href="/forgot-password" class="text-primary text-xs">Forgot password?</a></span>
					</Form.Label>
					<Form.Input
						class={$errors.password ? 'border-destructive' : ''}
						id="password"
						name="password"
						type="password"
						placeholder="••••••••"
					/>
					<Form.Validation class="!mb-4 text-xs" />
				</Form.Item>
			</Form.Field>
			<Form.Button class="w-full">
				{#if $delayed}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Sing In
			</Form.Button>
		</Form.Root>

		<p class="px-8 text-center text-sm text-muted-foreground">
			Don't have an account?
			<a href="/register" class="underline underline-offset-4 hover:text-primary">
				Register Now
			</a>
		</p>
	</div>
</FormContainer>
