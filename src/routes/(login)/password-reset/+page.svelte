<script lang="ts">
	import { Loader2 } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import FormContainer from '$lib/components/ux/login/FormContainer.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import {resetPasswordSchema} from './password-reset.schema';
	import { toast } from "svelte-sonner";
	import { goto } from '$app/navigation';
	import { zodClient } from "sveltekit-superforms/adapters";
	import { Control } from 'formsnap';
	import { Input } from "$lib/components/ui/input";

	export let data: PageData;

	const superFrm = superForm(data.form, {
		delayMs: 300,
		timeoutMs: 8000,
		validators: zodClient(resetPasswordSchema),
		// onResult: ({result}) => {

		// 	if (result.status === 400 || result.status === 500) {
		// 		const message = result.data.form.message;
		// 		toast.error(message, {
		// 			duration: 2000,
		// 			position: "top-right",
		// 		});
		// 		return;
		// 	}

		// 	if (result.status === 200) {
		// 		const message = result.data.form.message;
		// 		toast.success(message, {
		// 			duration: 2000,
		// 			position: "top-right",
		// 		});
		// 		goto('/');
		// 	}
		// },
		taintedMessage: null
	});

	const { form: formData, enhance, errors, delayed } = superFrm;
</script>

<svelte:head>
	<title>Password reset</title>
</svelte:head>

<FormContainer>
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">Reset Your Password</h1>
		<p class="text-sm text-muted-foreground">Enter email and new password</p>
	</div>
	<div class="grid gap-6">
		<form use:enhance method="POST" >

			<Form.Field form="{superFrm}" name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs}
					class={$errors.email ? 'border-destructive' : ''} 
					bind:value={$formData.email} />
				</Form.Control>
				<Form.FormFieldErrors class="!mb-4 text-xs" />
			</Form.Field>

			<Form.Field form="{superFrm}" name="password">
				<Form.Control let:attrs>
					<Form.Label>
						<span>Password</span>
					</Form.Label>
					<Input class={$errors.password ? 'border-destructive' : ''}
						type="password" 
				  	placeholder="••••••••" 
				  	{...attrs}
				  bind:value={$formData.password}/>
				</Form.Control>
				<Form.FormFieldErrors class="!mb-4 text-xs" />
			</Form.Field>

			<Form.Button class="w-full">
				{#if $delayed}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Resset Password
			</Form.Button>
		</form>

		<p class="px-8 text-center text-sm text-muted-foreground">
			Don't have an account?
			<a href="/register" class="underline underline-offset-4 hover:text-primary">
				Register Now
			</a>
		</p>
	</div>
</FormContainer>
