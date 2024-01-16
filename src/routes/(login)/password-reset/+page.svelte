<script lang="ts">
	import { Loader2 } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import FormContainer from '$lib/components/ux/login/FormContainer.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import {resetPasswordSchema} from './password-reset.schema';
	import { toast } from "svelte-sonner";
	import { goto } from '$app/navigation';

	export let data: PageData;

	const superFrm = superForm(data.form, {
		delayMs: 300,
		timeoutMs: 8000,
		validators: resetPasswordSchema,
		onResult: ({result}) => {

			if (result.status === 400 || result.status === 500) {
				const message = result.data.form.message;
				toast.error(message, {
					duration: 2000,
					position: "top-right",
				});
				return;
			}

			if (result.status === 200) {
				const message = result.data.form.message;
				toast.success(message, {
					duration: 2000,
					position: "top-right",
				});
				goto('/');
			}
		},
		taintedMessage: null
	});

	let delayed = superFrm.delayed;
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
		<Form.Root method="POST" controlled schema={resetPasswordSchema} form={superFrm} let:config>
			<Form.Field {config} name="email">
				<Form.Item>
					<Form.Label>Email</Form.Label>
					<Form.Input
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
				Resset Password
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
