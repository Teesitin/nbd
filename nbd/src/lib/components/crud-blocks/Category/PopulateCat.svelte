<script>
    import CategoryCard from "./CategoryCard.svelte";
    let array = [
                "Front-end",
                "API"
                ];
    let array2 = [
                "Everything you need to build out a modern web-app with a hint of spaghetti and cheese.",
                "Avacadoes, Popsicles, Iguana"
                ];

</script>
  
{#each array as arr, x}
    <CategoryCard categoryTitle = {arr} categoryDesc = {array2[x]}/>
{/each}