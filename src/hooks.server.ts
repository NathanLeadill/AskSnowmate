export async function handle({ event, resolve }) {
	event.locals.user = JSON.parse(event.cookies.get('sessionId'));

	const response = await resolve(event);
	response.headers.set('x-custom-header', 'test-header');

	return response;
}
