// we need to make sure the supabase instance is initialized on the server
import '$lib/db';
import { auth } from '@supabase/auth-helpers-sveltekit/server';
import { sequence } from '@sveltejs/kit/hooks';

export async function setAuth({ event, resolve }) {
	const response = await resolve(event);
	return response;
}

export const handle = sequence(auth());
