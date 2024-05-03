<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { enhance } from '$app/forms';
	import Birthday from '../../(static)/Birthday.svelte';
	import { calculateAge } from '$lib/helpers';
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel, UserListWithRespondent } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { Loader } from 'lucide-svelte';
	import { invalidateAll } from '$app/navigation';

	export let respondent: UserListWithRespondent;

	let open = false;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});
	type UpdateAccountVal = {
		firstName: string[];
		middleName: string[];
		lastName: string[];
		birthDay: string[];
		yearLvl: string[];
		section: string[];
		department: string[];
		email: string[];
		password: string[];
		confirmPassword: string[];
	};

	let updateAccountLoader = false;
	let formErrors: UpdateAccountVal | null = null;
	let birthDayVal: DateValue | undefined;

	const updateAccountActionNews: SubmitFunction = () => {
		updateAccountLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: UpdateAccountVal }>;

			switch (status) {
				case 200:
					await invalidateAll();
					formErrors = null;
					toast.success('Update Account', { description: msg });
					updateAccountLoader = false;
					open = false;
					break;

				case 400:
					formErrors = errors;
					updateAccountLoader = false;
					break;

				case 401:
					formErrors = null;
					toast.error('Update Account', { description: msg });
					updateAccountLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<Button on:click={() => (open = true)}>Update</Button>

<AlertDialog.Root bind:open>
	<AlertDialog.Content class="max-w-[600px]">
		<AlertDialog.Header>
			<AlertDialog.Title
				>Update <mark>{respondent.user_fullname.split(',')[1].split(' ')[1]}</mark> Account</AlertDialog.Title
			>
			<AlertDialog.Description>This will update respondent information.</AlertDialog.Description>
		</AlertDialog.Header>

		<form
			method="post"
			action="?/updateAccountAction"
			use:enhance={updateAccountActionNews}
			class="flex flex-col gap-[20px]"
		>
			<div class="grid max-h-[55dvh] grid-cols-1 gap-[20px] overflow-auto p-[2rem]">
				<div class="flex w-full flex-col gap-1.5">
					<Label for="firstName">First Name</Label>
					<Input
						name="firstName"
						disabled={updateAccountLoader}
						type="text"
						id="firstName"
						placeholder="Enter your first name"
					/>
					{#each formErrors?.firstName ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="middleName" class="truncate">Middle Name</Label>
					<Input
						name="middleName"
						disabled={updateAccountLoader}
						type="text"
						id="middleName"
						placeholder="Enter your middle name"
					/>
					{#each formErrors?.middleName ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="lastName">Last Name</Label>
					<Input
						name="lastName"
						disabled={updateAccountLoader}
						type="text"
						id="lastName"
						placeholder="Enter your last name"
					/>
					{#each formErrors?.lastName ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="age">Birthday</Label>
					<input
						name="birthDay"
						type="hidden"
						value={birthDayVal ? df.format(birthDayVal.toDate(getLocalTimeZone())) : ''}
					/>
					<input name="age" type="hidden" value={calculateAge(birthDayVal)} />
					<Birthday disabled={updateAccountLoader} bind:value={birthDayVal} />
					{#each formErrors?.birthDay ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
					<div class="flex w-full flex-col gap-1.5">
						<Label for="yearLevel">Year Level</Label>
						<Input
							name="yearLvl"
							disabled={updateAccountLoader}
							type="text"
							id="yearLevel"
							placeholder="Enter your year level"
						/>
						{#each formErrors?.yearLvl ?? [] as errorMsg}
							<p class="text-sm text-red-500">{errorMsg}</p>
						{/each}
					</div>

					<div class="flex w-full flex-col gap-1.5">
						<Label for="section">Section</Label>
						<Input
							name="section"
							disabled={updateAccountLoader}
							type="text"
							id="section"
							placeholder="Enter your section"
						/>
						{#each formErrors?.section ?? [] as errorMsg}
							<p class="text-sm text-red-500">{errorMsg}</p>
						{/each}
					</div>
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="department">Department</Label>
					<Input
						name="department"
						disabled={updateAccountLoader}
						type="text"
						id="department"
						placeholder="Enter your department"
					/>
					{#each formErrors?.department ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="email">Email</Label>
					<Input
						name="email"
						disabled={updateAccountLoader}
						type="email"
						id="email"
						placeholder="Enter your email"
					/>
					{#each formErrors?.email ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="password">Password</Label>
					<Input
						name="password"
						disabled={updateAccountLoader}
						type="password"
						id="password"
						placeholder="Enter your password"
					/>
					{#each formErrors?.password ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="password">Confirm Password</Label>
					<Input
						name="confirmPassword"
						disabled={updateAccountLoader}
						type="password"
						id="confirmPassword"
						placeholder="Confirm your password"
					/>
					{#each formErrors?.confirmPassword ?? [] as errorMsg}
						<p class="text-sm text-red-500">{errorMsg}</p>
					{/each}
				</div>
			</div>

			<div class="flex flex-col justify-end gap-[10px] px-[2rem] md:flex-row">
				<Button disabled={updateAccountLoader} on:click={() => (open = false)}>Cancel</Button>
				<Button disabled={updateAccountLoader} type="submit">
					{#if updateAccountLoader}
						Updating... <Loader class="h-[14px] w-[14px] animate-spin" />
					{:else}
						Update
					{/if}
				</Button>
			</div>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
