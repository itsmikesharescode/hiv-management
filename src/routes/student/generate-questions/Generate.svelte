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

	let dataOfYes: Question[] = [];
	let dataOfNo: Question[] = [];
	let contains: 'yes' | 'no' | undefined = undefined;
	let initialStep = 0;

	// function for yes answer question
	const yesAnswer = async () => {
		dataOfYes.push(questionArray[initialStep]);
		dataOfYes = dataOfYes;
		contains = 'yes';
		initialStep++;
		console.log(dataOfYes);
	};

	// function for no answer question
	const noAnswer = async () => {
		dataOfNo.push(questionArray[initialStep]);
		dataOfNo = dataOfNo;
		contains = 'no';
		initialStep++;
		console.log(dataOfNo);
	};

	// navigate to prev question
	const navigateBack = async () => {
		if (contains === 'yes') {
			dataOfYes.pop();
			dataOfYes = dataOfYes;
			initialStep--;
		} else if (contains === 'no') {
			dataOfNo.pop();
			dataOfNo = dataOfNo;
			initialStep--;
		}
	};

	// generate text based in output
	const generateText = (percentage: number) => {
		if (percentage === 0)
			return hivFreeArray[Math.round(Math.random() * hivFreeArray.length - 0.5)];
		else if (percentage <= 49) return slightHIV[Math.round(Math.random() * slightHIV.length - 0.5)];
		else if (percentage > 50)
			return possibleHIV[Math.round(Math.random() * possibleHIV.length - 0.5)];
	};

	//clean up
	const reAnswer = async () => {
		initialStep = 0;
		dataOfYes = [];
		dataOfNo = [];
	};
</script>

{#if initialStep + 1 > questionArray.length}
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
			<form>
				<Button class="w-full sm:max-w-fit">Submit Result</Button>
			</form>

			<Button class="w-full sm:max-w-fit" on:click={reAnswer}>Re-answer</Button>
		</Card.Footer>
	</Card.Root>
{:else}
	<Card.Root class="">
		<Card.Header>
			<Card.Title class="text-[1rem] sm:text-[1.5rem] md:text-[2rem]">
				Do you have <b class="text-red-500 underline">{questionArray[initialStep].title}</b> ?
			</Card.Title>

			<Card.Description class="grid grid-cols-1 gap-[2rem] text-[1rem] sm:text-[1.2rem]">
				{questionArray[initialStep].description}
				<Avatar.Root class="h-[400px] w-full rounded-lg">
					<Avatar.Image src={questionArray[initialStep].photo_link} alt="@hiv" />
					<Avatar.Fallback>hiv photo</Avatar.Fallback>
				</Avatar.Root>
			</Card.Description>
		</Card.Header>

		<Card.Footer class="flex flex-wrap justify-between gap-[10px]">
			{#if initialStep > 0}
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
