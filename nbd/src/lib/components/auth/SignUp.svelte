<script lang="ts">
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input, Modal, Popover } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';
    import { supabase } from '$lib/supabaseClient';


    const dispatch = createEventDispatcher();

    function toggleToLogin() {
        dispatch('toggle', { newLoginState: true });
    }

    // Variables
    let email = '';
    let username = '';
    let fullName = '';
    let avatarUrl = '';
    let password = '';
    let passwordStrength = '';

    let errorMessage: string = '';


    function checkPasswordStrength(pass: string) {
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
        let mediumPassword = new RegExp('^(?=.*[!@#$%^&*]).{8,}$');
        errorMessage = '';

        if(strongPassword.test(pass)) {
        return 'Strong';
        } else if(mediumPassword.test(pass)) {
        return 'Medium';
        } else {
        return 'Weak';
        }
    }

    $: passwordStrength = checkPasswordStrength(password);




    // Sign Up
    async function signUpNewUser() {
        errorMessage = '';

        if (password.length < 6) {
            errorMessage = 'Password must be at least 6 characters long';
            return;
        }

        const { data, error } = await (supabase as any).auth.signUp({
            email,
            password,
            options: {
            redirectTo: '/account/main'
            }
        }); 
    
        if (error) {
            console.error('Error signing up:', error);
        } else {
            console.log('Success! Check your email for the confirmation link.', data);
        }
    }
</script>


<Section name="login">
    <Register href="/">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign Up</h3>

            <Label class="space-y-2">
                <span>Email</span>
            <Input type="email" name="emailNew" required bind:value={email}/>
            </Label>

            <Label class="space-y-2">
                <span>Password</span>
                <Input type="password" name="passwordNew" required bind:value={password} />

                {#if errorMessage}
                    <p class="text-red-500">{errorMessage}</p>
                {:else}
                    <p>Password strength: {passwordStrength}</p>
                {/if}
            </Label>

            <Label class="space-y-2">
                <span>Username</span>
                <Input type="text" name="usernameNew" required bind:value={username}/>
            </Label>

            <Label class="space-y-2">
                <span>Full Name</span>
                <Input type="text" name="fullName" placeholder="" bind:value={fullName}/>
            </Label>

            <Label class="space-y-2">
                <span>Avatar URL</span>
                <Input type="url" name="avatarUrl" id="password" placeholder="" bind:value={avatarUrl}/>
            </Label>

            <div class="flex gap-6">
                <Button type="button" color="alternative" class="w-1/2" on:click={toggleToLogin}>Go Back</Button>
                <Button type="button" class="w-1/2" on:click={signUpNewUser}>Create Account</Button>
            </div>
        </div>
    </Register>
</Section>