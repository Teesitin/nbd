<script lang="ts">
    import { onMount } from 'svelte';
        import { TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Button, Dropdown, Checkbox, ButtonGroup } from 'flowbite-svelte';
        import { Section } from 'flowbite-svelte-blocks';
        import { ChevronRightOutline, ChevronLeftOutline } from 'flowbite-svelte-icons';
        import { page } from '$app/stores';
        import ViewDoc from './ViewDoc.svelte';


        let urlTableClass = "max-w-xs overflow-x-hidden hover:overflow-x-auto scrollbar";

        import { collection, query, getDocs, where } from 'firebase/firestore';
        import { db } from '$lib/firebase';
        import type { DocData } from '$lib/docData';
        import { writable } from 'svelte/store';

        const firestoreData = writable<DocData[]>([]);
        let searchTerm = '';
        
        interface ProcessedDocData {
            url: string;
            averageRating: string;
            tags: string;
        }

        const processedData = writable<ProcessedDocData[]>([]);

        onMount(async () => {
            const collectionRef = collection(db, 'docData');
            const querySnapshot = await getDocs(collectionRef);
            const docs = querySnapshot.docs.map(doc => doc.data() as DocData);

            const urlMap = new Map();
            docs.forEach(doc => {
                if (!urlMap.has(doc.url)) {
                    urlMap.set(doc.url, { totalRating: 0, count: 0, tags: new Set() });
                }
                const entry = urlMap.get(doc.url);
                entry.totalRating += doc.rating;
                entry.count++;
                doc.tags.split(',').forEach(tag => entry.tags.add(tag.trim()));
            });

            const uniqueData = Array.from(urlMap, ([url, { totalRating, count, tags }]) => ({
                url,
                averageRating: (totalRating / count).toFixed(2),
                tags: Array.from(tags).join(', ')
            }));

            processedData.set(uniqueData);
            console.log(uniqueData);
</script>