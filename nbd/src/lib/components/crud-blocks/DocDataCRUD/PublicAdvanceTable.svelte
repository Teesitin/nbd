<script lang="ts">
    import { onMount } from 'svelte';
    import { TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Button, Dropdown, Checkbox, ButtonGroup } from 'flowbite-svelte';
    import { Section } from 'flowbite-svelte-blocks';
    import { ChevronRightOutline, ChevronLeftOutline } from 'flowbite-svelte-icons';

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
    });


// Table Data

    let divClass='bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden';
    let innerDivClass='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
    let searchClass='w-full md:w-1/2 relative';
    let svgDivClass='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none';
    let classInput="text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10";
  
    let currentPosition = 0;
    const itemsPerPage = 10;
    const showPage = 5;
    let totalPages = 0;
    let pagesToShow:any = [];
    let totalItems = 0;
    $: totalItems = $processedData.length;
    let startPage:any;
    let endPage:any;
  
    const updateDataAndPagination = () => {
        renderPagination(totalItems);
    }
  
    const loadNextPage = () => {
    if (currentPosition + itemsPerPage < totalItems) {
        currentPosition += itemsPerPage;
        updateDataAndPagination();
    }
}

    const loadPreviousPage = () => {
        if (currentPosition - itemsPerPage >= 0) {
            currentPosition -= itemsPerPage;
            updateDataAndPagination();
        }
    }

    const goToPage = (pageNumber: number) => {
        currentPosition = (pageNumber - 1) * itemsPerPage;
        updateDataAndPagination();
    }

  
    const renderPagination = (totalItems: number) => {
        totalPages = Math.ceil(totalItems / itemsPerPage);
        const currentPage = Math.ceil((currentPosition + 1) / itemsPerPage);

        startPage = currentPage - Math.floor(showPage / 2);
        startPage = Math.max(1, startPage);
        endPage = Math.min(startPage + showPage - 1, totalPages);

        pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }

  
    $: startRange = currentPosition + 1;
    $: endRange = Math.min(currentPosition + itemsPerPage, totalItems);
    
    $: currentPageItems = $processedData.slice(currentPosition, currentPosition + itemsPerPage);
    

    $: filteredData = $processedData.filter(item =>
        item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.toLowerCase().includes(searchTerm.toLowerCase())
    );

  </script>
  
<svelte:head>
    <style>
        .scrollbar::-webkit-scrollbar {
            height: 5px;
        }

        .scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }

        .scrollbar::-webkit-scrollbar-thumb {
            background: #888;
        }
    </style>
</svelte:head>

<Section name="tableheader" classSection='bg-transparent p-3 sm:p-5'>
    <TableSearch placeholder="Search" hoverable={true} bind:inputValue={searchTerm} {divClass} {innerDivClass} {searchClass} {classInput}>
        <TableHead>
            <TableHeadCell>Url</TableHeadCell>
            <TableHeadCell>Rating</TableHeadCell>
            <TableHeadCell>Tags</TableHeadCell>
        </TableHead>

        <TableBody>
            {#if searchTerm !== ''}
            {#each filteredData as item}
            <TableBodyRow>
                <TableBodyCell class="{urlTableClass}"><a href="{item.url}" target="_blank" rel="noopener noreferrer" class="text-[#ef562f] hover:underline">{item.url}</a></TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3">{item.averageRating}</TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3">{item.tags}</TableBodyCell>
            </TableBodyRow>
            {/each}
            {:else}
            {#each currentPageItems as item}
            <TableBodyRow>
                <TableBodyCell class="{urlTableClass}"><a href="{item.url}" target="_blank" rel="noopener noreferrer" class="text-[#ef562f] hover:underline">{item.url}</a></TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3">{item.averageRating}</TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3">{item.tags}</TableBodyCell>
            </TableBodyRow>
            {/each}
            {/if}
        </TableBody>

        <div slot="footer" class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span class="font-semibold text-gray-900 dark:text-white">{startRange}-{endRange}</span>
                of
                <span class="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
            </span>
            <ButtonGroup>
                <Button on:click={loadPreviousPage} disabled={currentPosition === 0}><ChevronLeftOutline size='xs' class='m-1.5'/></Button>
                {#each pagesToShow as pageNumber}
                <Button on:click={() => goToPage(pageNumber)}>{pageNumber}</Button>
                {/each}
                <Button on:click={loadNextPage} disabled={totalPages === endPage}><ChevronRightOutline size='xs' class='m-1.5'/></Button>
            </ButtonGroup>
        </div>

    </TableSearch>
</Section>
