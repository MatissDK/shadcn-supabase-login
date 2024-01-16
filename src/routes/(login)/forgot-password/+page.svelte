<script lang="ts">
	import { Loader2, CheckCircle } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import * as Alert from '$lib/components/ui/alert';
	import FormContainer from '$lib/components/ux/login/FormContainer.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { forgotPasswordSchema } from './forgot-password.schema';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	let displaySuccess = false;

	const superFrm = superForm(data.form, {
		delayMs: 300,
		timeoutMs: 8000,
		validators: forgotPasswordSchema,
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

			if (result.status === 403) {
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
</script>

<svelte:head>
	<title>Forgot password</title>
</svelte:head>

<FormContainer>
	{#if displaySuccess}
		<Alert.Root variant="success">
			<CheckCircle size={18} class="!text-green-900"/>
			<Alert.Title>Check your email to for reset link!</Alert.Title>
		</Alert.Root>
	{:else}

		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Reset Your Password</h1>
			<p class="text-sm text-muted-foreground">
				Type in your email and we'll send you a link to reset your password
			</p>
		</div>
		<div class="grid gap-6">
			<Form.Root method="POST" schema={forgotPasswordSchema} controlled form={superFrm} let:config>
				<Form.Field {config} name="email">
					<Form.Item>
						<Form.Label>Email</Form.Label>
						<Form.Input id="email" name="email" placeholder="name@example.com" />
						<Form.Validation class="!mb-4 text-xs" />
					</Form.Item>
				</Form.Field>
				<Form.Button class="w-full">
					{#if $delayed}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Send Reset Email
				</Form.Button>
			</Form.Root>

			<p class="px-8 text-center text-sm text-muted-foreground">
				Already have an account?
				<a href="/sign-in" class="underline underline-offset-4 hover:text-primary"> Sign In </a>
			</p>
		</div>
	{/if}
</FormContainer>
