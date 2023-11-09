<script>
    import { Card, Button } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
    import { Modal } from 'flowbite-svelte';
    let clickOutsideModal = false;

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
    <Button on:click={() => (clickOutsideModal = true)}>
        Show me the Docs
    </Button>
</Card>


<Modal title="{categoryTitle}" bind:open={clickOutsideModal} autoclose outsideclose size = 'xl'>
    <!-- <TableLim catagoryFilter = {categoryTitle}/> -->
</Modal>