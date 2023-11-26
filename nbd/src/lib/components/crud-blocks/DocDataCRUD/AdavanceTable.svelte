<script lang="ts">
    import { onMount } from 'svelte';
    import { TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Button, Dropdown, Checkbox, ButtonGroup } from 'flowbite-svelte';
    import { Section } from 'flowbite-svelte-blocks';
    import paginationData from '../../utils/advancedTable.json'
    import { FilterSolid, ChevronRightOutline, ChevronLeftOutline } from 'flowbite-svelte-icons';

    import AddDoc from './AddDoc.svelte';
    import EditDoc from './EditDoc.svelte';

    import { collection, query, getDocs, where } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import type { DocData } from '$lib/docData';
    import { writable } from 'svelte/store';

    import { authUser } from '$lib/authStore';

// Initialize the store with the specific type
    const firestoreData = writable<DocData[]>([]);

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
                renderPagination(docs.length);
            }
        });
    });


// Table Data

    let divClass='bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden';
    let innerDivClass='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
    let searchClass='w-full md:w-1/2 relative';
    let svgDivClass='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none';
    let classInput="text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10";
  
    let searchTerm = '';
    let currentPosition = 0;
    const itemsPerPage = 10;
    const showPage = 5;
    let totalPages = 0;
    let pagesToShow:any = [];
    let totalItems = 0;
    $: totalItems = $firestoreData.length;
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
    
    $: currentPageItems = $firestoreData.slice(currentPosition, currentPosition + itemsPerPage);
    $: filteredItems = $firestoreData.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  </script>
  
<Section name="tableheader" classSection='bg-transparent p-3 sm:p-5'>
    <TableSearch placeholder="Search" hoverable={true} bind:inputValue={searchTerm} {divClass} {innerDivClass} {searchClass} {classInput}>
        <div slot="header" class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">

            <!-- Add New Document -->
            <AddDoc/>
            <!-- Category Filter -->
            <!-- <Button color='alternative'>Filter<FilterSolid class="w-3 h-3 ml-2 " /></Button>
            <Dropdown class="w-48 p-3 space-y-2 text-sm">
                <li>
                    <Checkbox>Cat 1</Checkbox>
                </li>
                <li>
                    <Checkbox>Cat 2</Checkbox>
                </li>
                <li>
                    <Checkbox>Cat 3</Checkbox>
                </li>
                <li>
                    <Checkbox>Cat 4</Checkbox>
                </li>
                <li>
                    <Checkbox>Cat 5</Checkbox>
                </li>
            </Dropdown> -->
        </div>

        <TableHead>
            <TableHeadCell>Title and Url</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Rating</TableHeadCell>
            <TableHeadCell>Tags</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
        </TableHead>

        <TableBody>
            {#if searchTerm !== ''}
            {#each filteredItems as item (item.id)}
            <TableBodyRow>
                <TableBodyCell><a href="{item.url}" target="_blank" rel="noopener noreferrer" class="text-[#ef562f] hover:underline">{item.title}</a></TableBodyCell>
                <TableBodyCell class="max-h-12" tdClass="px-4 py-3">{item.desc}</TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3">{item.rating}</TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3">{item.tags}</TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3">{item.category}</TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3"><EditDoc docID={item.id}/></TableBodyCell>
            </TableBodyRow>
            {/each}
            {:else}
            {#each currentPageItems as item (item.id)}
            <TableBodyRow>
                <TableBodyCell><a href="{item.url}" target="_blank" rel="noopener noreferrer" class="text-[#ef562f] hover:underline">{item.title}</a></TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3">{item.desc}</TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3">{item.rating}</TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3">{item.tags}</TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3">{item.category}</TableBodyCell>
                <TableBodyCell tdClass="px-4 py-3"><EditDoc docID={item.id}/></TableBodyCell>
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
