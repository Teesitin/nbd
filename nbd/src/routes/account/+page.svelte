<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'
	import { Card, Dropdown, DropdownItem, Avatar, Button } from 'flowbite-svelte';
	import { DotsHorizontalOutline } from 'flowbite-svelte-icons';
	import { Label, Input } from 'flowbite-svelte';
	import { Modal } from 'flowbite-svelte';
	
	let defaultModal = false;
	export let data;
	export let form;
	
	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);
	
	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let website: string = profile?.website ?? '';
	let avatarUrl: string = profile?.avatar_url ?? '';
	
	const handleSubmit: SubmitFunction = () => {
	  loading = true;
	  return async () => {
		loading = false;
	  };
	};
	
	const handleSignOut: SubmitFunction = () => {
	  loading = true;
	  return async ({ update }) => {
		loading = false;
		update();
	  };
	};
	
	const submitForm = () => {
	  profileForm.submit();
	};
	
	let signOutForm: HTMLFormElement;
	
	const submitSignOut = () => {
   		signOutForm.submit();
	};

</script>
  
<Card padding="sm">
	<div class="flex flex-col items-center pb-4">
		<Avatar size="lg" src="{avatarUrl}" />
		<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{username}</h5>
		<span class="text-sm text-gray-500 dark:text-gray-400">{fullName}</span>
		<span class="text-sm text-gray-500 dark:text-gray-400">{session.user.email}</span>
		<div class="flex mt-4 space-x-3 lg:mt-6">
			<Button on:click={() => (defaultModal = true)}>Edit</Button>
			<Button color="light" class="dark:text-white">Share</Button>
		</div>
	</div>
</Card>
  
  <Modal title="Update Profile" bind:open={defaultModal} autoclose>  
	<div class="form-widget">
		<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
		>
			<div class="mb-6">
				<Label for="email" class="block mb-2">Email</Label>
				<Input id="email" type="text" value={session.user.email} disabled />
			</div>
			<div class="mb-6">
				<Label for="fullName" class="block mb-2">Full Name</Label>
				<Input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
			</div>
			<div class="mb-6">
				<Label for="username" class="block mb-2">Username</Label>
				<Input id="username" name="username" type="text" value={form?.username ?? username} />
			</div>
			<div class="mb-6">
				<Label for="website" class="block mb-2">Website</Label>
				<Input id="website" name="website" type="url" value={form?.website ?? website} />
			</div>
			<div class="flex">
				<Button on:click={submitForm}>Update</Button>
				<form class="my-2" method="post" action="?/signout" use:enhance={handleSignOut} bind:this={signOutForm}>
					<Button color="light" on:click={submitSignOut}>Sign Out</Button>
				</form>
			</div>
		</form>


	</div>
  </Modal>  