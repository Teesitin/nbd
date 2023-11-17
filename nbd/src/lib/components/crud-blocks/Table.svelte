<script lang="ts">
    import { onMount } from 'svelte';
    import { writable, get } from 'svelte/store';

    import { Modal, Label, Input, Checkbox } from 'flowbite-svelte';
    import { Textarea } from 'flowbite-svelte';
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
    import { Section, TableHeader } from 'flowbite-svelte-blocks';
    import { Search, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    import { Popover } from 'flowbite-svelte';

    import { authUser } from '$lib/authStore';


    import { collection, addDoc, query, getDocs } from 'firebase/firestore';
    import { firebaseApp, firebaseAuth } from '$lib/firebase';
    import { db } from '$lib/firebase';
    import type { DocData } from '$lib/docData.ts';

    
    const data = writable<DocData[]>([]);

    onMount(async () => {
        const collectionRef = collection(db, 'docData');
        const querySnapshot = await getDocs(collectionRef);
        console.log(querySnapshot);
        const docsArray: DocData[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as DocData
        }));

        data.set(docsArray);

        console.log(data);
    });

    // Variables
    let formModal = false;
    let title = '';
    let description = '';
    let urlLink = '';
    let rating: number | null = null;
    let ratingComment = '';
    let tags = '';
    let category = '';
    let enablePopover = true;
    let deleteModal = false;
    let editModal = false;
    let editId = '';
    let editTitle = '';
    let editDescription = '';
    let editUrlLink = '';
    let editRating: number | null = null;
    let editRatingComment = '';
    let editTags = '';
    let editCategory = '';

// 4


    function loadEditData(doc: { id: any; title: string; description: string; url_link: string; rating: number | null; rating_comment: string; tags: string; category: string; }) {
        editId = doc.id;
        editTitle = doc.title;
        editDescription = doc.description;
        editUrlLink = doc.url_link;
        editRating = doc.rating;
        editRatingComment = doc.rating_comment;
        editTags = doc.tags;
        editCategory = doc.category;
        editModal = true;
    }

    async function updateDoc() {
        const updatedDoc = {
            title: editTitle,
            description: editDescription,
            url_link: editUrlLink,
            rating: editRating,
            rating_comment: editRatingComment,
            tags: editTags,
            category: editCategory
        };

        console.log(updatedDoc);

    }

    async function removeDoc() {

    }


    async function addDocToFirestore() {
        const newDoc: DocData = {
            title: title,
            desc: description,
            url: urlLink,
            rating: rating || 0,
            ratingComment: ratingComment,
            tags: tags,
            category: category,
            owner: ''
        };

        try {
            const docRef = await addDoc(collection(db, 'docData'), newDoc);
            console.log('Document written with ID: ', docRef.id);
            data.update(currentDocs => [...currentDocs, {...newDoc, id: docRef.id}]);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }

    // Call this function on form submit
    async function addDocSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        addDocToFirestore();
    }




    let searchTerm = '';

    const categorySet: Set<string> = new Set();
    let uniqueCategories: string[];
    const toggledCategories = writable(new Set<string>());

    function getUniqueCategories(data: any[]) {
        data.forEach(doc => {
            if (doc.category && typeof doc.category === 'string') {
                categorySet.add(doc.category);
            }
        });
        uniqueCategories = Array.from(categorySet);
        console.log(uniqueCategories);
    }

    function handleCategoryChange(category: string, checked: boolean) {
        const currentSet = get(toggledCategories);
        if (checked) {
            currentSet.add(category);
        } else {
            currentSet.delete(category);
        }
        toggledCategories.set(new Set(currentSet));
        console.log(Array.from(get(toggledCategories)));
    }

import { derived } from 'svelte/store';

// ... other imports and code

// Define a derived store for filtered items
const filteredItems = derived(
    [data, toggledCategories, searchTerm],
    ([$data, $toggledCategories, $searchTerm]) => {
        return $data.filter((item: { title: string; category: any; }) => {
            const bySearchTerm = !$searchTerm || item.title.toLowerCase().includes($searchTerm.toLowerCase());
            const byCategory = $toggledCategories.size === 0 || $toggledCategories.has(item.category);
            return bySearchTerm && byCategory;
        });
    }
);


</script>




<Section name="tableheader" sectionClass="bg-slate-50 dark:bg-transparent h-fit	 flex py-8 ">
    <TableHeader headerType="search">
        <Search slot="search" size="md" bind:value={searchTerm} />

        <Button on:click={() => (formModal = true)} class="mx-6 my-3">
            <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            Add Docs
        </Button>

        <Button color="light">
            Actions&nbsp<ChevronDownOutline size="xs"/>
        </Button>

        <Dropdown>
            <DropdownItem><Checkbox bind:checked={enablePopover}>Popover</Checkbox></DropdownItem>
            <DropdownDivider />
            <DropdownItem>Dummy Action</DropdownItem>
        </Dropdown>

        <Button color="light">
            Filter&nbsp<ChevronDownOutline size="xs"/>
        </Button>

        <Dropdown class="w-48 p-2 text-sm">
            <h6 class="mb-3 ml-1 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
            {#each uniqueCategories as category}
                <li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <Checkbox
                        checked={false}
                        on:change="{(e) => handleCategoryChange(category, e.target.checked)}"
                    >
                        {category}
                    </Checkbox>
                </li>           
            {/each}
        </Dropdown>
        

    </TableHeader>

    <Table class="mt-5">

        <TableHead>
            <TableHeadCell>Title and Url</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Rating</TableHeadCell>
            <TableHeadCell>Tags</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
        </TableHead>

        <TableBody>
            {#each $filteredItems as row, index}
            <TableBodyRow>
                <TableBodyCell><a href="{row.url_link}" target="_blank" rel="noopener noreferrer" class="text-[#ef562f] hover:underline">{row.title}</a></TableBodyCell>
                <TableBodyCell id="table-row-{index}" class="max-w-xs overflow-hidden">{row.description}</TableBodyCell>

                <TableBodyCell>{row.rating}</TableBodyCell>
                <TableBodyCell>{row.tags}</TableBodyCell>
                <TableBodyCell>{row.category}</TableBodyCell>
                <TableBodyCell>
                    <a on:click={() => loadEditData(row)} class="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
                </TableBodyCell>
            </TableBodyRow>
            {/each}
        </TableBody>
    </Table>

</Section>

{#if enablePopover}
    {#each filteredItems as row, index}
    <Popover class="w-64 text-sm font-light " title="{row.title}" triggeredBy="#table-row-{index}">{row.description}</Popover>
    {/each}
{/if}

<Modal bind:open={formModal} size="md" autoclose={false} class="w-full">
    <form on:submit|preventDefault={addDocSubmit}>
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add New Document Data</h3>

        <Label class="space-y-2">
            <span>URL Link</span>
            <Input bind:value={urlLink} type="url" name="urlLink" placeholder="Enter URL link" />
        </Label>

        <Label class="space-y-2">
            <span>Title</span>
            <Input bind:value={title} type="text" name="title" placeholder="Enter title" required />
        </Label>

        <Label class="space-y-2">
            <span>Description</span>
            <Textarea bind:value={description} name="description" placeholder="Enter description" required></Textarea>
        </Label>

        <Label class="space-y-2">
            <span>Rating</span>
            <Input bind:value={rating} type="number" name="rating" placeholder="Enter rating (1-10)" min="1" max="10" />
        </Label>

        <Label class="space-y-2">
            <span>Rating Comment</span>
            <Textarea bind:value={ratingComment} name="rating_comment" placeholder="Enter rating comment"></Textarea>
        </Label>

        <Label class="space-y-2">
            <span>Tags</span>
            <Input bind:value={tags} type="text" name="tags" placeholder="Enter tags (comma separated)" />
        </Label>

        <Label class="space-y-2">
            <span>Category</span>
            <Input bind:value={category} type="text" name="category" placeholder="Enter category" />
        </Label>

        <Button type="submit" class="w-full">Add to My List</Button>
    </form>
</Modal>

<Modal bind:open={editModal} size="md" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" on:submit={updateDoc}>
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit Document Data</h3>

        <Label class="space-y-2">
            <span>URL Link</span>
            <Input bind:value={editUrlLink} type="url" name="urlLink" placeholder="Enter URL link" />
        </Label>

        <Label class="space-y-2">
            <span>Title</span>
            <Input bind:value={editTitle} type="text" name="title" placeholder="Enter title" required />
        </Label>

        <Label class="space-y-2">
            <span>Description</span>
            <Textarea bind:value={editDescription} name="description" placeholder="Enter description" required></Textarea>
        </Label>

        <Label class="space-y-2">
            <span>Rating</span>
            <Input bind:value={editRating} type="number" name="rating" placeholder="Enter rating (1-10)" min="1" max="10" />
        </Label>

        <Label class="space-y-2">
            <span>Rating Comment</span>
            <Textarea bind:value={editRatingComment} name="rating_comm" placeholder="Enter rating comment"></Textarea>
        </Label>

        <Label class="space-y-2">
            <span>Tags</span>
            <Input bind:value={editTags} type="text" name="tags" placeholder="Enter tags (comma separated)" />
        </Label>

        <Label class="space-y-2">
            <span>Category</span>
            <Input bind:value={editCategory} type="text" name="category" placeholder="Enter category" />
        </Label>

        <div class="flex">
            <Button type="submit" class="w-1/2 mx-2 my-1">Update Changes</Button>
            <Button color="alternative" class="w-1/2 mx-2 my-1" on:click={() => (deleteModal = true)}>Remove</Button>
        </div>
    </form>
</Modal>

<Modal bind:open={deleteModal} size="xs" autoclose>
    <div class="text-center">
        <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
        <Button color="red" on:click={removeDoc} class="mr-2">Yes, I'm sure</Button>
        <Button color="alternative">No, cancel</Button>
    </div>
</Modal>