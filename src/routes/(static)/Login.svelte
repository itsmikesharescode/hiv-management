<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	type LoginVal = {
		email: string[];
		password: string[];
	};

	let formErrors: LoginVal | null = null;
	let loginLoader = false;

	const loginActionNews: SubmitFunction = () => {
		loginLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: LoginVal }>;

			switch (status) {
				case 200:
					toast.success('Log in', { description: msg });
					loginLoader = false;
					goto('/student', { noScroll: true });
					break;

				case 400:
					formErrors = errors;
					loginLoader = false;
					break;

				case 401:
					formErrors = null;
					toast.error('Log in', { description: msg });
					loginLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<div class="absolute right-0 top-0 m-[2rem] rounded-lg bg-white dark:bg-black">
	<Button variant="link" href="/?search=register">Register here</Button>
</div>

<div class=" lg:px-[5rem]">
	<form
		method="post"
		action="?/loginAction"
		use:enhance={loginActionNews}
		class="lg: mx-auto grid w-full grid-cols-1 gap-[15px] rounded-lg bg-[#ffffff] p-[2rem] dark:bg-black lg:w-[350px]"
	>
		<div class="text-center">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Log in your account</h3>
			<p class="text-sm text-muted-foreground">Log in to HIV Awareness</p>
		</div>
		<div class="flex w-full flex-col gap-1.5">
			<Label for="email">Email</Label>
			<Input
				disabled={loginLoader}
				name="email"
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
				disabled={loginLoader}
				name="password"
				type="password"
				id="password"
				placeholder="Enter your password"
			/>
			{#each formErrors?.password ?? [] as errorMsg}
				<p class="text-sm text-red-500">{errorMsg}</p>
			{/each}
		</div>

		<Button disabled={loginLoader} type="submit">
			{#if loginLoader}
				Logging in
			{:else}
				Log in
			{/if}
		</Button>
	</form>

	<div class="mx-auto mt-[30px] max-w-fit rounded-lg bg-white dark:bg-black">
		<Button variant="link" href="/?search=forgotpassword">Forgot password</Button>
	</div>
</div>
