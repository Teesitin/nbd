<script lang="ts">
  import { onMount } from 'svelte';
  import { collection, query, getDocs, where } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  import type { DocData } from '$lib/docData';
  import { writable } from 'svelte/store';
  import CategoryCard from "./CategoryCard.svelte";
    import { authUser } from '$lib/authStore';

  const firestoreData = writable<DocData[]>([]);

  onMount(async () => {
        authUser.subscribe(async ($authUser) => {
            if ($authUser) {
                const collectionRef = collection(db, 'docData');
                const q = query(collectionRef, where("owner", "==", $authUser.uid));
                const querySnapshot = await getDocs(q);
                const docs = querySnapshot.docs.map(doc => ({
                    ...doc.data() as DocData,
                    id: doc.id
                }));
                firestoreData.set(docs);
            }
        });
    });

  let categories: any[] = [];

  $: {
      const allCategories = $firestoreData.map(doc => doc.category);
      categories = [...new Set(allCategories)].map(categoryTitle => ({ categoryTitle, categoryDesc: '' }));
  }
</script>

<div class="grid gap-4 grid-cols-1 grid-rows-3 md:grid-cols-2 xl:grid-cols-3 m-auto max-w-6xl mb-[115px]">
    {#each categories as category}
        <CategoryCard categoryTitle={category.categoryTitle} categoryDesc={category.categoryDesc}/>
    {/each}
</div>
