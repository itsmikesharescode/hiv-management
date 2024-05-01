<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
</script>

<div class=" lg:px-[5rem]">
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
			<Input type="email" id="email" placeholder="Enter your email" />
		</div>

		<Button>Send Password Link</Button>
	</div>

	<div class="mx-auto mt-[30px] max-w-fit rounded-lg bg-white dark:bg-black">
		<Button variant="link" href="/">Log in here</Button>
	</div>
</div>
