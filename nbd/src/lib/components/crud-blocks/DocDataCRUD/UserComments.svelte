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
</script>

<Listgroup items={$commentArray} let:item class="w-full">
    {item}
</Listgroup>
