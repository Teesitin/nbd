<script lang="ts">
    import { Card, Button } from 'flowbite-svelte';
    import { Modal } from 'flowbite-svelte';
    let showTable = false;

    import TableLim from '../TableLim.svelte';

    export let categoryTitle='Default';
    export let categoryDesc='Default';


    import { collection, query, where, getDocs } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import { authUser } from '$lib/authStore';
    import { get } from 'svelte/store';
    import type { DocData } from '$lib/docData';

    async function fetchDataByCategory(category: string) {
        const $authUser = get(authUser); // directly get the value of the authUser store
        if ($authUser) {
            const collectionRef = collection(db, 'docData');
            // Query for documents that match the category and are owned by the current user
            const q = query(collectionRef, where('category', '==', category), where('owner', '==', $authUser.uid));
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map(doc => ({
                ...doc.data() as DocData,
                id: doc.id
            }));
            return docs; // Return the documents as an array
        } else {
            return []; // Return an empty array if there is no user
        }
    }


    
    async function copyCategoryDataToClipboard(category: string) {
        try {
            const data = await fetchDataByCategory(category);
            let textData = '';

            data.forEach(doc => {
                textData += `URL: ${doc.url}\nTitle: ${doc.title}\nDescription: ${doc.desc}\nTags: ${doc.tags}\nCategory: ${doc.category}\n\n`;
            });

            await navigator.clipboard.writeText(textData);
            alert('Data copied to clipboard.');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }


</script>
  
<Card class="flex flex-col justify-between m-4 p-4 h-full">
    <div>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {#if categoryTitle == ""}
                Uncategorized
            {/if}
            
            {categoryTitle}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
            {categoryDesc}
        </p>
    </div>

    <div class="flex gap-4">
        <Button on:click={() => (showTable = true)} class="w-1/2">Show</Button>
        <Button on:click={() => copyCategoryDataToClipboard(categoryTitle)} class="w-1/2" color="alternative">Share</Button>
    </div>
</Card>


<Modal title="{categoryTitle}" bind:open={showTable} autoclose outsideclose size = 'xl'>
    <TableLim categoryFilter = {categoryTitle}/>
</Modal>