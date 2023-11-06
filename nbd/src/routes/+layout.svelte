<script>
    import '../app.css';
    import NavBar from "$lib/components/NavBar.svelte";

	import { goto, invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	// onMount(() => {
	// 	const { data } = supabase.auth.onAuthStateChange((event, _session) => {
	// 		if (_session?.expires_at !== session?.expires_at) {
	// 			invalidate('supabase:auth')
	// 		}
	// 	})

	// 	return () => data.subscription.unsubscribe()
	// })

</script>


<NavBar></NavBar>
<slot></slot>

