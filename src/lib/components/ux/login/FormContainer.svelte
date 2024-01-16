<script lang="ts">
    import Quote from '$lib/components/ux/login/Quote.svelte';
    import * as config from '$lib/config';
</script>

<div
	class="container relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(/background-photo.avif);"
		/>
		<div class="relative z-20 flex items-center text-lg font-medium">
			<a href="/">{config.title}</a>
		</div>
		<div class="relative z-20 mt-auto">
			<Quote/>
		</div>
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <slot/>
		</div>
	</div>
</div>
