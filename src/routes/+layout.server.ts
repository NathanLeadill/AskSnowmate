import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ locals, params, url }) => {
	if (url.pathname !== '/login') {
		if (!locals.user) {
			throw redirect(307, '/login');
		}

		return {
			user: locals.user
		};
	}
	return {
		user: locals.user
	};
}) satisfies LayoutServerLoad;
