import { jsonResponse } from '$lib/helpers';
import type { User } from '$lib/models/user.js';
import jwt from 'jsonwebtoken';

export async function POST({ request }): Promise<Response> {
	const { email, password } = await request.json();
	const token = await login(email, password);
	if (!token) {
		return jsonResponse({ message: 'Invalid username or password' }, 401);
	}
	return jsonResponse({ token }, 200);
}

async function login(email: string, password: string): Promise<User | false> {
	const token = jwt.sign({ email, password }, 'SECRET', {
		expiresIn: '7d'
	});

	return {
		email,
		password,
		token
	};
}
