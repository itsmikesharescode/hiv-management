<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { questionArray } from './questions';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { MoveLeft, Check } from 'lucide-svelte';

	const checkAnswer = () => {
		let currentSearch = Number($page.url.search.slice(8)) + 1;

		if (questionArray.length + 1 === currentSearch) return console.log('done');

		goto(`/student?search=${currentSearch++}`);
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-[1rem] sm:text-[1.5rem] md:text-[2rem]">
			Do you have <b class="text-red-500 underline"
				>{questionArray[Number($page.url.search.slice(8)) - 1].title}</b
			> ?
		</Card.Title>

		<Card.Description class="text-[1rem] sm:text-[1.2rem]">
			{questionArray[Number($page.url.search.slice(8)) - 1].description}
		</Card.Description>
	</Card.Header>

	<Card.Footer class="flex justify-between gap-[10px]">
		<Button class="flex items-center gap-[10px]"><MoveLeft /> Prev</Button>
		<div class="flex items-center gap-[10px]">
			<Button class="flex items-center gap-[10px]" on:click={checkAnswer}><Check /> Yes</Button>
			<Button class="flex items-center gap-[10px]" on:click={checkAnswer}><Check /> No</Button>
		</div>
	</Card.Footer>
</Card.Root>
