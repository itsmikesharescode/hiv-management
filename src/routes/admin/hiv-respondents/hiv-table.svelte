<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import type { Respondent, UserList } from '$lib/types';
	import DeleteRespondent from './delete-respondent.svelte';
	import UpdateRespondent from './update-respondent.svelte';

	export let respondents: Respondent[] | null;
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
			{#each respondents ?? [] as respondent, index}
				<Table.Row>
					<Table.Cell>{respondent.user_list_tb.user_email}</Table.Cell>
					<Table.Cell>{respondent.user_list_tb.user_fullname}</Table.Cell>
					<Table.Cell>{respondent.user_list_tb.user_birthday}</Table.Cell>
					<Table.Cell>{respondent.user_list_tb.user_age}</Table.Cell>
					<Table.Cell>{respondent.user_list_tb.user_year_lvl}</Table.Cell>
					<Table.Cell>{respondent.user_list_tb.user_section}</Table.Cell>
					<Table.Cell>{respondent.user_list_tb.user_department}</Table.Cell>
					<Table.Cell>{respondent.percentage} %</Table.Cell>
					<Table.Cell class="flex items-center gap-[10px]">
						<UpdateRespondent />
						<DeleteRespondent />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
