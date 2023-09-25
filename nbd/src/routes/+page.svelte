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

    .search-bar {
        width: 300px;
        margin: 20px;
        padding: 10px;
        font-size: 16px;
        color: black;
        background-color: rgba(0, 0, 0, 0.1);

        border: none;
        outline: none;
        border-radius: 9999px;

        transition: background-color 0.3s ease;
    }

    .search-bar:focus {
        background-color: rgba(0, 0, 0, 0.1);
    }



/* Seach Bar */
@import url('https://fonts.googleapis.com/css?family=Inconsolata:700');


.search-bar {

    padding: 10px;
    font-size: 16px;
    font-family: 'Inconsolata';
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    outline: none;
    border-radius: 30px;
    transition: background-color 0.3s ease;

    &:focus {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &::placeholder {
      color: white;
      opacity: 0.5;
    }
  }


</style>

<div class="w-screen h-screen flex justify-center flex-col items-center	border">

    <!-- Hero -->
    <h1 class="text-5xl font-bold m-2">
        Nothing But Docs
    </h1>
    <h2 class="m-2">
        Celebrating good documentation
    </h2>
    
    <!-- Doc Search -->
    <div class="search-container">
        <input type="text" class="search-bar" placeholder="Search...">

        <iconify-icon icon="mdi:home"></iconify-icon>

    </div>

</div>
