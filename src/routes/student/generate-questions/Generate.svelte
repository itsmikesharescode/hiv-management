<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { questionArray, hivFreeArray, possibleHIV, slightHIV } from './questions';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { MoveLeft, Check } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import type { Question } from '$lib/types';
	import { calculatePercentage } from '$lib/helpers';
	import { Confetti } from 'svelte-confetti';

	$: currentSearch = Number($page.url.search.slice(8)) + 1;
	let dataOfYes: Question[] = [];
	let dataOfNo: Question[] = [];
	let contains: 'yes' | 'no' | undefined = undefined;

	const yesAnswer = async () => {
		dataOfYes.push(questionArray[currentSearch - 2]);
		dataOfYes = dataOfYes;
		contains = 'yes';

		await goto(`/student?search=${currentSearch++}`, { noScroll: true });
	};

	const noAnswer = async () => {
		dataOfNo.push(questionArray[currentSearch - 2]);
		dataOfNo = dataOfNo;

		contains = 'no';
		await goto(`/student?search=${currentSearch++}`, { noScroll: true });
	};

	const navigateBack = async () => {
		let currentSearch = Number($page.url.search.slice(8));

		if (contains === 'yes') {
			dataOfYes.pop();
			dataOfYes = dataOfYes;
		} else if (contains === 'no') {
			dataOfNo.pop();
			dataOfNo = dataOfNo;
		}

		await goto(`/student?search=${currentSearch - 1}`, { noScroll: true });
	};

	const generateText = (percentage: number) => {
		if (percentage === 0)
			return hivFreeArray[Math.round(Math.random() * hivFreeArray.length - 0.5)];
		else if (percentage <= 49) return slightHIV[Math.round(Math.random() * slightHIV.length - 0.5)];
		else if (percentage > 50)
			return possibleHIV[Math.round(Math.random() * possibleHIV.length - 0.5)];
	};

	const reAnswer = async () => {
		await goto('student?search=1', { noScroll: true });
	};
</script>

{#if currentSearch > questionArray.length + 1}
	<Card.Root>
		<Card.Header class="relative flex items-center justify-center py-[5rem]">
			{#if Math.round(calculatePercentage(dataOfYes, dataOfNo)) === 0}
				<Confetti
					xSpread={5}
					y={[0, 2]}
					delay={[500, 2000]}
					infinite
					duration={5000}
					amount={400}
					fallDistance="100vh"
				/>
			{/if}
			<Card.Title class="text-center text-[1rem] sm:text-[2rem] md:text-[3rem]"
				>{generateText(Math.round(calculatePercentage(dataOfYes, dataOfNo)))}</Card.Title
			>
			<Card.Description class="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[10rem]"
				>{Math.round(calculatePercentage(dataOfYes, dataOfNo))} %</Card.Description
			>
		</Card.Header>

		<Card.Footer class="flex flex-wrap items-center justify-end gap-[10px]">
			<Button class="w-full sm:max-w-fit">Submit Result</Button>
			<Button class="w-full sm:max-w-fit" on:click={reAnswer}>Re-answer</Button>
		</Card.Footer>
	</Card.Root>
{:else}
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
				<Button class="flex w-full items-center gap-[10px]" on:click={yesAnswer}
					><Check /> Yes</Button
				>
				<Button class="flex w-full items-center gap-[10px]" on:click={noAnswer}><Check /> No</Button
				>
			</div>
		</Card.Footer>
	</Card.Root>
{/if}
