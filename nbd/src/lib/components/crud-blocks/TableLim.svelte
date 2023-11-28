<script lang="ts">
    import { onMount } from 'svelte';
    import { collection, query, getDocs, where } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import type { DocData } from '$lib/docData';
    import { writable } from 'svelte/store';
    import EditDoc from './DocDataCRUD/EditDoc.svelte';
    import { authUser } from '$lib/authStore';

    const firestoreData = writable<DocData[]>([]);
    let filteredData: DocData[] = [];

    onMount(async () => {
        authUser.subscribe(async ($authUser) => {
            if ($authUser) {
                const collectionRef = collection(db, 'docData');
                const q = query(collectionRef, where("owner", "==", $authUser.uid));
                const querySnapshot = await getDocs(q);
                const docs = querySnapshot.docs.map(doc => ({
                    ...doc.data() as DocData,
                    id: doc.id
                }));
                firestoreData.set(docs);
                filteredData = docs;
            }
        });
    });
    
    // Optional: Category Filter
    export let categoryFilter = "";
    
    $: if (categoryFilter === "") {
    filteredData = $firestoreData.filter(doc => !doc.category || doc.category === "");
    } else if (categoryFilter) {
        filteredData = $firestoreData.filter(doc => doc.category.toLowerCase().includes(categoryFilter.toLowerCase()));
    } else {
        filteredData = $firestoreData;
    }
</script>

<div class="max-w-7xl m-auto p-2">
    <Table>
        <TableHead>
            <TableHeadCell>Title and Url</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Rating</TableHeadCell>
            <TableHeadCell>Tags</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each filteredData as row (row.id)}
            <TableBodyRow>
                <TableBodyCell><a href="{row.url}" target="_blank" rel="noopener noreferrer" class="text-[#ef562f] hover:underline">{row.title}</a></TableBodyCell>
                <TableBodyCell class="max-w-xs overflow-hidden">{row.desc}</TableBodyCell>
                <TableBodyCell>{row.rating}</TableBodyCell>
                <TableBodyCell>{row.tags}</TableBodyCell>
                <TableBodyCell>{row.category}</TableBodyCell>
                <TableBodyCell>
                    <EditDoc docID={row.id}/>
                </TableBodyCell>
            </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>
