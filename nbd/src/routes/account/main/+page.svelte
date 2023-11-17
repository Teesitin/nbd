<script lang="ts">
  import PopulateCat from '$lib/components/crud-blocks/Category/PopulateCat.svelte';
  import Table from '$lib/components/crud-blocks/Table.svelte';
  import Reviews from '$lib/components/crud-blocks/Reviews.svelte';
  import Settings from '$lib/components/crud-blocks/Settings.svelte';
  import ProfileNew from '$lib/components/crud-blocks/ProfileNew.svelte';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  let currentComponent: string = 'Table';

  import { BottomNav, BottomNavItem, Tooltip } from 'flowbite-svelte';
  import { AdjustmentsVerticalOutline, UserCircleSolid, TableColumnSolid, FolderDuplicateSolid, StarHalfStrokeSolid } from 'flowbite-svelte-icons';
  import AdavanceTable from "$lib/components/crud-blocks/DocDataCRUD/AdavanceTable.svelte";

</script>

{#if currentComponent === 'Table'}
  <AdavanceTable/>
{:else if currentComponent === 'Category'}
  <PopulateCat /> 
{:else if currentComponent === 'Reviews'}
  <Reviews />
{:else if currentComponent === 'Profile'}
  <ProfileNew />
{:else if currentComponent === 'Settings'}
  <Settings />
{/if}

<BottomNav position="fixed" navType="application" classInner="grid-cols-5">
  <BottomNavItem  appBtnPosition="left" on:click={() => currentComponent = 'Table'}>
      <TableColumnSolid class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      <Tooltip arrow={false}>Table</Tooltip>
  </BottomNavItem>

  <BottomNavItem appBtnPosition="middle" on:click={() => currentComponent = 'Category'}>
      <FolderDuplicateSolid class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      <Tooltip arrow={false}>Categories</Tooltip>
  </BottomNavItem>

  <BottomNavItem  appBtnPosition="middle" on:click={() => currentComponent = 'Reviews'}>
      <StarHalfStrokeSolid class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      <Tooltip arrow={false}>Reviews</Tooltip>
  </BottomNavItem>

  <BottomNavItem  appBtnPosition="middle" on:click={() => currentComponent = 'Settings'}>
      <AdjustmentsVerticalOutline class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      <Tooltip arrow={false}>Settings</Tooltip>
  </BottomNavItem>

  <BottomNavItem appBtnPosition="right" on:click={() => currentComponent = 'Profile'}>
      <UserCircleSolid class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      <Tooltip arrow={false}>Profile</Tooltip>
  </BottomNavItem>
</BottomNav>