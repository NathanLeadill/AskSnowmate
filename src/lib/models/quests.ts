export type Quest = {
	id: string;
	country: string;
	city?: string;
	departureDate: string;
	returnDate: string;
	lengthOfStay: number;
	groupSize: number;
	accommodation: {
		type: string;
		minimumQuality: number;
	};
};
