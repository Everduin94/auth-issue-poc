<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { page } from '$app/stores';

	$: if ($page.data.session.user) {
		loadItems($page.data.session.user);
	}

	// This Works
	// $: if ($page.data.session.user) {
	//    setTimeout(() => loadItems($page.data.session.user), 1)
	// }

	let items: any[] = [];
	async function loadItems(user) {
		const res = await supabaseClient.from('temp');
		items = res.data || [];
		return items;
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
	{#each items as item}
		<div>{item.item}</div>
	{:else}
		<div>Login to see items</div>
	{/each}
{/if}
