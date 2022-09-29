// we need to make sure the supabase instance is initialized on the server
import '$lib/db';
import { dev } from '$app/environment';
import { auth } from '@supabase/auth-helpers-sveltekit/server';

export const handle = auth();
