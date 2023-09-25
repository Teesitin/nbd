<script>
    import { CalendarWeekSolid } from 'flowbite-svelte-icons';


</script>

<style lang="scss">
      @import url('https://fonts.googleapis.com/css2?family=Telex&display=swap');

    :root {
        --background: #2c2627;
        --action: #dc142f;
        --text: #ededed;
    }

    :global(html) {
        background-color: var(--background);
        color: var(--text);
        font-family: 'Telex', Arial, Helvetica, sans-serif;
    }

    .container{
        border: 2px solid red;
        width: 1200px;
    }


</style>

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
    <h2 class="text-2xl font-bold m-2">
        Completeness and Accuracy
    </h2>

    <p class="m-2">
        Coverage of all essential topics, correctness of information, and inclusion of examples for complex topics.
    </p> 

    <h2 class="text-2xl font-bold m-2">
        Clarity and Consistency
    </h2>

    <p class="m-2">
        Understandability, logical flow of information, consistent terminology, and formatting.
    </p>

    <h2 class="text-2xl font-bold m-2">
        Accessibility and Navigation
    </h2>

    <p class="m-2">
        Accessibility features, ease of navigation through the documentation, and multilingual availability.
    </p>

    <h2 class="text-2xl font-bold m-2">
        Visuals and Interactivity
    </h2>

    <p class="m-2">
        Inclusion and quality of visual aids, interactive examples, and code blocks for hands-on learning.
    </p>

    <h2 class="text-2xl font-bold m-2">
        Support and Community Engagement
    </h2>

    <p class="m-2">
        Availability of support resources, active community forums, and channels for user feedback or contributions to the documentation.
    </p>
    
</div>

