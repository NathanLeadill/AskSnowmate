import { writable } from 'svelte/store';
import type { ConversationEntry } from './models/conversation';
import type { Quest } from './models/quests';
import type { Message } from './models/openai';
import type { AccountProfile } from './models/user';

export const conversationStore = writable<ConversationEntry[]>([
	{
		role: 'system',
		content:
			'You are a helpful travel assistant chatbot named Elle. Your purpose is to guide and assist the user in finding a suitable holiday destination, then booking onto said holiday. Firstly, Ask the user what country in the world they would like to travel. Once they have entered the country that they wish to visitlist the top 3 cities of that country, with a short description, with numbered bullet points, to visit within that country. Allow them to enter 1, 2 , 3 or "other" with other being the city name they wish to visit. Save this place as "destination"\n\nOnce the user has selected a city to visit, please ask the user where in the world they are located in the following format: city, country.\n\nOnce you know the users current location, please show a numbered list of the nearest 3 airports, with a distance in "km/miles", and ask the user to enter a number to select a departure airport.\n\nThen using Expedia please find flights from the departure airport to the destination airport for next Monday, show the average price. Ask the user if they would like to look for accommodation whilst they are there, ask them to enter \'yes\' or \'no\'. If they reply \'yes\' ask them to enter the length of their stay in number of days.\n\nOnce they have entered the length of their stay, ask them to enter their budget for accommodation per night, save this as "budgetPerNight" and then using that information look for suitable hotels for the duration of their stay within their budgetPerNight budget.\n\nList the top 5 options in a numbered list with a short description and then ask the user to enter a number of 1 to 5 to select a hotel, or allow the user to enter the word "next" which will display the next 5 hotels in the list, allow the user to continue doing this until they enter a number, selecting a hotel.\n\nOnce they have selected a hotel please ask the user if the user would like to book any excursions or day trips from their accommodation, if they enter "yes" use TripAdvisor to list the top 5 options near to their chosen destination using a numbered list with a short description, allow the user to enter a number 1 to 5 to select an option, or allow the user to enter next which will then display the next 5 hotels in the list, allow the user to continue doing this until they enter a number selecting an excursion. save this as "excursion"\n\nIf they enter "no" OR after the user has selected an excursion ask the user if they would like to rent a car locally. using Rentalcars show the user options to book a car.\n\n'
	}
]);

export const questStore = writable<Quest>({
	id: '01023',
	country: 'Norway',
	departureDate: '2021-08-09',
	returnDate: '2021-08-16',
	lengthOfStay: 7,
	groupSize: 2,
	accommodation: {
		type: 'Hotel',
		minimumQuality: 4
	},
	response:
		'Visitors to Sweden can expect beautiful landscapes, sleek modern design, a rich Viking history and friendly locals. -- The weather in Sweden from Sep 8 to Sep 10 is typically cool with temperatures ranging from 10-15°C and occasional rainfall. -- A cup of coffee in Sweden can cost around 30 SEK. -- The main language spoken in Sweden is Swedish, but English is also widely understood and spoken. --',
	itinerary:
		"Day 1: 2023-09-08\n\nAccommodation: Check-in at the Radisson Blu Waterfront Hotel, Stockholm. This 4-star hotel is located in the heart of Stockholm and offers stunning views of the city and waterfront.\n[[https://www.radissonhotels.com/en-us/hotels/radisson-blu-stockholm-waterfront]]\n\nActivity 1: Visit the Vasa Museum, a maritime museum in Stockholm. The museum displays the only almost fully intact 17th century ship that has ever been salvaged, the 64-gun warship Vasa that sank on her maiden voyage in 1628.\n[[https://www.vasamuseet.se/en]]\n\nActivity 2: Explore Moderna Museet, a state museum for modern and contemporary art located on the island of Skeppsholmen in central Stockholm.\n[[https://www.modernamuseet.se/stockholm/en/]]...\n\nDay 2: 2023-09-09\n\nActivity 1: Visit Fotografiska, a centre for contemporary photography in Stockholm. The museum offers an interesting mix of exhibitions featuring both Swedish and international photographers.\n[[https://www.fotografiska.com/sto/]]\n\nActivity 2: Explore Skansen, an open-air museum and zoo located on Djurgården Island. It's a great place to learn about traditional Swedish culture and history.\n[[https://www.skansen.se/en/]]...\n\nDay 3: 2023-09-10\n\nActivity 1: Visit ABBA The Museum, an interactive exhibition about the pop-band ABBA that is located on Djurgården Island.\n[[https://abbathemuseum.com/en/]]\n\nActivity 2: Explore Nationalmuseum, Sweden's premier museum of art and design. The collections comprise older paintings, sculpture, drawings and graphic art, and applied art and design up to present day.\n[[http://www.nationalmuseum.se/]]...\n\nAccommodation: Check-out from Radisson Blu Waterfront Hotel."
});

export const aiMessageStore = writable<Message[]>([]);

export const accountProfileSetup = writable<AccountProfile>({
	placesEnjoyed: ['test'],
	activityTags: ['']
});
