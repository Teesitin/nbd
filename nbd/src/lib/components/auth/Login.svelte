<script lang="ts">
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input, Modal, Popover } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function toggleToSignUp() {
    dispatch('toggle', { newLoginState: false });
    }

</script>

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
                <Button type="button" color="alternative" class="w-1/2"  on:click={toggleToSignUp}>Sign Up</Button>
                <Button type="submit" class="w-1/2">Sign In</Button>
            </div>
        </form>
        </div>
    </Register>
</Section>
  