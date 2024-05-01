<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import Birthday from './Birthday.svelte';
</script>

<div class=" lg:px-[5rem]">
	<div
		class="lg: mx-auto grid w-full grid-cols-1 gap-[15px] rounded-lg bg-[#ffffff] p-[2rem] dark:bg-black"
	>
		<div class="text-center lg:text-left">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Register</h3>
			<p class="text-sm text-muted-foreground">Register in to HIV Awareness</p>
		</div>
		<div class="grid grid-cols-1 gap-[20px] lg:grid-cols-[1fr,1fr,1fr]">
			<div class="flex w-full flex-col gap-1.5">
				<Label for="firstName">First Name</Label>
				<Input type="text" id="firstName" placeholder="Enter your first name" />
			</div>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="middleName">Middle Name</Label>
				<Input type="text" id="middleName" placeholder="Enter your middle name" />
			</div>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="lastName">Last Name</Label>
				<Input type="text" id="lastName" placeholder="Enter your last name" />
			</div>
		</div>

		<div class="flex w-full flex-col gap-1.5">
			<Label for="age">Birthday</Label>
			<Birthday />
		</div>

		<div class="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
			<div class="flex w-full flex-col gap-1.5">
				<Label for="yearLevel">Year Level</Label>
				<Input type="text" id="yearLevel" placeholder="Enter your year level" />
			</div>

			<div class="flex w-full flex-col gap-1.5">
				<Label for="section">Section</Label>
				<Input type="text" id="section" placeholder="Enter your section" />
			</div>
		</div>

		<div class="flex w-full flex-col gap-1.5">
			<Label for="department">Department</Label>
			<Input type="text" id="department" placeholder="Enter your department" />
		</div>

		<div class="flex w-full flex-col gap-1.5">
			<Label for="email">Email</Label>
			<Input type="email" id="email" placeholder="Enter your email" />
		</div>

		<div class="flex w-full flex-col gap-1.5">
			<Label for="password">Password</Label>
			<Input type="password" id="password" placeholder="Enter your password" />
		</div>

		<Button>Register</Button>
	</div>

	<div class="mx-auto mt-[30px] max-w-fit rounded-lg bg-white dark:bg-black">
		<Button variant="link" href="/">Log in here</Button>
	</div>
</div>
