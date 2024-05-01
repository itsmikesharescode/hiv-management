<script lang="ts">
	import '../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	import Nav from './(static)/Nav.svelte';
</script>

<ModeWatcher />
<Toaster />
<slot />
