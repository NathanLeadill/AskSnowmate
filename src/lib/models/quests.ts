export type Quest = {
	id: string;
	country: string;
	city?: string;
	departureDate: Date;
	returnDate: Date;
	lengthOfStay: number;
	groupSize: number;
	accommodation: {
		type: string;
		minimumQuality: number;
	};
	response?: unknown;
	itinerary?: string;
};
