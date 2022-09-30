<script>
	import { supabaseClient } from '$lib/db';
	import { page } from '$app/stores';

	$: if ($page.data.session.user) {
		loadShared($page.data.session.user);
	}

	async function loadShared(user) {
		const dbSharedDecks = await supabaseClient.from('invites');
		console.log(dbSharedDecks);
		return dbSharedDecks;
	}
	async function signInWithGoogle() {
		const { user, session, error } = await supabaseClient.auth.signIn({
			provider: 'google'
		});
	}
	async function signout() {
		await supabaseClient.auth.signOut();
	}
</script>

<button on:click={signInWithGoogle}>Login</button>
<button on:click={signout}>Log out</button>

{#if $page.data.session.user}
	Hello {$page.data.session.user.email}
{/if}
