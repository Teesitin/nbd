<script lang="ts">
  import { authUser } from '$lib/authStore';
</script>

{#if $authUser}
  <p>User is logged in with email: {$authUser.uid}</p>
{:else}
  <p>User is not logged in.</p>
{/if}
