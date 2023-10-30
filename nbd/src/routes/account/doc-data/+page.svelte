<script lang="ts">
    import { createClient } from '@supabase/supabase-js';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

    const supabase = createClient('https://ylyazslokycusixijqhs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlseWF6c2xva3ljdXNpeGlqcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxMDk5OTksImV4cCI6MjAxMzY4NTk5OX0.pDOVI9TAHRYwsAK6mFAB8rWb0arZ-S6w5ihoYy5Xlg0');

    let data: any[] = [];

    const newDoc = {
        title: "Sample Country",
        description: "A sample description",
        url_link: "https://sample-country-url.com",
        rating: 5,
        rating_comment: "Positive feedback",
        tags: "tag1,tag2,tag3",
        category: "Geography"
    };

    
    
    async function addDoc() {
        const { data, error } = await supabase.from('doc_data').insert([newDoc]);
        
        if (error) {
            console.error("Error inserting data:", error);
        } else {
            console.log("Data inserted:", data);
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

<Button on:click={addDoc}>Add Doc</Button >

<div class="max-w-7xl m-auto p-2">
  <Table striped={true}>
    <TableHead>
      <TableHeadCell>Title</TableHeadCell>
      <TableHeadCell>Description</TableHeadCell>
      <TableHeadCell>URL Link</TableHeadCell>
      <TableHeadCell>Rating</TableHeadCell>
      <TableHeadCell>Tags</TableHeadCell>
      <TableHeadCell>Category</TableHeadCell>
      <TableHeadCell>Action</TableHeadCell>
    </TableHead>
  <TableBody class="divide-y">
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
