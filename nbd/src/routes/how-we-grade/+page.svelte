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



<PageBase pageTitle="How We Grade">
    <div class="container m-auto">

        <!-- Title -->
        <h1 class="text-4xl font-bold m-2">
            Grading is subjective, but so is everything else
        </h1>

    <div class="h-10"></div>

        <h2 class="text-2xl font-bold m-2">
            Methodology v1.0
        </h2>

        <h3 class="m-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </h3>

    <div class="h-10"></div>

        <!-- Put Nav Menu Here -->


        <!-- Definitions and Examples -->
        <div class="m-4">
            <h2 class="text-2xl font-bold m-2">
                Document
            </h2>

            <p class="m-2">
                Coverage of all essential topics, correctness of information, and inclusion of examples for complex topics.
            </p> 
        </div>

        <div class="m-4">
            <h2 class="text-2xl font-bold m-2">
                Clarity
            </h2>

            <p class="m-2">
                Understandability, logical flow of information, consistent terminology, and formatting.
            </p>
        </div>

        <div class="m-4">
            <h2 class="text-2xl font-bold m-2">
                Ease-of-Use
            </h2>

            <p class="m-2">
                Accessibility features, ease of navigation through the documentation, and multilingual availability.
            </p>
        </div>

        <div class="m-4">
            <h2 class="text-2xl font-bold m-2">
                Features
            </h2>

            <p class="m-2">
                Inclusion and quality of visual aids, interactive examples, and code blocks for hands-on learning.
            </p>
        </div>

        <div class="m-4">
            <h2 class="text-2xl font-bold m-2">
                Engagement
            </h2>

            <p class="m-2">
                Availability of support resources, active community forums, and channels for user feedback or contributions to the documentation.
            </p>
        </div>
        
    </div>

</PageBase>