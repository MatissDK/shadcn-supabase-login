<script lang="ts">
	import { Loader2 } from 'lucide-svelte';
	import * as config from '$lib/config';
	import * as Form from '$lib/components/ui/form';
	import { Input } from "$lib/components/ui/input";
	import type { PageData } from './$types';
	import { superForm } from "sveltekit-superforms";
	import { loginSchema } from './login.schema';
	import { toast } from "svelte-sonner";
	import FormContainer from '$lib/components/ux/login/FormContainer.svelte';
	import { zodClient } from "sveltekit-superforms/adapters";

	export let data: PageData;

	const superFrm = superForm(data.form, {
		delayMs: 600,
		timeoutMs: 8000,
		validators: zodClient(loginSchema),
		onUpdate(event) {
			if (event.form.message && event.result.status === 403) {
				toast.error(event.form.message, {
					duration: 2000,
					position: "top-right",
				});
			}
		},
		taintedMessage: null
	});

	const { form: formData, enhance, errors, delayed } = superFrm;
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
		<form use:enhance method="POST">

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
					<Form.Label class="flex justify-between text-sm">
						<span>Password</span>
						<span><a href="/forgot-password" class="text-primary text-xs">Forgot password?</a></span>
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
				Sing In
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
