<script lang="ts">
    // Import statements
    import { createClient } from '@supabase/supabase-js';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { Modal, Label, Input, Checkbox } from 'flowbite-svelte';
    import { Textarea } from 'flowbite-svelte';
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';
    import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
    import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
    import { Section, TableHeader } from 'flowbite-svelte-blocks';
    import { Heading, P, Search, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    import { Popover } from 'flowbite-svelte';



    // Create Data
    let formModal = false;
    let title = '';
    let description = '';
    let urlLink = '';
    let rating: number | null = null;
    let ratingComment = '';
    let tags = '';
    let category = '';
    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
    let data: any[] = [];

    let enablePopover = true;

    // Delete Data
    let deleteModal = false;



    // Edit Data
    let editModal = false;
    let editId = '';
    let editTitle = '';
    let editDescription = '';
    let editUrlLink = '';
    let editRating: number | null = null;
    let editRatingComment = '';
    let editTags = '';
    let editCategory = '';


    // Functions
    async function addDoc(event: Event) {
        const doc = {
            title,
            description,
            url_link: urlLink,
            rating,
            rating_comment: ratingComment,
            tags,
            category
        };
        const { data, error } = await supabase.from('doc_data').insert([doc]);
        if (error) {
            console.error("Error inserting data:", error);
        } else {
            console.log("Data inserted:", data);
            location.reload();
        }
    }

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

        const { data: updatedData, error } = await supabase.from('doc_data').update(updatedDoc).eq('id', editId);
        if (error) {
            console.error("Error updating data:", error);
        } else {
            const index = data.findIndex(doc => doc.id === editId);
            location.reload();
        }
    }


    async function removeDoc() {
        const { error } = await supabase.from('doc_data').delete().eq('id', editId);
        if (error) {
            console.error("Error deleting data:", error);
        } else {
            location.reload();
        }
    }

    // Search
    let searchTerm = '';
    $: filteredItems = data.filter((data) => data.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);



    onMount(async () => {
        const { data: fetchedData, error } = await supabase.from('doc_data').select();
        if (error) {
            console.error("Error fetching data:", error);
        } else {
            data = fetchedData;
        }
    });

    import { createEventDispatcher } from 'svelte';

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
        <DropdownItem>Mass Edit</DropdownItem>
        <DropdownDivider />
        <DropdownItem>Delete all</DropdownItem>
      </Dropdown>
      <Button color="light">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-4 h-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
        </svg>
        Filter&nbsp<ChevronDownOutline size="xs"/>
      </Button>
      <Dropdown class="w-48 p-2 text-sm">
        <h6 class="mb-3 ml-1 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
        <li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
          <Checkbox>Apple (56)</Checkbox>
        </li>
        <li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
          <Checkbox>Fitbit (56)</Checkbox>
        </li>
        <li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
          <Checkbox checked>Dell (56)</Checkbox>
        </li>
        <li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
          <Checkbox>Asus (97)</Checkbox>
        </li>
      </Dropdown>

      <Checkbox>Popover</Checkbox>
    </TableHeader>

    <Table class="mt-5">

        <!-- Table Header -->
        <TableHead>
            <TableHeadCell>Title and Url</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Rating</TableHeadCell>
            <TableHeadCell>Tags</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
        </TableHead>

        <!-- Table Body -->
        <TableBody>
            {#each filteredItems as row, index}
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

{#each filteredItems as row, index}
  <Popover class="w-64 text-sm font-light " title="{row.title}" triggeredBy="#table-row-{index}">{row.description}</Popover>
{/each}



<!-- Modal for Adding Documents -->
<Modal bind:open={formModal} size="md" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" on:submit={addDoc}>
        <!-- Add New Document Data Header -->
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add New Document Data</h3>

        <!-- URL Link Input -->
        <Label class="space-y-2">
            <span>URL Link</span>
            <Input bind:value={urlLink} type="url" name="urlLink" placeholder="Enter URL link" />
        </Label>

        <!-- Title Input -->
        <Label class="space-y-2">
            <span>Title</span>
            <Input bind:value={title} type="text" name="title" placeholder="Enter title" required />
        </Label>

        <!-- Description Textarea -->
        <Label class="space-y-2">
            <span>Description</span>
            <Textarea bind:value={description} name="description" placeholder="Enter description" required></Textarea>
        </Label>

        <!-- Rating Input -->
        <Label class="space-y-2">
            <span>Rating</span>
            <Input bind:value={rating} type="number" name="rating" placeholder="Enter rating (1-10)" min="1" max="10" />
        </Label>

        <!-- Rating Comment Textarea -->
        <Label class="space-y-2">
            <span>Rating Comment</span>
            <Textarea bind:value={ratingComment} name="rating_comment" placeholder="Enter rating comment"></Textarea>
        </Label>

        <!-- Tags Input -->
        <Label class="space-y-2">
            <span>Tags</span>
            <Input bind:value={tags} type="text" name="tags" placeholder="Enter tags (comma separated)" />
        </Label>

        <!-- Category Input -->
        <Label class="space-y-2">
            <span>Category</span>
            <Input bind:value={category} type="text" name="category" placeholder="Enter category" />
        </Label>

        <!-- Submit Button -->
        <Button type="submit" class="w-full">Add to My List</Button>
    </form>
</Modal>

<!-- Modal for Editing Documents -->
<Modal bind:open={editModal} size="md" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" on:submit={updateDoc}>
        <!-- Add New Document Data Header -->
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add New Document Data</h3>

        <!-- URL Link Input -->
        <Label class="space-y-2">
            <span>URL Link</span>
            <Input bind:value={editUrlLink} type="url" name="urlLink" placeholder="Enter URL link" />
        </Label>

        <!-- Title Input -->
        <Label class="space-y-2">
            <span>Title</span>
            <Input bind:value={editTitle} type="text" name="title" placeholder="Enter title" required />
        </Label>

        <!-- Description Textarea -->
        <Label class="space-y-2">
            <span>Description</span>
            <Textarea bind:value={editDescription} name="description" placeholder="Enter description" required></Textarea>
        </Label>

        <!-- Rating Input -->
        <Label class="space-y-2">
            <span>Rating</span>
            <Input bind:value={editRating} type="number" name="rating" placeholder="Enter rating (1-10)" min="1" max="10" />
        </Label>

        <!-- Rating Comment Textarea -->
        <Label class="space-y-2">
            <span>Rating Comment</span>
            <Textarea bind:value={editRatingComment} name="rating_comm" placeholder="Enter rating comment"></Textarea>
        </Label>

        <!-- Tags Input -->
        <Label class="space-y-2">
            <span>Tags</span>
            <Input bind:value={editTags} type="text" name="tags" placeholder="Enter tags (comma separated)" />
        </Label>

        <!-- Category Input -->
        <Label class="space-y-2">
            <span>Category</span>
            <Input bind:value={editCategory} type="text" name="category" placeholder="Enter category" />
        </Label>

        <!-- Submit Button -->
        <div class="flex">
            <Button type="submit" class="w-1/2 mx-2 my-1">Update Changes</Button>
            <Button color="alternative" class="w-1/2 mx-2 my-1" on:click={() => (deleteModal = true)}>Remove</Button>
        </div>
    </form>
</Modal>


<!-- Delete -->
<Modal bind:open={deleteModal} size="xs" autoclose>
    <div class="text-center">
      <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
      <Button color="red" on:click={removeDoc} class="mr-2">Yes, I'm sure</Button>
      <Button color="alternative">No, cancel</Button>
    </div>
</Modal>