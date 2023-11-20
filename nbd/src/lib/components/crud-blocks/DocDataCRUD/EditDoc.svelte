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

    let deleteModal = false;

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
            resetFormFields();
        } catch (e) {
            console.error('Error updating document: ', e);
        }
    } else {
        console.error('No user is logged in or docID is missing');
    }
}



async function deleteDocSubmit() {
    if (docID) {
        const docRef = doc(db, 'docData', docID);

        try {
            await deleteDoc(docRef);
            console.log('Document successfully deleted!');

            // Reset the docID and close the modal if necessary
            docID = '';
            defaultModal = false;

            // Refresh or update your component state as needed
            // e.g., refetching data if you're displaying a list of documents
        } catch (e) {
            console.error('Error deleting document:', e);
        }
    } else {
        console.error('Document ID is missing');
    }
}









function resetFormFields() {
    title = '';
    desc = '';
    url = '';
    rating = 0;
    ratingComment = '';
    tags = '';
    category = '';
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

        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit Doc</h3>

        <Label class="space-y-2">
            <span>URL Link</span>
            <Input bind:value={url} type="url" name="urlLink" placeholder="Enter URL link" />
        </Label>

        <Label class="space-y-2">
            <span>Title</span>
            <Input bind:value={title} type="text" name="title" placeholder="Enter title" required />
        </Label>

        <Label class="space-y-2">
            <span>Description</span>
            <Textarea bind:value={desc} name="description" placeholder="Enter description" required></Textarea>
        </Label>

        <Label class="space-y-2">
            <span>Rating</span>
            <Input bind:value={rating} type="number" name="rating" placeholder="Enter rating (1-10)" min="1" max="10" />
        </Label>

        <Label class="space-y-2">
            <span>Rating Comment</span>
            <Textarea bind:value={ratingComment} name="rating_comment" placeholder="Enter rating comment"></Textarea>
        </Label>

        <Label class="space-y-2">
            <span>Tags</span>
            <Input bind:value={tags} type="text" name="tags" placeholder="Enter tags (comma separated)" />
        </Label>

        <Label class="space-y-2">
            <span>Category</span>
            <Input bind:value={category} type="text" name="category" placeholder="Enter category" />
        </Label>

        <div class="flex gap-4 mt-4">
            <Button type="submit" class="w-1/2">Update</Button>
            <Button type="button" class="w-1/2" on:click={() => (deleteModal = true)} color="alternative">Delete</Button>
        </div>

        </div>
    </form>
</Modal>

<Modal bind:open={deleteModal} size="xs" autoclose backdropClass='fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-80'>
    <div class="text-center">
      <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this doc? This is irreversible!</h3>
        <Button color="red" class="mr-2" on:click={deleteDocSubmit}>Yes, I'm sure</Button>
        <Button color="alternative">No, cancel</Button>
    </div>
</Modal>