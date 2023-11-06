<script>
    import CategoryCard from "./CategoryCard.svelte";
  
    let categories = [
      {
        categoryTitle: "Front-end",
        categoryDesc: "Everything you need to build out a modern web-app with a hint of spaghetti and cheese."
      },
      {
        categoryTitle: "API",
        categoryDesc: "Avocados, Popsicles, Iguana"
      },
      {
        categoryTitle: "Back-end",
        categoryDesc: "The core engine of your application, powering server-side tasks and database interactions."
      },
      {
        categoryTitle: "DevOps",
        categoryDesc: "Streamlining development processes through continuous integration and continuous delivery."
      },
      {
        categoryTitle: "UX/UI Design",
        categoryDesc: "Crafting engaging user experiences and intuitive interfaces."
      },
      {
        categoryTitle: "Machine Learning",
        categoryDesc: "Harnessing data and algorithms to predict patterns and make decisions."
      },
      {
        categoryTitle: "Security",
        categoryDesc: "Protecting systems and data from breaches and attacks."
      },
      {
        categoryTitle: "Mobile Development",
        categoryDesc: "Building apps for iOS and Android platforms."
      },
      {
        categoryTitle: "Quality Assurance",
        categoryDesc: "Ensuring software quality through systematic testing."
      },
      {
        categoryTitle: "Project Management",
        categoryDesc: "Overseeing projects from conception to completion."
      },
      {
        categoryTitle: "Internet of Things",
        categoryDesc: "Connecting and automating everyday objects for smarter living."
      },
      {
        categoryTitle: "Cloud Computing",
        categoryDesc: "Leveraging cloud infrastructure for scalable software solutions."
      },
      {
        categoryTitle: "Blockchain",
        categoryDesc: "Enabling secure, decentralized transactions and data storage."
      }
    ];
</script>

<div class="grid gap-4 grid-cols-1 grid-rows-3 md:grid-cols-2 xl:grid-cols-3 m-auto max-w-6xl ">
    {#each categories as category}
        <CategoryCard categoryTitle={category.categoryTitle} categoryDesc={category.categoryDesc}/>
    {/each}
</div>