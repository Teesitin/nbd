<script lang="ts">
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let email = '';
    let password ='';


    function toggleToSignUp() {
        dispatch('toggle', { newLoginState: false });
    }


// Sign In
    async function signIn() {
    }


</script>

<Section name="login">
    <Register href="/">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Login</h3>

            <Label class="space-y-2">
                <span>Email</span>
                <Input type="email" name="email" placeholder="" required bind:value={email}/>
            </Label>

            <Label class="space-y-2">
                <span>Password</span>
                <Input type="password" name="password" placeholder="" required bind:value={password}/>
            </Label>

            <div class="flex items-start">
                <Checkbox>Remember me</Checkbox>
                <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
            </div>

            <div class="flex gap-6">
                <Button type="button" color="alternative" class="w-1/2"  on:click={toggleToSignUp}>Sign Up</Button>
                <Button type="button" class="w-1/2" on:click={signIn}>Sign In</Button>
            </div>
        </div>
    </Register>
</Section>
  