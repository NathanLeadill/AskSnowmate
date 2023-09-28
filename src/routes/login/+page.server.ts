import { usersDB } from '$lib/database.js';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const email = (await data).get('email');
		const password = (await data).get('password');

		const user = usersDB.find((user) => user.email === email);

		if (user?.password === password) {
			cookies.set(
				'sessionId',
				JSON.stringify({
					email,
					name: 'Nathan TestAccount',
					quests: []
				}),
				{
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)
				}
			);
			return {
				success: true
			};
		}
		return {
			success: false
		};
	}
};
