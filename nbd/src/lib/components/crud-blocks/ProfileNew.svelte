<script lang="ts">
  import { Card, Button } from 'flowbite-svelte';
  import { List, Li } from 'flowbite-svelte';
  import { Progressbar } from 'flowbite-svelte';

  import { Section } from 'flowbite-svelte-blocks';
  import { Label, Input, Select, Textarea } from 'flowbite-svelte';
  import { Img } from 'flowbite-svelte';

  import { Modal } from 'flowbite-svelte';
  import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
  let popupModal = false;    

  import { goto } from '$app/navigation';
  import { signOut } from 'firebase/auth';
  import { db, firebaseAuth } from '$lib/firebase';
  import { authUser } from '$lib/authStore';
  import { onMount } from 'svelte';
  import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
  import type { ProfileData } from '$lib/profileData';
  import { Toast } from 'flowbite-svelte';
  import { slide } from 'svelte/transition';
  import { quintOut, elasticOut } from 'svelte/easing';
  import { CheckCircleSolid } from 'flowbite-svelte-icons';

  let ach = '';
  let desc = '';
  let name = '';
  let owner = '';
  let url = '';
  let username = '';

  let showToast = false;
 
  const handleLogout = () => {
    signOut(firebaseAuth)
      .then(() => {
        $authUser = undefined;
        goto('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    if ($authUser) {
      const updateProfile: ProfileData = {
        ach,
        desc,
        name,
        url,
        owner,
        username
      };

      try {
        setDoc(doc(db, 'profileData', $authUser.uid), updateProfile);
        showToast = true;
      } catch (e) {
        console.error('Error updating profile: ', e);
      }
    }
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

  onMount(async () => {
      const collectionRef = doc(db, 'profileData', $authUser.uid);
      const querySnapshot = await getDoc(collectionRef);
      const data = querySnapshot.data();
      name = data.name;
      username = data.username;
      desc = data.desc;
      url = data.url;
  });

</script>

<Img src={url} alt="{username}" size="w-72" imgClass="h-72" class="rounded-full m-auto" />


<Section name="crudcreateform" sectionClass="mt-0 mb-10">
    <h2 class="mb-0 text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
    <h2 class="mb-6 text-md font-bold text-gray-900 dark:text-white">{$authUser.email}</h2>
    <form on:submit={handleSubmit}>
      <div class="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-6">
        <div class="sm:col-span-2">
          <Label for="name" class="mb-2">Username</Label>
          <Input type="text" id="name"  required bind:value={username}/>
        </div>
        <div class="w-full">
          <Label for="brand" class="mb-2">Full Name</Label>
          <Input type="text" id="brand" bind:value={name}/>
        </div>
        <!-- <div class="w-full">
          <Label for="weight" class="mb-2">Achiement Tag</Label>
          <Select class="mt-2" items={achiementTags} bind:value={selected} required/>
        </div> -->
        <div class="w-full">
          <Label for="brand" class="mb-2">Image URL</Label>
          <Input type="text" id="brand" bind:value={url}/>
        </div>
        <div class="sm:col-span-2">
          <Label for="description" class="mb-2">Description</Label>
          <Textarea id="description" placeholder="Your description here" rows="4" name="description" bind:value={desc}/>
        </div>
        

        <div class="flex w-96">
          <Button type="submit" class="w-1/2 mr-6">Update Profile</Button>
          <Button type="button" class="w-1/2 mx-6" on:click={() => (popupModal = true)} color="alternative">Log Out</Button>
        </div>
      </div>
    </form>
</Section>

<!-- 
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
</Card> -->

<Modal bind:open={popupModal} size="xs" autoclose>
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Ready to Log Out?</h3>
    <Button class="mr-2" on:click = {handleLogout}>Log Out</Button>
    <Button color="alternative">Nope</Button>
  </div>
</Modal>

{#if showToast}
  <Toast class='z-50 w-42' contentClass="w-full text-md font-normal flex items-center justify-between" position="bottom-right">
    Profile updated!
  </Toast>
{/if}