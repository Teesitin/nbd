<script lang="ts">
    import { Section, Cta } from 'flowbite-svelte-blocks';
    import { ArrowRightSolid } from 'flowbite-svelte-icons';
    import { Card, Dropdown, DropdownItem, Avatar, Button } from 'flowbite-svelte';
    import { DotsHorizontalOutline } from 'flowbite-svelte-icons';

    let prifileData = {
            name:'DeLayne Russell',
            id:'123',
            email:'example@gmail.com',
            desc:'Web Developer with a side of Salt'
        }
</script>
    

<Card padding="sm" class="m-auto">
    <div class="flex justify-end">
        <DotsHorizontalOutline />
        <Dropdown class="w-36">
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Export data</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
        </Dropdown>
    </div>
    <div class="flex flex-col items-center pb-4">
        <Avatar size="lg" src="/about/3-square.webp" />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{prifileData.name}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{prifileData.desc}</span>
        <div class="flex mt-4 space-x-3 lg:mt-6">
        <Button>Dummy</Button>
        <Button color="light" class="dark:text-white">Share</Button>
        </div>
    </div>
</Card>


