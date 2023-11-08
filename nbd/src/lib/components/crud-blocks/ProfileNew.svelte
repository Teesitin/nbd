<script lang="ts">
    import { Card, Button } from 'flowbite-svelte';
    import { List, Li } from 'flowbite-svelte';
    import { Progressbar } from 'flowbite-svelte';

    import { Section } from 'flowbite-svelte-blocks';
    import { Label, Input, Select, Textarea } from 'flowbite-svelte';
    import { Img } from 'flowbite-svelte';


    const handleSubmit = () => {
        alert('Form submited.');
    };

    let selected: any;

    let achiementTags = [
        { value: 'tv', name: 'TV/Monitors' },
        { value: 'pc', name: 'PC' },
        { value: 'phone', name: 'Phones' }
    ];



    let profileData = {
        username:'Teesitin',
        firstName: 'DeLayne',
        lastName: 'Russell',
        id:'123',
        email:'example@gmail.com',
        desc:'A Web Developer that has no clue with what he is doing...',
        tagline:'Doc Doc Who'
    }

    let achievements = [
    {
        name: 'Doc Novice',
        progress: 100,
        desc: 'Add 5 docs to your list',
        id: 'doc_count_5'
    },
    {
        name: 'Doc Doc Who',
        progress: 100,
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


function updateAchiementTags() {
        achiementTags = achievements.filter(a => a.progress === 100).map(a => ({ value: a.id, name: a.name }));
}

    updateAchiementTags();

    $: if (achievements) {
        updateAchiementTags();
    }



</script>

<Img src="/about/3-square.webp" alt="{profileData.username}" size="w-72" imgClass="h-72" class="rounded-full m-auto" />


<Section name="crudcreateform" sectionClass="mt-0">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
    <form on:submit={handleSubmit}>
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div class="sm:col-span-2">
          <Label for="name" class="mb-2">Username</Label>
          <Input type="text" id="name"  required value={profileData.username}/>
        </div>
        <div class="w-full">
          <Label for="brand" class="mb-2">First Name</Label>
          <Input type="text" id="brand" required value={profileData.firstName}/>
        </div>
        <div class="w-full">
          <Label for="price" class="mb-2">Last Name</Label>
          <Input type="text" id="price" required value={profileData.lastName}/>
        </div>
        <div class="w-full">
            <Label for="email" class="mb-2">Email</Label>
            <Input type="text" id="price" required value={profileData.email}/>
        </div>
        <div class="w-full">
          <Label for="weight" class="mb-2">Achiement Tag</Label>
          <Select class="mt-2" items={achiementTags} bind:value={selected} required/>
        </div>
        <div class="sm:col-span-2">
          <Label for="description" class="mb-2">Description</Label>
          <Textarea id="description" placeholder="Your description here" rows="4" name="description" required />
        </div>
        <Button type="submit" class="w-36">Update Profile</Button>
      </div>
    </form>
  </Section>


<Card padding="xl" class="m-auto mb-32">
    <List tag="ul" list="none" class="max-w-xl w-72 divide-y divide-gray-200 dark:divide-gray-700">
        <p class="text-xl dark:text-white">Achiements</p>

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
</Card>