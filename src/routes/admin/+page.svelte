<script lang="ts">
	import { createSearchStore, getUserState, searchHandler, setUserState } from '$lib';
	import { onDestroy } from 'svelte';
	import Nav from '../(static)/Nav.svelte';
	import type { PageServerData } from './$types';
	import CreateRespondent from './components/create-respondent.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import HivTable from './hiv-respondents/hiv-table.svelte';
	import type { UserListWithRespondent } from '$lib/types';

	export let data: PageServerData;

	setUserState(data.user);

	const userState = getUserState();

	const initialStart = (param: UserListWithRespondent[] | null) => {
		const value = param?.map((respondent: UserListWithRespondent) => ({
			...respondent,
			searchTerms: `${respondent.user_fullname} 
			${respondent.user_age} 
			${respondent.user_email} 
			${respondent.hiv_results_tb?.percentage} 
			${respondent.user_department}
			${respondent.user_section}
		`
		}));

		return value;
	};

	$: searchStore = createSearchStore(initialStart(data.repondents.data) ?? []);
	$: unsub = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => unsub());
</script>

<Nav userState={$userState} />

<div class="mt-[10dvh] flex flex-col gap-[10px] p-[2rem]">
	<div class="flex flex-wrap items-center justify-between gap-[10px]">
		<CreateRespondent />
		<Input
			type="search"
			placeholder="Search ..."
			class="max-w-xs"
			bind:value={$searchStore.search}
		/>
	</div>
	<HivTable respondents={$searchStore.filtered} />
</div>
