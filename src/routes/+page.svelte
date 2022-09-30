<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { page } from '$app/stores';
	import { dev } from '$app/environment';

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
		console.log(dev);
		const { user, session, error } = await supabaseClient.auth.signIn(
			{
				provider: 'google'
			},
			{
				redirectTo: dev ? 'http://localhost:5173' : 'https://auth-issue-poc.vercel.app'
			}
		);
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
