<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Birthday from './Birthday.svelte';
	import { toast } from 'svelte-sonner';
	import type { ResultModel } from '$lib/types';
	import type { DateValue } from '@internationalized/date';
	import { enhance } from '$app/forms';
	import { calculateAge } from '$lib/helpers';

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
					toast.success('Log in', { description: msg });
					registerLoader = false;
					break;

				case 400:
					formErrors = errors;
					registerLoader = false;
					break;

				case 401:
					formErrors = null;
					toast.error('Log in', { description: msg });
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
		<div class="grid grid-cols-1 gap-[20px] lg:grid-cols-[1fr,1fr,1fr]">
			<div class="flex w-full flex-col gap-1.5">
				<Label for="firstName">First Name</Label>
				<Input
					name="firstName"
					disabled={registerLoader}
					type="text"
					id="firstName"
					placeholder="Enter your first name"
				/>
			</div>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="middleName">Middle Name</Label>
				<Input
					name="middleName"
					disabled={registerLoader}
					type="text"
					id="middleName"
					placeholder="Enter your middle name"
				/>
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
			</div>
		</div>

		<div class="flex w-full flex-col gap-1.5">
			<Label for="age">Birthday</Label>
			<input
				name="birthDay"
				type="hidden"
				value={`${birthDayVal?.month} ${birthDayVal?.day}, ${birthDayVal?.year}`}
			/>
			<input name="age" type="hidden" value={calculateAge(birthDayVal)} />
			<Birthday disabled={registerLoader} />
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
		</div>

		<Button disabled={registerLoader} type="submit">Register</Button>
	</form>

	<div class="mx-auto mt-[30px] max-w-fit rounded-lg bg-white dark:bg-black">
		<Button variant="link" href="/">Log in here</Button>
	</div>
</div>
