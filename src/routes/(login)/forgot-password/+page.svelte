<script lang="ts">
	import { Loader2, CheckCircle } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import * as Alert from '$lib/components/ui/alert';
	import FormContainer from '$lib/components/ux/login/FormContainer.svelte';
	import type { PageData } from './$types';
	import { superForm } from "sveltekit-superforms";
	import { forgotPasswordSchema } from './forgot-password.schema';
	import { toast } from 'svelte-sonner';
	import { Input } from "$lib/components/ui/input";
	import { zodClient } from "sveltekit-superforms/adapters";

	export let data: PageData;

	let displaySuccess = false;

	const superFrm = superForm(data.form, {
		delayMs: 300,
		timeoutMs: 8000,
		validators: zodClient(forgotPasswordSchema),
		onUpdate: ({ result }) => {
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

	const { form: formData, enhance, errors, delayed } = superFrm;
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
			<form  use:enhance method="POST">

				<Form.Field form="{superFrm}" name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input {...attrs}
								class={$errors.email ? 'border-destructive' : ''} 
								bind:value={$formData.email}
								placeholder="name@example.com" />
					</Form.Control>
					<Form.FormFieldErrors class="!mb-4 text-xs" />
				</Form.Field>
				<Form.Button class="w-full">
					{#if $delayed}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Send Reset Email
				</Form.Button>
			</form>

			<p class="px-8 text-center text-sm text-muted-foreground">
				Already have an account?
				<a href="/sign-in" class="underline underline-offset-4 hover:text-primary"> Sign In </a>
			</p>
		</div>
	{/if}
</FormContainer>
