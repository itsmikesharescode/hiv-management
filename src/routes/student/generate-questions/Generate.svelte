<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { questionArray } from './questions';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { MoveLeft, Check } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import type { Question } from '$lib/types';

	$: currentSearch = Number($page.url.search.slice(8)) + 1;
	let dataOfYes: Question[] = [];
	let dataOfNo: Question[] = [];
	let contains: 'yes' | 'no' | undefined = undefined;

	const yesAnswer = async () => {
		if (questionArray.length + 1 === currentSearch) return console.log('done');

		dataOfYes.push(questionArray[currentSearch - 2]);
		dataOfYes = dataOfYes;
		console.log(dataOfYes);
		contains = 'yes';
		goto(`/student?search=${currentSearch++}`, { noScroll: true });
	};

	const noAnswer = () => {
		if (questionArray.length + 1 === currentSearch) return console.log('done');

		dataOfNo.push(questionArray[currentSearch - 2]);
		dataOfNo = dataOfNo;
		console.log(dataOfNo);
		contains = 'no';
		goto(`/student?search=${currentSearch++}`, { noScroll: true });
	};

	const navigateBack = () => {
		let currentSearch = Number($page.url.search.slice(8));

		if (contains === 'yes') {
			dataOfYes.pop();
			dataOfYes = dataOfYes;
			console.log(dataOfYes);
		} else if (contains === 'no') {
			dataOfNo.pop();
			dataOfNo = dataOfNo;
			console.log(dataOfNo);
		}

		goto(`/student?search=${currentSearch - 1}`, { noScroll: true });
	};
</script>

<Card.Root class="">
	<Card.Header>
		<Card.Title class="text-[1rem] sm:text-[1.5rem] md:text-[2rem]">
			Do you have <b class="text-red-500 underline"
				>{questionArray[Number($page.url.search.slice(8)) - 1].title}</b
			> ?
		</Card.Title>

		<Card.Description class="grid grid-cols-1 gap-[2rem] text-[1rem] sm:text-[1.2rem]">
			{questionArray[Number($page.url.search.slice(8)) - 1].description}
			<Avatar.Root class="h-[400px] w-full rounded-lg">
				<Avatar.Image
					src={questionArray[Number($page.url.search.slice(8)) - 1].photo_link}
					alt="@hiv"
				/>
				<Avatar.Fallback>hiv photo</Avatar.Fallback>
			</Avatar.Root>
		</Card.Description>
	</Card.Header>

	<Card.Footer class="flex flex-wrap justify-between gap-[10px]">
		{#if Number($page.url.search.slice(8)) - 1 > 0}
			<Button class="flex w-full items-center gap-[10px] md:max-w-fit" on:click={navigateBack}
				><MoveLeft /> Prev</Button
			>
		{:else}
			<div class=""></div>
		{/if}

		<div class="flex w-full items-center gap-[10px] md:max-w-fit">
			<Button class="flex w-full items-center gap-[10px]" on:click={yesAnswer}><Check /> Yes</Button
			>
			<Button class="flex w-full items-center gap-[10px]" on:click={noAnswer}><Check /> No</Button>
		</div>
	</Card.Footer>
</Card.Root>
