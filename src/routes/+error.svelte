<script lang="ts">
	import { Button } from "$lib/components/ui/button";
  </script>

<svelte:head>
	<title>Upps.. 404</title>
</svelte:head>

<div class="flex flex-col items-center justify-center h-screen">
	<h1 class="text-2xl mb-4">Looking for something? &#x1F50D;</h1>
	<p class="text-center text-sm mb-4">We couldn't find page you are looking for!</p>
	<a href="/">
		<Button type="button">Home</Button>
	</a>
</div>