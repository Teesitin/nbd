<script>
    import { Card, Button } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
    import { Modal } from 'flowbite-svelte';
    let showTable = false;
    let showShare = false;


    import TableLim from '../TableLim.svelte';

    export let categoryTitle='Front-end';
    export let categoryDesc='Everything you need to build out a modern web-app with a hint of spaghetti and cheese.';
</script>
  
<Card class="flex flex-col justify-between m-4 p-4 h-full">
    <div>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {categoryTitle}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
            {categoryDesc}
        </p>
    </div>

    <div class="flex gap-4">
        <Button on:click={() => (showTable = true)} class="w-1/2">Show</Button>
        <Button on:click={() => (showShare = true)} class="w-1/2" color="alternative">Share</Button>
    </div>



</Card>


<Modal title="{categoryTitle}" bind:open={showTable} autoclose outsideclose size = 'xl'>
    <TableLim catagoryFilter = {categoryTitle}/>
</Modal>