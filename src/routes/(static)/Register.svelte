<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Birthday from './Birthday.svelte';
	import { toast } from 'svelte-sonner';
	import type { ResultModel } from '$lib/types';
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import { enhance } from '$app/forms';
	import { calculateAge, formatDateToString } from '$lib/helpers';
	import { goto } from '$app/navigation';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	type RegisterVal = {
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

	let formErrors: RegisterVal | null = null;
	let registerLoader = false;
	let birthDayVal: DateValue | undefined;

	const registerActionNews: SubmitFunction = () => {
		registerLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: RegisterVal }>;

			switch (status) {
				case 200:
					toast.success('Register', { description: msg });
					registerLoader = false;
					goto('/student', { noScroll: true });
					break;

				case 400:
					formErrors = errors;
					registerLoader = false;
					break;

				case 401:
					formErrors = null;
					toast.error('Register', { description: msg });
					registerLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<div class=" lg:px-[5rem]">
	<form
		method="post"
		action="?/registerAction"
		use:enhance={registerActionNews}
		class="lg: mx-auto grid w-full grid-cols-1 gap-[15px] rounded-lg bg-[#ffffff] p-[2rem] dark:bg-black"
	>
		<div class="text-center lg:text-left">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Register</h3>
			<p class="text-sm text-muted-foreground">Register in to HIV Awareness</p>
		</div>

		<div class="flex w-full flex-col gap-1.5">
			<Label for="firstName">First Name</Label>
			<Input
				name="firstName"
				disabled={registerLoader}
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
				disabled={registerLoader}
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
				disabled={registerLoader}
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
			<Birthday disabled={registerLoader} bind:value={birthDayVal} />
			{#each formErrors?.birthDay ?? [] as errorMsg}
				<p class="text-sm text-red-500">{errorMsg}</p>
			{/each}
		</div>

		<div class="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
			<div class="flex w-full flex-col gap-1.5">
				<Label for="yearLevel">Year Level</Label>
				<Input
					name="yearLvl"
					disabled={registerLoader}
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
					disabled={registerLoader}
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
				disabled={registerLoader}
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
				disabled={registerLoader}
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
				disabled={registerLoader}
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
				disabled={registerLoader}
				type="password"
				id="confirmPassword"
				placeholder="Confirm your password"
			/>
			{#each formErrors?.confirmPassword ?? [] as errorMsg}
				<p class="text-sm text-red-500">{errorMsg}</p>
			{/each}
		</div>

		<Button disabled={registerLoader} type="submit">Register</Button>
	</form>

	<div class="mx-auto mt-[30px] max-w-fit rounded-lg bg-white dark:bg-black">
		<Button variant="link" href="/">Log in here</Button>
	</div>
</div>
