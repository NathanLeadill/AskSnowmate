import { jsonResponse } from '$lib/helpers.js';
import { PRIVATE_EXPERIENCEBANK_PUBLIC_KEY } from '$env/static/private';
import { PRIVATE_EXPERIENCEBANK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_SUPPLIER_ID } from '$env/static/public';
import { generateAuthorisationString } from '$lib/utils.js';

// This function will fetch all activities given specific parameters
export async function GET({ request }): Promise<Response> {
	console.log('TEST');

	const authorisationHeader = generateAuthorisationString(
		PRIVATE_EXPERIENCEBANK_PUBLIC_KEY,
		PRIVATE_EXPERIENCEBANK_SECRET_KEY,
		{
			jsonrpc: '2.0',
			method: 'activity.find',
			params: {
				query: {
					supplierId: 'sup_ee9f3fbe-72b7-4677-8a91-a76c5325b635',
					cursor: null,
					activityIds: ['act_28f8a3d7-611d-47a2-a34c-16cc780745de'],
					categoryIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
				}
			},
			id: 1
		}
	);
	console.log('authorisationHeader', authorisationHeader);

	const exReq = await fetch('https://api.experiencebank.io', {
		headers: {
			Authorization: authorisationHeader,
			'Content-Type': 'application/json'
		}
	});
	const exRes = await exReq.json();
	return jsonResponse({ exRes }, 200);
}
