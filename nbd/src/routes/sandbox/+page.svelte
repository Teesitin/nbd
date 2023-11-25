<script lang="ts">
    import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
    import { db, firebaseAuth } from '$lib/firebase';
    import { Button, Label, Modal ,Input, Textarea} from 'flowbite-svelte';
    import type { DocData } from '$lib/docData';
    import { authUser } from '$lib/authStore';
    import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

    export let docID = 'jBwzq0g5zzRaoRuxcYVs';
    export let clickableTitle = 'Edit Doc';

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
    let desc = '';
    let url = '';
    let rating = 0;
    let ratingComment = '';
    let tags = '';
    let category = '';

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

            // Close the modal and reset form fields
            defaultModal = false;
        } catch (e) {
            console.error('Error updating document: ', e);
        }
    } else {
        console.error('No user is logged in or docID is missing');
    }
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

        <h3 class="mb-4 text-3xl font-medium font-bold text-primary-800">Forbidden Software</h3>

        <div class="grid grid-cols-2">
            <Label class="space-y-2">
                <span class="text-xl">URL Link</span>
                <div>
                    <a href="https://chat.openai.com/" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">www.HeWhoShallNotBeNamed.com</a>
                </div>
            </Label>
    
            <Label class="space-y-2">
                <span class="text-xl">Rating</span>
                <div class="flex items-center">
                    <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
                    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
    
                </div>
    
            </Label>
        </div>



        <Label class="space-y-2">
            <span>Description</span>
            <p class="mb-3 text-gray-500 dark:text-gray-400">**REDACTED**, a revolutionary conversational AI platform from OpenAI, is built upon the formidable GPT-3.5 architecture, a preeminent model in natural language processing. With 175 billion parameters, GPT-3.5 boasts unparalleled language comprehension and generation capabilities. Its transformer architecture enables parallel processing, ensuring efficient handling of complex conversational scenarios. The platform's key features include natural language understanding, allowing it to grasp both explicit and implicit user inputs, and context retention, facilitating coherent and meaningful responses over extended dialogues. Noteworthy is **REDACTED**'s multifunctional capacity, making it applicable across diverse domains, from code generation and problem-solving for software developers to content creation and customer support. The platform offers the flexibility of fine-tuning for users with specific needs, enabling customization and optimization. In practical terms, developers can leverage **REDACTED** for code assistance, obtaining code snippets and algorithm explanations through natural language prompts. Content creators benefit from the model's creative writing assistance, brainstorming ideas and generating high-quality content. Businesses find value in integrating **REDACTED** into customer support systems, enhancing responsiveness and user experience. As a software developer, embracing **REDACTED** in projects opens avenues for improved user interactions, heightened productivity, and innovation across various applications, be it chatbots, content generation tools, or interactive systems. In essence, **REDACTED** is a powerful ally at the forefront of conversational AI, offering unparalleled capabilities that elevate software development to new heights.</p>

        </Label>

    

        <Label class="space-y-2">
            <span>Rating Comment</span>
            <div class="bg-opacity-50 dark:bg-opacity-80 max-w-xl mx-auto">

                <div class="bg-scorpion-0 dark:bg-scorpion-950 rounded-lg p-4 mb-4 shadow-md">
                  <div class="flex items-center">
                    <div>
                      <span class="text-gray-500 dark:text-white text-sm">Posted on 2023-11-25</span>
                    </div>
                  </div>
                  <p class="text-gray-500 dark:text-white mt-2">
                    This is the first comment. It can be as long or as short as needed. You can customize the styling based on your design preferences.
                  </p>
                </div>
            
                <div class="bg-scorpion-0 dark:bg-scorpion-950 rounded-lg p-4 mb-4 shadow-md">
                  <div class="flex items-center">
                    <div>
                      <span class="text-gray-500 dark:text-white text-sm">Posted on 2023-11-24</span>
                    </div>
                  </div>
                  <p class="text-gray-500 dark:text-white mt-2">
                    Another user added a comment. Tailwind CSS classes are used for styling, providing a clean and responsive design.
                  </p>
                </div>
            
              </div>
        </Label>

        <Label class="space-y-2">
            <span>Tags</span>
            <div class="flex flex-wrap gap-2">
                <span class="flex-grow-0 flex-shrink-0 px-3 py-1 mb-2 bg-primary-800 text-white rounded-md h-8">Technology</span>
                <span class="flex-grow-0 flex-shrink-0 px-3 py-1 mb-2 bg-primary-800 text-white rounded-md h-8">Programming</span>
                <span class="flex-grow-0 flex-shrink-0 px-3 py-1 mb-2 bg-primary-800 text-white rounded-md h-8">Web Development</span>
                <span class="flex-grow-0 flex-shrink-0 px-3 py-1 mb-2 bg-primary-800 text-white rounded-md h-8">Design</span>
                <span class="flex-grow-0 flex-shrink-0 px-3 py-1 mb-2 bg-primary-800 text-white rounded-md h-8">Artificial Intelligence</span>
                <span class="flex-grow-0 flex-shrink-0 px-3 py-1 mb-2 bg-primary-800 text-white rounded-md h-8">Data Science</span>
                <span class="flex-grow-0 flex-shrink-0 px-3 py-1 mb-2 bg-primary-800 text-white rounded-md h-8">Startups</span>
              </div>
              
              
        </Label>

        <Label class="space-y-2">
            <span class="text-l">Category</span>
            <div>
                <span class="flex-grow-0 flex-shrink-0 px-3 py-1 mb-2 bg-primary-800 text-white rounded-md h-8">Artifical Intelligence</span>
            </div>
        </Label>

        </div>
    </form>
</Modal>
