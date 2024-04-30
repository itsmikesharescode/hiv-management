<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
</script>

<div class="absolute right-0 top-0 m-[2rem] rounded-lg bg-white">
	<Button variant="link" href="/?search=register">Register here</Button>
</div>

<div class=" lg:px-[5rem]">
	<div
		class="lg: mx-auto grid w-full grid-cols-1 gap-[15px] rounded-lg bg-[#ffffff] p-[2rem] lg:w-[350px]"
	>
		<div class="text-center">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Log in your account</h3>
			<p class="text-sm text-muted-foreground">Log in to HIV Awareness</p>
		</div>
		<div class="flex w-full flex-col gap-1.5">
			<Label for="email">Email</Label>
			<Input type="email" id="email" placeholder="Enter your email" />
		</div>

		<div class="flex w-full flex-col gap-1.5">
			<Label for="password">Password</Label>
			<Input type="password" id="password" placeholder="Enter your password" />
		</div>

		<Button>Log in</Button>
	</div>

	<div class="mx-auto mt-[30px] max-w-fit rounded-lg bg-white">
		<Button variant="link" href="/?search=forgotpassword">Forgot password</Button>
	</div>
</div>
