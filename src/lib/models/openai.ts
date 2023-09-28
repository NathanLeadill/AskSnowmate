type Message = {
	role: 'user' | 'assistant' | 'system';
	content: string;
};
type ElementType = 'a' | 'p' | 'h1' | 'h2' | 'div';
type TicketTypes = 'Adult' | 'Child' | 'Infant';

type Element = {
	type: ElementType;
	content: string;
	props: {
		href?: unknown;
	};
};

type ActivityOpeningHours = {
	fromTime: string;
	toTime: string;
};

type TicketCategory = {
	ticketCategoryId: string;
	name: string;
	minSeats: number;
	maxSeats: number;
	availableCapacity: number;
	price: {
		type: string;
		amount: number;
		currency: string;
	};
	type: TicketTypes;
	ageLimit: {
		minAge: number;
		maxAge: number;
	};
};

type BookingItemTicketCategory = {
	ticketCategory: string;
	count: number;
};

type BookingItem = {
	activityId: string;
	optionId: string;
	date: string;
	ticketCategories: BookingItemTicketCategory[];
};

type GuestAddon = {
	id: string;
	quantity: number;
};

type AdditionalField = {
	key: string;
	value: string;
};

type ContactInformation = {
	fullName: string;
	emailAddress: string;
	phoneNumber: string;
};

type Guest = {
	firstName: string;
	lastName: string;
	emailAddress: string;
	phoneNumber: string;
	country: string;
	nationality: string;
	gender: 'M' | 'F';
	addons: GuestAddon[];
	additionalFields: AdditionalField[];
};

type AvailableActivity = {
	supplierId: string;
	activityId: string;
	optionId: string;
	localDate: string;
	localTime: string;
	openingHours: ActivityOpeningHours[];
	availableCapacity: number;
	maximumCapacity: number;
	canBeBookedAfterStartTime: boolean;
};

export type { Message, Element, ElementType, BookingItem, Guest };
