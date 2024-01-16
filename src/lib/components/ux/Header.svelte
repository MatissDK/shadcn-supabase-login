<script lang="ts">
	import Container from '$lib/components/ux/Container.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Moon, Sun, Menu } from 'lucide-svelte';
	import { toggleMode } from 'mode-watcher';
	import * as config from '$lib/config';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import Profile from '$lib/components/ux/header/user-profile.svelte';

	export let session: Session | null;
	export let supabase: SupabaseClient | null;

	let links = [
		{
			href: '/about',
			label: 'About'
		},
		{
			href: '/terms',
			label: 'Terms'
		}
	];
</script>

<header class="fixed top-0 flex h-20 w-full items-center border-b bg-background py-4">
	<Container>
		<div class="flex items-center justify-between">
			<div class="flex items-center">
				<a href="/">
					<div class="text-xl font-semibold">{config.title}</div>
				</a>
				{#if session && supabase}
					<nav class="ml-10 hidden space-x-2 md:flex">
						{#each links as link}
							<a href={link.href}>
								<Button variant="ghost">{link.label}</Button>
							</a>
						{/each}
					</nav>
				{/if}
			</div>

			<div class="flex items-center">
				<Sheet.Root>
					<Sheet.Trigger asChild let:builder>
						<Button builders={[builder]} size="icon" variant="ghost" class="md:hidden">
							<Menu size={20} />
						</Button>
					</Sheet.Trigger>
					<Sheet.Content side="left">
						<div class="mt-8 flex flex-col">
							{#each links as link}
								<a href={link.href} class="w-full">
									<Sheet.Close asChild let:builder>
										<Button builders={[builder]} variant="ghost" class="w-full">{link.label}</Button
										>
									</Sheet.Close>
								</a>
							{/each}
							<a href="/login" class="mt-8 w-full">
								<Sheet.Close asChild let:builder>
									<Button builders={[builder]} variant="ghost" class="w-full">Sign In</Button>
								</Sheet.Close>
							</a>
						</div>

						<Sheet.Footer>
							<div class="absolute bottom-0 left-0 flex w-full justify-center pb-8">
								<Button on:click={toggleMode} size="icon" variant="ghost">
									<Moon
										size={20}
										class="w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
									/>
									<Sun
										size={20}
										class="absolute w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
									/>
								</Button>
							</div>
						</Sheet.Footer>
					</Sheet.Content>
				</Sheet.Root>
			</div>

			<div class="hidden items-center md:flex">
				{#if !session}
				<a href="/sign-in">
					<Button variant="ghost">Sign In</Button>
				</a>

				<a href="/register">
					<Button variant="ghost">Register</Button>
				</a>
				{/if}

				<Button on:click={toggleMode} size="icon" variant="ghost">
					<Moon size={20} class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Sun
						size={20}
						class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
				</Button>

				{#if session && supabase}
					<Profile {supabase} {session} />
				{/if}
			</div>
		</div>
	</Container>
</header>
