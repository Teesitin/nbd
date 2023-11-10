<script>
    import { onMount, onDestroy } from 'svelte';
    import { authUser } from '$lib/authStore';
    import { redirect } from '@sveltejs/kit';
    import { goto } from '$app/navigation';
    import { firebaseAuth } from '$lib/firebase';
     
    onMount(() => {
        (async () => {
            firebaseAuth.onAuthStateChanged(user => {
                if (!user) {
                    goto('/login').catch(error => {
                        console.error('Navigation failed', error);
                    });
                }
            });
        })();
    });

</script>
    
<slot />