<script lang="ts">
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';
    import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
    import { firebaseAuth, provider} from '$lib/firebase';
    import { authUser } from '$lib/authStore';
    import { onMount } from 'svelte';



    const dispatch = createEventDispatcher();

    let email = '';
    let password = '';
    let success: boolean | undefined = undefined;

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
                const errorCode = error.code;
                const errorMessage = error.message;
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

                <div class="flex items-start">
                    <Checkbox>Remember me</Checkbox>
                    <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
                </div>

                <div class="flex gap-6">
                    <Button type="button" color="alternative" class="w-1/2"  on:click={toggleToSignUp}>Sign Up</Button>
                    <Button type="submit" class="w-1/2">Sign In</Button>
                </div>
            </div>
        </form>
        <Button on:click={loginWithGoogle}>Sign in with Google</Button>

    </Register>
</Section>
