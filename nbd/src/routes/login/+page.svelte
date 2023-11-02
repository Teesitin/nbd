<script lang="ts">
  import { Section, Register } from 'flowbite-svelte-blocks';
  import { Button, Checkbox, Label, Input, Modal, Popover } from 'flowbite-svelte';
  import { CheckOutline, CloseOutline } from 'flowbite-svelte-icons';
  let loginState = true;






  
</script>


{#if loginState}
<Section name="login">
  <Register href="/">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form class="flex flex-col space-y-6" action="/">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Login</h3>
        <Label class="space-y-2">
          <span>Email</span>
          <Input type="email" name="email" placeholder="" required />
        </Label>
        <Label class="space-y-2">
          <span>Password</span>
          <Input type="password" name="password" placeholder="" required />
        </Label>
        <div class="flex items-start">
          <Checkbox>Remember me</Checkbox>
          <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
        </div>

        <div class="flex gap-6">
          <Button type="button" color="alternative" class="w-1/2"  on:click={() => loginState = false}>Sign Up</Button>
          <Button type="submit" class="w-1/2">Sign In</Button>
        </div>
      </form>
    </div>
  </Register>
</Section>

{:else}
<Section name="login">
  <Register href="/">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form class="flex flex-col space-y-6" action="/">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign Up</h3>

        <Label class="space-y-2">
          <span>Email</span>
          <Input type="email" name="email" placeholder="" required />
        </Label>

        <Label class="space-y-2">
          <span>Password</span>
          <Input type="password" name="password" placeholder="" required />
        </Label>

        <Label class="space-y-2">
          <span>Username</span>
          <Input type="password" name="password" placeholder="" required />
        </Label>

        <Label class="space-y-2">
          <span>Full Name</span>
          <Input type="password" name="password" placeholder="" />
        </Label>

        <Label class="space-y-2">
          <span>Avatar URL</span>
          <Input type="password" name="password" id="password" placeholder="" />
        </Label>

        <div class="flex gap-6">
          <Button type="button" color="alternative" class="w-1/2" on:click={() => loginState = true}>Go Back</Button>
          <Button type="submit" class="w-1/2">Create Account</Button>
        </div>
      </form>
    </div>
  </Register>
</Section>
{/if}
