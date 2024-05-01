<script lang="ts">
	import { getUserState } from '$lib';
	import type { User } from '@supabase/supabase-js';
	import DarkMode from './DarkMode.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let userState: User | null;
</script>

<nav class=" flex items-center justify-between p-[1rem]">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">HIV ADMS</h3>
	<div class="flex items-center gap-[10px]">
		{#if userState}
			<form
				on:submit|preventDefault
				method="post"
				action={`${$page.url.pathname}?/logoutAction`}
				use:enhance
			>
				<Button type="submit">Log out</Button>
			</form>
		{/if}
		<DarkMode />
	</div>
</nav>
