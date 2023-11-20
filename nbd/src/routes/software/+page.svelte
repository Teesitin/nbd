<script lang="ts">
    import { authUser } from "$lib/authStore";
    import { collection, getDocs, query, where } from "firebase/firestore";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import type { DocData } from '$lib/docData';
    import { db } from "$lib/firebase";

    export let tag:string;

    const firestoreData = writable<DocData[]>([]);


    onMount(async () => {
        authUser.subscribe(async ($authUser) => {
            if ($authUser) {
                const collectionRef = collection(db, 'docData');
                const q = query(collectionRef, where("tags", "==", tag));
                const querySnapshot = await getDocs(q);
                const docs = querySnapshot.docs.map(doc => ({
                    ...doc.data() as DocData,
                    id: doc.id
                }));
                firestoreData.set(docs);
            }
        });
    });

</script>