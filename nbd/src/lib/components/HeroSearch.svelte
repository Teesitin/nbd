<script lang="ts">
    import "@fontsource/roboto";
    import "@fontsource/telex";
    import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import { Popover } from 'flowbite-svelte';
    import { collection, getDocs } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import type { DocData } from '$lib/docData';
    import { writable } from 'svelte/store';
    import { onMount } from "svelte";
    import { ChevronRightSolid } from 'flowbite-svelte-icons';


    const tagsData = writable<string[]>([]);
    const searchInput = writable('');
    const tagNotFound = writable(false);



    onMount(async () => {
        const collectionRef = collection(db, 'docData');
        const querySnapshot = await getDocs(collectionRef);

        const allTags = querySnapshot.docs.flatMap(doc => {
            const data = doc.data() as DocData;
            return data.tags.split(',').map(tag => tag.trim().toLowerCase());
        });

        const uniqueTags = Array.from(new Set(allTags));
        tagsData.set(uniqueTags);
    });

    $: filteredTags = $tagsData.filter(tag => 
        tag.toLowerCase().includes($searchInput.toLowerCase())
    );

    $: showDropdown = $searchInput.length >= 3 && filteredTags.length > 0;

    $: {
        const isTagValid = $tagsData.some(tag => 
            tag.toLowerCase() === $searchInput.toLowerCase()
        );
        tagNotFound.set(!isTagValid);
    }

    $: {
    const isInputNonEmpty = $searchInput.length > 1;
    const isTagInList = $tagsData.some(tag =>
        tag.toLowerCase() === $searchInput.toLowerCase()
    );
    const isAnyTagLeft = filteredTags.length > 0;
    tagNotFound.set(isInputNonEmpty && !isTagInList && !isAnyTagLeft);
}

function loadSoftware() {
    // Check for exact match again to ensure sync with reactivity
    const isTagValid = $tagsData.some(tag => 
        tag.toLowerCase() === $searchInput.toLowerCase()
    );
    if ($searchInput && isTagValid) {
        goto(`/software?tag=${encodeURIComponent($searchInput)}`);
    } else
    {
        tagNotFound.set(true);
    }
}

function handleDropdownClick(tag:string) {
    searchInput.set(tag);
    
    goto(`/software?tag=${encodeURIComponent(tag)}`);
}

function handleEnterPress(event: { key: string; }) {
    if (event.key === 'Enter') {
        loadSoftware();
    }
}

</script>


<div class="w-full h-96 flex justify-center flex-col items-center">

    <!-- Hero -->
    <h1 class="text-5xl font-bold m-2 text-scorpion-950 text-center dark:text-scorpion-50">
        Nothing But Docs
    </h1>

    <h2 class="m-2 text-scorpion-950 dark:text-scorpion-50">
        Celebrating good documentation
    </h2>
    
    <!-- Doc Search -->
    <div class="search-container m-4 flex justify-center items-center border-violet-950 border-solid gap-4 flex-col  w-72 sm:flex-row sm:w-96">
        <input type="text" bind:value={$searchInput} on:keydown={handleEnterPress} class="search-bar w-full sm:w-5/6 font-roboto boder-scorpion-950 border-2 rounded-full" placeholder="Search for Software...">

        {#if showDropdown}
            <Dropdown class="w-72 max-h-72 overflow-auto" open={true}>
                {#each filteredTags as tag}
                    <DropdownItem on:click={() => handleDropdownClick(tag)} class="flex justify-between items-center">
                        <span>{tag}</span>
                        <ChevronRightSolid class="w-3 h-3 text-scorpion-950 dark:text-scorpion-50" />
                    </DropdownItem>
                {/each}
            </Dropdown>
        {/if}

        <Button class="rounded-full" id="searchButton" on:click={loadSoftware}>
            <svg class="w-6 h-6 p-1  text-scorpion-50  dark:text-scorpion-950" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </Button>
    </div>
</div>

{#if $tagNotFound}
    <Popover open={true} placement='right' class="w-64 text-sm font-light " title="Unknown Tag" triggeredBy="#searchButton">
        The tag you entered doesn't match any existing tags. This means that no documentation has been added yet for this particular software or topic.
    </Popover>
{/if}

