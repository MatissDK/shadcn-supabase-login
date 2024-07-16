<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { profile } = data;
  const { session } = data;

</script>

{#if session}
    <h1 class="text-lg">Hello <span class="text-destructive">{session.user.email} ({profile.full_name})</span></h1>
{/if}

AAAA
