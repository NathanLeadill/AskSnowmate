<script lang="ts">
	import { makeOpenAIRequest } from '$lib/openai/prompt';
	async function test() {
		const { choices } = await makeOpenAIRequest('', '4', [
			{
				role: 'system',
				content:
					"Your name is snowmate, you are a helpful travel assistant. \n\nBelow is an itinerary for a user who wishes to go on holiday. The user will input messages to change parts of this itinerary.\n\n\nDay 1: 2023-09-08\\n\\nAccommodation: Check-in at the Radisson Blu Waterfront Hotel, Stockholm. This 4-star hotel is located in the heart of Stockholm and offers stunning views of the city and waterfront.\\n[[https://www.radissonhotels.com/en-us/hotels/radisson-blu-stockholm-waterfront]]\\n\\nActivity 1: Visit the Vasa Museum, a maritime museum in Stockholm. The museum displays the only almost fully intact 17th century ship that has ever been salvaged, the 64-gun warship Vasa that sank on her maiden voyage in 1628.\\n[[https://www.vasamuseet.se/en]]\\n\\nActivity 2: Explore Moderna Museet, a state museum for modern and contemporary art located on the island of Skeppsholmen in central Stockholm.\\n[[https://www.modernamuseet.se/stockholm/en/]]...\\n\\nDay 2: 2023-09-09\\n\\nActivity 1: Visit Fotografiska, a centre for contemporary photography in Stockholm. The museum offers an interesting mix of exhibitions featuring both Swedish and international photographers.\\n[[https://www.fotografiska.com/sto/]]\\n\\nActivity 2: Explore Skansen, an open-air museum and zoo located on Djurgården Island. It's a great place to learn about traditional Swedish culture and history.\\n[[https://www.skansen.se/en/]]...\\n\\nDay 3: 2023-09-10\\n\\nActivity 1: Visit ABBA The Museum, an interactive exhibition about the pop-band ABBA that is located on Djurgården Island.\\n[[https://abbathemuseum.com/en/]]\\n\\nActivity 2: Explore Nationalmuseum, Sweden's premier museum of art and design. The collections comprise older paintings, sculpture, drawings and graphic art, and applied art and design up to present day.\\n[[http://www.nationalmuseum.se/]]...\\n\\nAccommodation: Check-out from Radisson Blu Waterfront Hotel."
			},
			{
				role: 'user',
				content: 'I wish to stay at a different hotel'
			}
		]);
		console.log('choices', choices);
	}
</script>

<button on:click={test}>Test</button>
