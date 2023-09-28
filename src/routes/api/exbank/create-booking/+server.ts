import { jsonResponse } from '$lib/helpers.js';
import { PRIVATE_EXPERIENCEBANK_PUBLIC_KEY } from '$env/static/private';
import { PRIVATE_EXPERIENCEBANK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_SUPPLIER_ID } from '$env/static/public';
import { generateAuthorisationString } from '$lib/utils.js';
import type { BookingItem } from '$lib/models/openai.js';

// This function will fetch all activities given specific parameters
export async function GET({ request }): Promise<Response> {
	const { bookingItems }: { bookingItems: BookingItem } = await request.json();

	const authorisationHeader = generateAuthorisationString(
		PRIVATE_EXPERIENCEBANK_PUBLIC_KEY,
		PRIVATE_EXPERIENCEBANK_SECRET_KEY,
		{
			jsonrpc: '2.0',
			method: 'booking.create',
			params: {
				supplierId: PUBLIC_SUPPLIER_ID,
				bookingItems: []
			},
			id: 1
		}
	);

	const exReq = await fetch('https://api.experiencebank.io', {
		headers: {
			Authorization: authorisationHeader,
			'Content-Type': 'application/json'
		}
	});
	const exRes = await exReq.json();
	return jsonResponse({ exRes }, 200);
}
