<script lang="ts">
    // Import statements
    import { createClient } from '@supabase/supabase-js';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { Modal, Label, Input, Checkbox } from 'flowbite-svelte';
    import { Textarea } from 'flowbite-svelte';
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'


    // Variables
    let formModal = false;
    let title = '';
    let description = '';
    let url_link = '';
    let rating: number | null = null;
    let rating_comment = '';
    let tags = '';
    let category = '';
    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
    let data: any[] = [];

    // Functions
    async function addDoc(event: Event) {
        const doc = {
            title,
            description,
            url_link,
            rating,
            rating_comment,
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

    onMount(async () => {
        const { data: fetchedData, error } = await supabase.from('doc_data').select();
        if (error) {
            console.error("Error fetching data:", error);
        } else {
            data = fetchedData;
        }
    });
</script>

<div class="max-w-7xl m-auto p-2">
    <!-- Add Docs Button -->
    <Button on:click={() => (formModal = true)}>Add Docs</Button>

    <!-- Table -->
    <Table striped={true}>
        <!-- Table Header -->
        <TableHead>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>URL Link</TableHeadCell>
            <TableHeadCell>Rating</TableHeadCell>
            <TableHeadCell>Tags</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
        </TableHead>

        <!-- Table Body -->
        <TableBody>
            {#each data as row}
            <TableBodyRow>
                <TableBodyCell>{row.title}</TableBodyCell>
                <TableBodyCell>{row.description}</TableBodyCell>
                <TableBodyCell>{row.url_link}</TableBodyCell>
                <TableBodyCell>{row.rating}</TableBodyCell>
                <TableBodyCell>{row.tags}</TableBodyCell>
                <TableBodyCell>{row.category}</TableBodyCell>
                <TableBodyCell>
                    <a href="/edit/{row.id}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
                </TableBodyCell>
            </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>

<!-- Modal for Adding Documents -->
<Modal bind:open={formModal} size="md" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" on:submit={addDoc}>
        <!-- Add New Document Data Header -->
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add New Document Data</h3>

        <!-- URL Link Input -->
        <Label class="space-y-2">
            <span>URL Link</span>
            <Input bind:value={url_link} type="url" name="url_link" placeholder="Enter URL link" />
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
            <Textarea bind:value={rating_comment} name="rating_comm" placeholder="Enter rating comment"></Textarea>
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
        <Button type="submit" class="w-full">Add to Database</Button>
    </form>
</Modal>