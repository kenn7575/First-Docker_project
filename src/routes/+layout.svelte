<script>
	import '../app.pcss';

	import { DarkMode } from 'flowbite-svelte';
</script>

<main class="flex min-h-screen flex-col bg-white dark:bg-gray-900">
	<DarkMode />
	<slot />
</main>
