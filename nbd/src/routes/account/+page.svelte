<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'

	import { Card, Dropdown, DropdownItem, Avatar, Button } from 'flowbite-svelte';
	import { DotsHorizontalOutline } from 'flowbite-svelte-icons';

	import { Modal } from 'flowbite-svelte';
	let defaultModal = false;

	export let data
	export let form

	let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)

	let profileForm: HTMLFormElement
	let loading = false
	let fullName: string = profile?.full_name ?? ''
	let username: string = profile?.username ?? ''
	let website: string = profile?.website ?? ''
	let avatarUrl: string = profile?.avatar_url ?? ''

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async () => {
			loading = false
		}
	}

	const handleSignOut: SubmitFunction = () => {
		loading = true
		return async ({ update }) => {
			loading = false
			update()
		}
	}
</script>
  
<Card padding="sm">
	<div class="flex flex-col items-center pb-4">
		<Avatar size="lg" src="/images/profile-picture-3.webp" />
		<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">DeLayne Russell</h5>
		<span class="text-sm text-gray-500 dark:text-gray-400">teesitin.russell@gmail.com</span>
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
		<div>
			<label for="email">Email</label>
			<input id="email" type="text" value={session.user.email} disabled />
		</div>

		<div>
			<label for="fullName">Full Name</label>
			<input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
		</div>

		<div>
			<label for="username">Username</label>
			<input id="username" name="username" type="text" value={form?.username ?? username} />
		</div>

		<div>
			<label for="website">Website</label>
			<input id="website" name="website" type="url" value={form?.website ?? website} />
		</div>

		<div>
			<input
				type="submit"
				class="button block primary"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<div>
			<button class="button block" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>

	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
	<svelte:fragment slot="footer">
	  <Button on:click={() => alert('Handle "success"')}>I accept</Button>
	  <Button color="alternative">Decline</Button>
	</svelte:fragment>
  </Modal>