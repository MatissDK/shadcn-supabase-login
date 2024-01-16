<script lang="ts">
	import Header from '$lib/components/ux/Header.svelte';
	import Footer from '$lib/components/ux/Footer.svelte';
	import Container from "$lib/components/ux/Container.svelte";
	import { onMount } from 'svelte'
	import { goto, invalidate } from '$app/navigation'

	export let data;

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	  onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})

</script>


<div class="flex min-h-screen flex-col pt-24">

	<Header session={session} supabase={supabase}/>

	<Container>
		<slot />
	</Container>

	<div class="flex-1"></div>

	<div class="pt-5">
		<Footer/>
	</div>
	

</div>