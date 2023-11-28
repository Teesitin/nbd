<script lang="ts">
    import type { DocData } from "$lib/docData";
    import { db } from "$lib/firebase";
    import { collection, getDocs } from "firebase/firestore";
    import { onMount } from "svelte";
    import { Listgroup } from 'flowbite-svelte';
    import { writable } from 'svelte/store';

    const commentArray = writable<string[]>([]);

    export let mainURL = 'https://chat.openai.com/';

    onMount(async () => {
        const collectionRef = collection(db, 'docData');
        const querySnapshot = await getDocs(collectionRef);
        const docs = querySnapshot.docs.map(doc => doc.data() as DocData);

        const newCommentArray: string[] = [];

        docs.forEach(doc => {
            if (mainURL === doc.url) {
                newCommentArray.push(doc.ratingComment);
            }
        });

        commentArray.set(newCommentArray);
    });


    let missing = ['There are no comments for this doc'];
</script>

{#if $commentArray.length > 0}
    <Listgroup items={$commentArray} let:item class="w-full">
        {item}
    </Listgroup>
{:else}
    <Listgroup items={missing} let:item class="w-full">
        {item}
    </Listgroup>
{/if}

