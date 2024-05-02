<script lang="ts">
	import Generate from './generate-questions/Generate.svelte';
	import from_image_hiv2 from '$lib/assets/front_image_hiv2.png';
	import { getUserState, setUserState } from '$lib';
	import type { PageServerData } from './$types';
	import Nav from '../(static)/Nav.svelte';
	import Suggestion from './suggesstions/Suggestion.svelte';

	export let data: PageServerData;

	setUserState(data.user);

	const userState = getUserState();
</script>

<Nav userState={$userState} />

<div class="relative">
	<div class="z-20 flex min-h-screen items-center justify-center">
		{#if data.userList.data?.had_submit}
			<div class="flex flex-col gap-[20px] p-[2rem]">
				<h3
					class="mx-auto max-w-fit scroll-m-20 rounded-lg bg-red-500 p-[1rem] text-center text-4xl font-semibold tracking-tight"
				>
					Thanks for participating. {$userState?.user_metadata.fullName.split(',')[0]}
				</h3>
				<Suggestion />
			</div>
		{:else}
			<div class="w-full p-[2rem] md:w-[900px]">
				<Generate />
			</div>
		{/if}
	</div>

	<img
		src={from_image_hiv2}
		alt=""
		class="student absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full"
	/>
</div>

<style>
	.student {
		filter: grayscale(50%);
	}
</style>
