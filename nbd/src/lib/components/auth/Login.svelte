<script lang="ts">
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input, Helper } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';
    import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
    import { firebaseAuth, provider} from '$lib/firebase';
    import { authUser } from '$lib/authStore';
    import { onMount } from 'svelte';
    import { getAuth, sendPasswordResetEmail } from "firebase/auth";

    const dispatch = createEventDispatcher();

    let email = '';
    let password = '';
    let success: boolean | undefined = undefined;

    // Errors
    let errorCode = '';
    let errorMessage = '';


    function toggleToSignUp() {
        dispatch('toggle', { newLoginState: false });
    }

    const login = () => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {

                $authUser = {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email || ''
                };
            })
            .catch((error) => {
                errorCode = error.code;
                errorMessage = error.message;
                console.log(errorCode, errorMessage);

                success = false;
            });
    };

    const loginWithGoogle = () => {
        signInWithPopup(firebaseAuth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (credential) { const token = credential.accessToken;}
                const user = result.user;

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }; 

    // function validateEmail(email: string): boolean { 
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // }
    // const resetPassword = () => { 
    //     const auth = getAuth();
    //     if (validateEmail(email)) {
    //         sendPasswordResetEmail(auth, email)
    //             .then(() => {
    //                 alert('Please check your email! We\'ve sent you a password reset link.');
    //             })
    //             .catch((error) => {
    //                 errorCode = error.code;
    //                 console.log(errorCode,  "There was an issue with sending the password reset");
    //                 alert(`Failed to send password reset email: ${errorMessage}`);
    //             });
    //     } else {
    //         alert('Your email should follow the format of "name"@"address"."domain", i.e. "jake@statefarm.com".');
    //     }
    // };






    onMount(() => {
        (async () => {
            firebaseAuth.onAuthStateChanged(user => {
                if (user) {
                    goto('/account/main').catch(error => {
                        console.error('Navigation failed', error);
                    });
                }
            });
        })();
    });
</script>

<Section name="login">
    <Register href="/">
        <form on:submit|preventDefault={login}>
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

                <!-- help -->

                <div class="flex items-start">
                    <Checkbox>Remember me</Checkbox>
                    <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500" >Forgot password?</a>
                    <!-- on:click|preventDefault={resetPassword} -->
                </div>

                <div class="flex gap-6">
                    <Button type="button" color="alternative" class="w-1/2"  on:click={toggleToSignUp}>Sign Up</Button>
                    <Button type="submit" class="w-1/2">Sign In</Button>
                </div>

                <div class="flex gap-6 justify-end">
                    <Button class="flex items-center gap-2 w-full" color="alternative" on:click={loginWithGoogle}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="33px" height="33px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                    <span>Sign in with Google</span>
                </Button>
                    
                </div>
            </div>
        </form>        
        {#if errorCode}
            <Helper class='mt-2' color='red'>{errorMessage}</Helper>
        {/if}
    </Register>
</Section>