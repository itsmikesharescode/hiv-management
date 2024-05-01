<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	let formErrors: { email: string[] } | null = null;
	let resetPassLoader = false;

	const resetPassActionNews: SubmitFunction = () => {
		resetPassLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: { email: string[] } }>;

			switch (status) {
				case 200:
					toast.success('Forgot Password', { description: msg });
					resetPassLoader = false;
					break;

				case 400:
					formErrors = errors;
					resetPassLoader = false;
					break;

				case 401:
					toast.success('Forgot Password', { description: msg });
					resetPassLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<form
	method="post"
	action="?/resetPassAction"
	use:enhance={resetPassActionNews}
	class=" lg:px-[5rem]"
>
	<div
		class="lg: mx-auto grid w-full grid-cols-1 gap-[15px] rounded-lg bg-[#ffffff] p-[2rem] dark:bg-black lg:w-[350px]"
	>
		<div class="text-center">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Forgot Password</h3>
			<p class="text-sm text-muted-foreground">
				We will send an password reset link to your email.
			</p>
		</div>
		<div class="flex w-full flex-col gap-1.5">
			<Label for="email">Email</Label>
			<Input
				disabled={resetPassLoader}
				name="email"
				type="email"
				id="email"
				placeholder="Enter your email"
			/>
			{#each formErrors?.email ?? [] as errorMsg}
				<p class="text-sm text-red-500">{errorMsg}</p>
			{/each}
		</div>

		<Button disabled={resetPassLoader} type="submit">
			{#if resetPassLoader}
				Sending ...
			{:else}
				Send Password Link
			{/if}
		</Button>
	</div>

	<div class="mx-auto mt-[30px] max-w-fit rounded-lg bg-white dark:bg-black">
		<Button variant="link" href="/">Log in here</Button>
	</div>
</form>
