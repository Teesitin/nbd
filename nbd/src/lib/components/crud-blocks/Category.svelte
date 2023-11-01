<script>
    import { Card, Button } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
    import { Modal } from 'flowbite-svelte';
    let clickOutsideModal = false;

    import TableLim from './TableLim.svelte';

    export let categoryTitle='default';
    export let categoryDesc='Everything you need to build out a modern web-app with a hint of spaghetti and cheese.';
</script>
  
<Card class="m-4">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{categoryTitle}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">{categoryDesc}</p>
    <Button on:click={() => (clickOutsideModal = true)}>Show me the Docs</Button>
</Card>

<Modal title="{categoryTitle}" bind:open={clickOutsideModal} autoclose outsideclose size = 'xl'>
    <TableLim />
</Modal>