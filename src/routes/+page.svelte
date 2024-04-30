<script lang="ts">
	import front_image_hiv from '$lib/assets/front_image_hiv.png';
	import front_image_hiv2 from '$lib/assets/front_image_hiv2.png';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { page } from '$app/stores';
	import Login from './(static)/Login.svelte';
	import Register from './(static)/Register.svelte';
	import ResetPass from './(static)/ResetPass.svelte';

	$: console.log($page.url.search);
</script>

<div class=" grid min-h-screen grid-cols-1 md:grid-cols-2">
	<div class="hidden flex-col bg-black p-[2rem] md:flex">
		<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight text-white">
			HIV AWARENESS DATABASE MANAGEMENT SYSTEM
		</h3>
		<div class="grid-rows-[1fr,1fr ] mt-[5rem] gap-[10px] md:grid">
			<div class="">
				<Avatar.Root class="h-[500px] w-full rounded-lg ">
					<Avatar.Image src={front_image_hiv} alt="@shadcn" />
					<Avatar.Fallback class="rounded-lg">HIV</Avatar.Fallback>
				</Avatar.Root>
			</div>

			<div class="mt-[5rem] flex items-center">
				<p class="leading-7 text-white [&:not(:first-child)]:mt-6">
					Human Immunodeficiency Virus (HIV) targets the immune system of the body. AIDS, or
					acquired immunodeficiency syndrome, is the disease's most advanced stage.HIV attacks white
					blood cells in the body, impairing immunity. This increases the risk of contracting
					infections, some malignancies, and diseases like tuberculosis. HIV can spread through
					bodily fluids such as blood, breast milk, semen, and vaginal secretions from an infected
					individual. It cannot be transmitted by sharing meals, hugs, or kisses. Additionally, it
					can pass from a mother to her child. Antiretroviral therapy is a treatment and prevention
					strategy for HIV (ART). HIV can develop into AIDS if left untreated, frequently years
					later.
				</p>
			</div>
		</div>
	</div>

	<div class="login grid grid-cols-1 items-center">
		{#if $page.url.search === '?search=register'}
			<Register />
		{:else if $page.url.search === '?search=forgotpassword'}
			<ResetPass />
		{:else}
			<Login />
		{/if}
	</div>
</div>

<style>
	.login {
		border: 2px solid black;
		padding: 25px;
		background: url($lib/assets/front_image_hiv2.png);
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
