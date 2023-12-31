import { jsonResponse } from '$lib/helpers';

export async function POST({ cookies }): Promise<Response> {
	cookies.set('session', '', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 0
	});
	return jsonResponse({ message: 'Successful Signout', status: 'success' }, 200);
}
