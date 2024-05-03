<script lang="ts">
	import { getUserState } from '$lib';
	import type { User } from '@supabase/supabase-js';
	import DarkMode from './DarkMode.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	export let userState: User | null;

	let logoutLoader = false;
	const logoutActionNews: SubmitFunction = () => {
		logoutLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('Log out', { description: msg });
					logoutLoader = false;

					await goto('/');
					break;

				case 401:
					toast.error('Log out', { description: msg });
					logoutLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<nav class=" flex items-center justify-between border-b-[1px] p-[1rem]">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">HIV ADMS</h3>
	<div class="flex items-center gap-[10px]">
		{#if userState}
			<form
				on:submit|preventDefault
				method="post"
				action={`${$page.url.pathname}?/logoutAction`}
				use:enhance={logoutActionNews}
			>
				<Button disabled={logoutLoader} type="submit">
					{#if logoutLoader}
						Logging out
					{:else}
						Log out
					{/if}
				</Button>
			</form>
		{/if}
		<DarkMode />
	</div>
</nav>
