<script lang="ts">
    import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
    import { db, firebaseAuth } from '$lib/firebase';
    import { Button, Label, Modal ,Input, Textarea} from 'flowbite-svelte';
    import type { DocData } from '$lib/docData';
    import { authUser } from '$lib/authStore';


    let title = '';
    let desc = '';
    let url = '';
    let rating = 0;
    let ratingComment = '';
    let tags = '';
    let category = '';

    async function addDocSubmit() {

        if ($authUser) {
            const collectionRef = collection(db, 'docData');
            
            const newDoc: DocData = {
                title: title,
                desc: desc,
                url: url,
                rating: rating,
                ratingComment: ratingComment,
                tags: tags,
                category: category,
                owner: $authUser.uid
            };

            try {
                const docRef = await addDoc(collectionRef, newDoc);
                console.log('Document successfully written with ID: ', docRef.id);

                resetFormFields() 

                // Close the modal
                defaultModal = false;
            } catch (e) {
                console.error('Error adding document: ', e);
            }
        } else {
            console.error('No user is logged in');
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

    let defaultModal = false;

</script>

<div class="flex justify-center m-5">
    <Button on:click={() => (defaultModal = true)}>Add Doc</Button>
</div>

<Modal bind:open={defaultModal} size="md" autoclose={false} class="w-full">
    <form on:submit|preventDefault={addDocSubmit}>
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