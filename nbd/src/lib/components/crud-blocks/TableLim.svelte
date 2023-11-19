<script lang="ts">
    import { onMount } from 'svelte';
    import { collection, query, getDocs } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import type { DocData } from '$lib/docData';
    import { writable } from 'svelte/store';
    import EditDoc from './DocDataCRUD/EditDoc.svelte';

    const firestoreData = writable<DocData[]>([]);
    let filteredData: DocData[] = [];

    onMount(async () => {
        const collectionRef = collection(db, 'docData');
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);
        const docs: DocData[] = querySnapshot.docs.map(doc => ({
            ...doc.data() as DocData,
            id: doc.id
        }));
        firestoreData.set(docs);
        filteredData = docs; // Initialize filteredData with all documents
    });

    // Optional: Category Filter
    export let categoryFilter = "";
    $: if (categoryFilter) {
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
