<script lang="ts">
	import { getUserState, setUserState } from '$lib';
	import Nav from '../(static)/Nav.svelte';
	import type { PageServerData } from './$types';
	import CreateRespondent from './components/create-respondent.svelte';
	import SearchRespondent from './components/search-respondent.svelte';

	import HivTable from './hiv-respondents/hiv-table.svelte';

	export let data: PageServerData;

	setUserState(data.user);

	const userState = getUserState();
</script>

<Nav userState={$userState} />

<div class="mt-[10dvh] flex flex-col gap-[10px] p-[2rem]">
	<div class="flex flex-wrap items-center justify-between gap-[10px]">
		<CreateRespondent />
		<SearchRespondent />
	</div>
	<HivTable respondents={data.repondents.data} />
</div>
