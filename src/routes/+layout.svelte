<!-- src/routes/+layout.svelte -->
<script lang="ts">
	// we need to make sure the supabase instance is initialized on the client
	import '$lib/db';
	import { startSupabaseSessionSync } from '@supabase/auth-helpers-sveltekit';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	startSupabaseSessionSync({
		page,
		handleRefresh: () => invalidateAll()
	});
</script>

<slot />
