<script>
    import PageBase from "$lib/PageBase.svelte";
</script>

<style lang="scss">
      @import url('https://fonts.googleapis.com/css2?family=Telex&display=swap');

    :root {
        --background: #1e1e1e;
        --action: #dc142f;
        --text: #ededed;
    }

    :global(html) {
        background-color: var(--background);
        color: var(--text);
        font-family: 'Telex', Arial, Helvetica, sans-serif;
    }

    .container {
        width: 1200px;
    }

</style>



<PageBase pageTitle="Donate">
    <div class="container m-auto">

        <!-- Title -->
        <h1 class="text-4xl font-bold m-2">
            Something about a coffee and... food?
        </h1>
        
    </div>

</PageBase>