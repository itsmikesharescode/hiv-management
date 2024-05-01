<script lang="ts">
	import Generate from './generate-questions/Generate.svelte';
	import from_image_hiv2 from '$lib/assets/front_image_hiv2.png';
</script>

<img
	src={from_image_hiv2}
	alt=""
	class="student fixed bottom-0 left-0 right-0 top-0 -z-10 h-full w-full"
/>

<div class="z-20 flex min-h-screen items-center justify-center">
	<div class="w-full p-[2rem] md:w-[900px]">
		<Generate />
	</div>
</div>

<style>
	.student {
		filter: grayscale(50%);
	}
</style>
