// See https://kit.svelte.dev/docs/types#app

import type { Quest } from '$lib/models/quests';
import type { User } from '$lib/models/user';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			quests: Quest[];
			user: User;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
