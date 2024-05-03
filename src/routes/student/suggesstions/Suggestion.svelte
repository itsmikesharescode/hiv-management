<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { flip } from 'svelte/animate';
	import { suggestions } from './generatedtext';
	import { RefreshCw } from 'lucide-svelte';
	import Typewriter, { cascade, concurrent, scramble } from 'svelte-typewriter';

	let randomIndex = 0;
	let loader = false;
	const generateSuggestions = () => {
		animateLoading();
		let newIndex = 0;
		do {
			newIndex = Math.round(Math.random() * (suggestions.length - 1));
		} while (newIndex === randomIndex);
		randomIndex = newIndex;
	};

	const animateLoading = () => {
		loader = true;
		setTimeout(() => (loader = false), 800);
	};
</script>

<div class="flex justify-end">
	<Button on:click={generateSuggestions} class="flex items-center gap-[10px]"
		>More Suggestions <RefreshCw class={loader ? 'animate-spin' : ''} /></Button
	>
</div>
<div class="grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-3">
	{#each suggestions[randomIndex] as suggestion (suggestion.id)}
		<div class="grid" animate:flip={{ duration: 920 }}>
			<Card.Root>
				<Card.Header>
					<Card.Title>{suggestion.title}</Card.Title>
				</Card.Header>
				<Card.Content>
					<Typewriter interval={0}>
						<p>
							{suggestion.definition}
						</p>
					</Typewriter>
				</Card.Content>
			</Card.Root>
		</div>
	{/each}
</div>
