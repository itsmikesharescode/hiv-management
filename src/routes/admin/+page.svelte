<script lang="ts">
	import { getUserState, setUserState } from '$lib';
	import Nav from '../(static)/Nav.svelte';
	import type { PageServerData } from './$types';
	import HivTable from './hiv-respondents/hiv-table.svelte';

	export let data: PageServerData;

	setUserState(data.user);

	console.log(data.repondents.data);

	const userState = getUserState();
</script>

<Nav userState={$userState} />

<div class="">
	<HivTable />
</div>
