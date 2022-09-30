// we need to make sure the supabase instance is initialized on the server
import '$lib/db';
import { auth } from '@supabase/auth-helpers-sveltekit/server';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(auth());
