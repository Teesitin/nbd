<script lang="ts">
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Label, Input, Helper } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { db, firebaseAuth } from '$lib/firebase';
    import { getDatabase, ref, set } from "firebase/database";
    import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
    import { authUser } from '$lib/authStore';


    const dispatch = createEventDispatcher();

    function toggleToLogin() {
        dispatch('toggle', { newLoginState: true });
    }

    

    // SignUp Variables
    let email = '';
    let password = '';
    let passwordStrength = '';
    let errorMessage: string = '';

    // Profile Var
    let username = '';
    let full_name = '';
    let avatar_url = '';
    let website = '';

    // Functions
    function checkPasswordStrength(pass: string) {
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
        let mediumPassword = new RegExp('^(?=.*[!@#$%^&*]).{8,}$');
        errorMessage = '';

        if (strongPassword.test(pass)) {
            return 'Strong';
        } else if (mediumPassword.test(pass)) {
            return 'Medium';
        } else {
            return 'Weak';
        }
    }

    $: passwordStrength = checkPasswordStrength(password);


    // Errors
    let errorCode = '';
    let errorMessageReg = '';
    let emailInUse = false;
    let unknownCode = false;
    let success: boolean | undefined = undefined;


    // Sign Up
    const register = async () => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then(async () => {
                toggleToLogin();


                const collectionRef = collection(db, 'profileData');

                const newProfile = {
                    ach: '',
                    desc: '',
                    url: avatar_url,
                    name: full_name,
                    owner: $authUser.uid,
                    username: username
                };

                setDoc(doc(db, 'profileData', $authUser.uid), newProfile);
            })
            .catch((error) => {
                errorCode = error.code;
                errorMessageReg = error.message;
                console.log(errorCode);

                if(errorCode == 'auth/email-already-in-use') {
                        emailInUse = true;
                } else {
                        unknownCode = true;
                }

                success = false;
            });
    };




</script>

<Section name="login">
    <Register href="/">
        <form on:submit|preventDefault={register}>
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
                    <Input type="text" name="fullName" placeholder="" bind:value={full_name}/>
                </Label>

                <Label class="space-y-2">
                    <span>Avatar URL</span>
                    <Input type="url" name="avatar_url" id="password" placeholder="" bind:value={avatar_url}/>
                </Label>

                <div class="flex gap-6">
                    <Button type="button" color="alternative" class="w-1/2" on:click={toggleToLogin}>Go Back</Button>
                    <Button type="submit" class="w-1/2">Create Account</Button>
                </div>

                {#if emailInUse}
                    <Helper class='mt-2' color='red'>Email already in use</Helper>
                {/if}

                {#if unknownCode}
                    <Helper class='mt-2' color='red'>{errorMessageReg}</Helper>
                {/if}
            </div>
        </form>
    </Register>
</Section>
