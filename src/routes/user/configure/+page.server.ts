export const actions = {
	default: async ({ request }) => {
		console.log('YOUTUBE', request);
		const data = await request.formData();
		console.log('Data: ', data, JSON.stringify(data));
	}
};
