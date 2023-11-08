<script lang="ts">
    import { Card, Button } from 'flowbite-svelte';
    import { List, Li } from 'flowbite-svelte';
    import { Progressbar } from 'flowbite-svelte';
    import { AccordionItem, Accordion } from 'flowbite-svelte';


    let prifileData = {
        name:'DeLayne Russell',
        id:'123',
        email:'example@gmail.com',
        desc:'A Web Developer that has no clue with what he is doing...'
    }

    let achievements = [
    {
        name: 'Doc Novice',
        progress: 80,
        desc: 'Add 5 docs to your list',
        id: 'doc_count_5'
    },
    {
        name: 'Doc Doc Who',
        progress: 60,
        desc: 'Add 10 docs to your list',
        id: 'doc_count_10'
    },
    {
        name: 'Master of Documents',
        progress: 20,
        desc: 'Add 100 docs to your list',
        id: 'doc_count_100'
    },
    {
        name: 'Document Enthusiast',
        progress: 40,
        desc: 'Add 25 docs to your list',
        id: 'doc_count_25'
    },
    {
        name: 'Document Wizard',
        progress: 10,
        desc: 'Add 50 docs to your list',
        id: 'doc_count_50'
    },
    {
        name: 'Document Collector',
        progress: 5,
        desc: 'Add 200 docs to your list',
        id: 'doc_count_200'
    },
    {
        name: 'Doc Guru',
        progress: 15,
        desc: 'Add 75 docs to your list',
        id: 'doc_count_75'
    },
    {
        name: 'Doc Kingpin',
        progress: 8,
        desc: 'Add 150 docs to your list',
        id: 'doc_count_150'
    },
    {
        name: 'Document Mastermind',
        progress: 3,
        desc: 'Add 500 docs to your list',
        id: 'doc_count_500'
    },
    {
        name: 'Document Connoisseur',
        progress: 2,
        desc: 'Add 1000 docs to your list',
        id: 'doc_count_1000'
    }
];



</script>


<Card img="/about/3-square.webp" href="/" horizontal class="m-auto mb-4">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{prifileData.name}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">{prifileData.desc}</p>

    <div class="flex mt-4 space-x-3 lg:mt-6">
        <Button>Share</Button>
        <Button color="light" class="dark:text-white">Edit</Button>
    </div>
</Card>





<Card padding="xl" class="m-auto">

    <Accordion class="border-none">
        <AccordionItem>
          <span slot="header">Achiements</span>

          <List tag="ul" list="none" class="max-w-xl w-72 divide-y divide-gray-200 dark:divide-gray-700">

            {#each achievements as achievement}
                <Li class="pb-3 sm:pb-4">
                    <div class="flex items-center space-x-4">
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white mt-2">{achievement.name}</p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">{achievement.desc}</p>
                            <Progressbar progress={achievement.progress} class="my-2"/>
                        </div>
                    </div>
                </Li>
            {/each}
        </List>
            
        </AccordionItem>
    </Accordion>

</Card>

