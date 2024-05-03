<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import type { Respondent, UserList, UserListWithRespondent } from '$lib/types';
	import { flip } from 'svelte/animate';
	import DeleteRespondent from './delete-respondent.svelte';
	import UpdateRespondent from './update-respondent.svelte';

	export let respondents: UserListWithRespondent[] | null;
</script>

<div class="">
	<Table.Root>
		<Table.Caption>HIV Respondents.</Table.Caption>
		<Table.Header>
			<Table.Row class="truncate">
				<Table.Head>Email</Table.Head>
				<Table.Head>Full Name</Table.Head>
				<Table.Head>Birth Day</Table.Head>
				<Table.Head>Age</Table.Head>
				<Table.Head>Year Level</Table.Head>
				<Table.Head>Section</Table.Head>
				<Table.Head>Department</Table.Head>
				<Table.Head>HIV Percentage</Table.Head>
				<Table.Head>Options</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each respondents ?? [] as respondent (respondent.id)}
				<Table.Row class="truncate">
					<Table.Cell>{respondent.user_email}</Table.Cell>
					<Table.Cell>{respondent.user_fullname}</Table.Cell>
					<Table.Cell>{respondent.user_birthday}</Table.Cell>
					<Table.Cell>{respondent.user_age}</Table.Cell>
					<Table.Cell>{respondent.user_year_lvl}</Table.Cell>
					<Table.Cell>{respondent.user_section}</Table.Cell>
					<Table.Cell>{respondent.user_department}</Table.Cell>
					<Table.Cell
						>{respondent.hiv_results_tb ? `${respondent.hiv_results_tb.percentage} %` : 'N/A'}
					</Table.Cell>
					<Table.Cell class="flex items-center gap-[10px]">
						<UpdateRespondent />
						<DeleteRespondent />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
