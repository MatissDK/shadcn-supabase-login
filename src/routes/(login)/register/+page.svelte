<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Alert from '$lib/components/ui/alert';
	import FormContainer from '$lib/components/ux/login/FormContainer.svelte';
	import { Loader2, CheckCircle } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { registerSchema } from './register.schema';
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	let displaySuccess = false;

	const superFrm = superForm(data.form, {
		delayMs: 300,
		timeoutMs: 8000,
		validators: registerSchema,
		onResult: ({ result }) => {
			if (result.status === 200) {
				displaySuccess = true;
				const message = result.data.form.message;
				toast.success(message, {
					duration: 2000,
					position: 'top-right'
				});
				return;
			}

			if (result.status === 400 || result.status === 500) {
				const message = result.data.form.message;
				toast.error(message, {
					duration: 2000,
					position: 'top-right'
				});
			}
		},
		taintedMessage: null
	});

	let delayed = superFrm.delayed;
	let errors = superFrm.errors;
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<FormContainer>
	{#if displaySuccess}
		<Alert.Root variant="success">
			<CheckCircle size={18} class="!text-green-900"/>
			<Alert.Title>Check your email to confirm</Alert.Title>
			<Alert.Description>You've successfully signed up. Please check your email to confirm your account before signing in to the App</Alert.Description>
		</Alert.Root>

		<p class="px-8 text-center text-sm text-muted-foreground">
			Have an account?{' '}
			<a href="/sign-in" class="underline underline-offset-4 hover:text-primary">
				Sign In Now
			</a>{' '}
		</p>
	{:else}
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Register</h1>
			<p class="text-sm text-muted-foreground">Create you account here</p>
		</div>
		<div class="grid gap-6">
			<Form.Root method="POST" schema={registerSchema} controlled form={superFrm} let:config>
				<!-- <SuperDebug data={message} /> -->
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
						<Form.Label>
							<span>Password</span>
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
					Register
				</Form.Button>
			</Form.Root>
		</div>
		<p class="px-8 text-center text-sm text-muted-foreground">
			Have an account?{' '}
			<a href="/sign-in" class="underline underline-offset-4 hover:text-primary">
				Sign In Now
			</a>{' '}
		</p>
	{/if}
</FormContainer>
