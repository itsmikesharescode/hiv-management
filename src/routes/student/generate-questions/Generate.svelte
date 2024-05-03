<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { questionArray, hivFreeArray, possibleHIV, slightHIV } from './questions';
	import { LoaderCircle } from 'lucide-svelte';
	import { MoveLeft, Check } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import type { Question, ResultModel } from '$lib/types';
	import { calculatePercentage } from '$lib/helpers';
	import { Confetti } from 'svelte-confetti';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getUserState } from '$lib';
	import { toast } from 'svelte-sonner';
	import { fade, fly, scale } from 'svelte/transition';
	import Typewriter, { cascade, concurrent, scramble } from 'svelte-typewriter';

	const userState = getUserState();

	let dataOfYes: Question[] = [];
	let dataOfNo: Question[] = [];
	let contains: 'yes' | 'no' | undefined = undefined;
	let initialStep = 0;
	let hideButtons = true;

	// function for yes answer question
	const yesAnswer = async () => {
		hideButtons = true;
		dataOfYes.push(questionArray[initialStep]);
		dataOfYes = dataOfYes;
		contains = 'yes';
		initialStep++;
	};

	// function for no answer question
	const noAnswer = async () => {
		hideButtons = true;
		dataOfNo.push(questionArray[initialStep]);
		dataOfNo = dataOfNo;
		contains = 'no';
		initialStep++;
	};

	// navigate to prev question
	const navigateBack = async () => {
		hideButtons = true;
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
		hideButtons = true;
		initialStep = 0;
		dataOfYes = [];
		dataOfNo = [];
	};

	let resultSubmitLoader = false;
	const submitResultActionNews: SubmitFunction = () => {
		resultSubmitLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('Result Submittion', { description: msg });
					resultSubmitLoader = false;
					break;

				case 401:
					toast.error('Result Submittion', { description: msg });
					resultSubmitLoader = false;
					break;
			}
			await update();
		};
	};
</script>

{#if initialStep + 1 > questionArray.length}
	<div class="overflow-hidden" in:scale={{ duration: 1000 }}>
		<Card.Root>
			<Card.Header class="relative flex items-center justify-center py-[5rem]">
				{#if Math.round(calculatePercentage(dataOfYes, dataOfNo)) === 0}
					<Confetti
						xSpread={5}
						y={[0, 2]}
						delay={[500, 2000]}
						infinite
						duration={5000}
						amount={1000}
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
				<div class="w-full sm:max-w-fit" in:fly={{ delay: 1000, duration: 500, x: 100 }}>
					<form
						method="post"
						action="?/submitResultAction"
						use:enhance={submitResultActionNews}
						class="w-full sm:max-w-fit"
					>
						<input
							name="studentAnswers"
							type="hidden"
							value={JSON.stringify({
								userId: $userState?.id,
								percentage: Math.round(calculatePercentage(dataOfYes, dataOfNo))
							})}
						/>
						<Button
							disabled={resultSubmitLoader}
							type="submit"
							class="flex w-full items-center gap-[10px] sm:max-w-fit"
						>
							{#if resultSubmitLoader}
								Please wait... <LoaderCircle class="h-[15px] w-[15px] animate-spin" />
							{:else}
								Submit Result
							{/if}
						</Button>
					</form>
				</div>

				<div class="w-full sm:max-w-fit" in:fly={{ delay: 1000, duration: 500, x: -100 }}>
					<Button disabled={resultSubmitLoader} class="w-full sm:max-w-fit" on:click={reAnswer}
						>Re-answer</Button
					>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
{:else}
	<Card.Root class="">
		<Card.Header>
			<Card.Title class="text-[1rem] sm:text-[1.5rem] md:text-[2rem]">
				Do you have <b class="text-red-500 underline">{questionArray[initialStep].title}</b> ?
			</Card.Title>

			<Card.Description class="grid grid-cols-1 gap-[2rem] text-[1rem] sm:text-[1.2rem]">
				<div class="" in:fade={{ duration: 400 }}>
					<Typewriter interval={0} on:done={() => (hideButtons = false)}>
						<p>
							{questionArray[initialStep].description}
						</p>
					</Typewriter>
				</div>
				{#key questionArray[initialStep]}
					<div class="" in:fade>
						<Avatar.Root class="h-[400px] w-full rounded-lg">
							<Avatar.Image src={questionArray[initialStep].photo_link} alt="@hiv" />
							<Avatar.Fallback>hiv photo</Avatar.Fallback>
						</Avatar.Root>
					</div>
				{/key}
			</Card.Description>
		</Card.Header>

		<Card.Footer class="flex flex-wrap justify-between gap-[10px]">
			{#if !hideButtons}
				{#if initialStep > 0}
					<div class="w-full md:max-w-fit" in:fly={{ x: 50, duration: 100 }}>
						<Button class="flex w-full items-center gap-[10px] md:max-w-fit" on:click={navigateBack}
							><MoveLeft /> Prev</Button
						>
					</div>
				{:else}
					<div class=""></div>
				{/if}

				<div class="flex w-full items-center gap-[10px] md:max-w-fit">
					<div class="w-full" in:fly={{ x: 100, duration: 300 }}>
						<Button class="flex w-full items-center gap-[10px]" on:click={yesAnswer}
							><Check /> Yes</Button
						>
					</div>
					<div class="w-full" in:fly={{ x: -100, duration: 300 }}>
						<Button class="flex w-full items-center gap-[10px]" on:click={noAnswer}
							><Check /> No</Button
						>
					</div>
				</div>
			{/if}
		</Card.Footer>
	</Card.Root>
{/if}
