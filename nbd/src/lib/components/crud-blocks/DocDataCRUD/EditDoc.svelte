<script lang="ts">
    import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
    import { db, firebaseAuth } from '$lib/firebase';
    import { Button, Label, Modal ,Input, Textarea} from 'flowbite-svelte';
    import type { DocData } from '$lib/docData';
    import { authUser } from '$lib/authStore';

    export let docID = 'jBwzq0g5zzRaoRuxcYVs';

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
            owner: $authUser.uid
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

<a on:click={openEditModal} class="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Edit Doc</a>

<Modal bind:open={defaultModal} size="md" autoclose={false} class="w-full">
    <form on:submit|preventDefault={editDocSubmit}>
        <div class="grid gap-4 mb-4">

        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add New Document</h3>

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

        <Button type="submit" class="w-full mt-6">Add to My List</Button>
        </div>
    </form>
</Modal>