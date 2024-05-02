<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { suggestions } from './generatedtext';
</script>

<div class="grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-3">
	{#each suggestions[Math.round(Math.random() * (suggestions.length - 1))] as suggestion}
		<Card.Root>
			<Card.Header>
				<Card.Title>{suggestion.title}</Card.Title>
			</Card.Header>
			<Card.Content>
				<p>
					{suggestion.definition}
				</p>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
