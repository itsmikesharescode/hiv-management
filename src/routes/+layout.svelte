<script lang="ts">
	import '../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import DarkMode from './(static)/DarkMode.svelte';
</script>

<ModeWatcher />
<Toaster />

<div class="fixed bottom-0 m-[20px]">
	<DarkMode />
</div>
<slot />
