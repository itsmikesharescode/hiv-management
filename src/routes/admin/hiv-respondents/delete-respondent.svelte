<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { ResultModel, UserListWithRespondent } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { Loader } from 'lucide-svelte';

	export let respondent: UserListWithRespondent;

	let open = false;

	let deleteLoader = false;
	const deleteRespondentActionNews: SubmitFunction = () => {
		deleteLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					await invalidateAll();
					toast.success('Delete Respondent', { description: msg });
					deleteLoader = false;
					break;

				case 401:
					toast.error('Delete Respondent', { description: msg });
					deleteLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<Button variant="destructive" on:click={() => (open = true)}>Delete</Button>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<form
			method="post"
			action="?/deleteRespondentAction"
			use:enhance={deleteRespondentActionNews}
			class="grid grid-cols-1 gap-[20px]"
		>
			<input name="userId" type="hidden" value={respondent.user_id} />
			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete <b class="text-red-500"
						>{respondent.user_fullname}</b
					>
					account and remove data from our database.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel disabled={deleteLoader}>Cancel</AlertDialog.Cancel>

				<Button disabled={deleteLoader} type="submit">
					{#if deleteLoader}
						Deleting...<Loader class="h-[14px] w-[14px] animate-spin" />
					{:else}
						Delete This Respondent
					{/if}
				</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
