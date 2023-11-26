<script lang="ts">
    import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
    import { db, firebaseAuth } from '$lib/firebase';
    import { Button, Label, Modal ,Input, Textarea} from 'flowbite-svelte';
    import type { DocData } from '$lib/docData';
    import { authUser } from '$lib/authStore';
    import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

    export let docID = 'jBwzq0g5zzRaoRuxcYVs';
    export let clickableTitle = 'View Doc';

    async function loadDoc() {
        console.log(docID);


        if (!docID) return;

        const docRef = doc(db, 'docData', docID);
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data() as DocData;
                title = data.title;
                desc = data.desc;
                url = data.url;
                rating = data.rating;
                ratingComment = data.ratingComment;
                tags = data.tags;
                category = data.category;
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error loading document:', error);
        }
    }


    let title = '';
    let desc = 'This is the basic description of a certain document that you can now read';
    let url = '';
    let rating = 3;
    let ratingComment = 'This is a test comment to display the basic functionality';
    let tags = 'AI, LLM, Forbidden, ChatGPT, Software';
    let category = 'Language Model';

    async function editDocSubmit() {
    if ($authUser && docID) {
        const docRef = doc(db, 'docData', docID);
        
        const updatedDoc: DocData = {
            title,
            desc,
            url,
            rating,
            ratingComment,
            tags,
            category,
            owner: $authUser.uid,
            id: ''
        };

        try {
            await setDoc(docRef, updatedDoc);
            console.log('Document successfully updated!');

            // Close the modal and reset form fields test
            defaultModal = false;
        } catch (e) {
            console.error('Error updating document: ', e);
        }
    } else {
        console.error('No user is logged in or docID is missing');
    }
    }

    // Function to generate stars based on the rating
    function generateStars() {
            const maxRating = 5;
            const numberOfStars = Math.floor(rating);

            // Create an array with the length of maxRating
            return Array.from({ length: maxRating }, (_, index) => ({
                filled: index < numberOfStars, // Determine if the star should be filled or empty
            }));
        }

        // Call the function to get the array of stars
        const stars = generateStars();

        function getCondensedUrl(url: string) {
            const urlObject = new URL(url);
            const condensedPath = urlObject.pathname.length > 20 ? urlObject.pathname.substr(0, 20) + '...' : urlObject.pathname;
            return `${urlObject.hostname}${condensedPath}`;
        }


    function openEditModal() {
        loadDoc();
        defaultModal = true;
    }



    let defaultModal = false;

</script>

<a on:click={openEditModal} class="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">{clickableTitle}</a>

<Modal bind:open={defaultModal} size="md" autoclose={false} class="w-full">
    <form on:submit={editDocSubmit}>
        <div class="grid gap-4 mb-4">

            <h3 class="mb-4 text-3xl font-medium font-bold text-primary-800">{title}</h3>

        <div class="grid grid-cols-2">
            <Label class="space-y-2">
                <span class="text-xl">URL Link</span>
                <div>
                    {#if url}
                        <a href={url} target="_blank" rel="noopener noreferrer" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            {getCondensedUrl(url)}
                        </a>
                    {:else}
                        <p class="text-gray-500 dark:text-gray-400">No URL available</p>
                    {/if}
                </div>
            </Label>
    
            <Label class="space-y-2">
                <span class="text-xl">Rating</span>
                <div class="flex items-center">
                    {#each stars as { filled }, i}
                        {#if filled}
                            <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        {:else}
                            <svg class="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        {/if}
                    {/each}

                    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{rating.toFixed(2)}</p>
                    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
                </div>
            </Label>
    
        </div>



        <Label class="space-y-2">
            <span>Description</span>
            {#if desc && desc.length > 0}
                <p class="mb-3 text-gray-500 dark:text-gray-400">{desc}</p>
            {:else}
                <p>No description available.</p>
            {/if}
        </Label>

    

        <Label class="space-y-2">
            <span>Rating Comment</span>
            <div class="max-w-xl mb-4">
                {#if ratingComment && ratingComment.length > 0}
                    <div class="bg-scorpion-0 dark:bg-scorpion-950 rounded-lg p-4 shadow-md">
                        <p class="text-gray-500 dark:text-white">{ratingComment}</p>
                    </div>
                {:else}
                    <p>No comments available.</p>
                {/if}
            </div>
        </Label>

        <Label class="space-y-2">
            <span>Tags</span>
            <div class="flex flex-wrap gap-2">
                {#each tags.split(',') as tag (tag)}
                    <span class="flex-grow-0 flex-shrink-0 px-3 py-1 mb-2 bg-primary-800 text-white rounded-md h-8">{tag}</span>
                {/each}
            </div>
              
        </Label>

        <Label class="space-y-2">
            <span class="text-l">Category</span>
            <div class="flex flex-wrap gap-2">
                {#if category}
                    <span class="flex-grow-0 flex-shrink-0 px-3 py-1 mb-2 bg-primary-800 text-white rounded-md h-8">{category}</span>
                {/if}
            </div>
        </Label>

        </div>
    </form>
</Modal>
