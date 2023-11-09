<script lang="ts">
  import Login from '$lib/components/auth/Login.svelte';
  import SignUp from '$lib/components/auth/SignUp.svelte';
  
  let loginState = true;

  function handleToggle(event: { detail: { newLoginState: boolean; }; }) {
    loginState = event.detail.newLoginState;
  }

</script>

{#if loginState}
  <Login on:toggle={handleToggle}/>
{:else}
  <SignUp on:toggle={handleToggle}/>
{/if}
