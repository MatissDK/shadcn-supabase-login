<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';
	// why this works?
	import type { SubmitFunction } from '../../../../routes/(login)/login/$types';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { goto } from '$app/navigation';

	let form: HTMLFormElement;

	export let supabase: SupabaseClient;
	export let session: Session;

	const submitLogout: SubmitFunction = async ({ cancel }: { cancel: () => void }) => {
		if (!supabase) {
			return;
		}
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
		goto('/');
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative ml-4 h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8">
				<Avatar.Image src="/avatar1.png" />
				<Avatar.Fallback>AV</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">Hello,</p>
				<p class="text-xs leading-none text-muted-foreground">{session.user.email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item on:click={() => goto('/profile')}>
				Proile
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => goto('/billing')}>
				Billing
				<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => goto('/settings')}>
				Settings
				<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={() => form.requestSubmit()}>
			<form
				bind:this={form}
				class="w-full"
				action="/logout"
				method="POST"
				use:enhance={submitLogout}
			>
				Log out
			</form>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
