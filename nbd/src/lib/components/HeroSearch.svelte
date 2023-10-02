<script>
</script>

<style lang="scss">

    :global(html) {
        color: var(--text);
        
        font-family: 'Telex', Arial, Helvetica, sans-serif;
    }





/* Seach Bar */
.search-bar {
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 18px;
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



    <div class="w-full h-96 flex justify-center flex-col items-center">

        <!-- Hero -->
        <h1 class="text-5xl font-bold m-2 text-scorpion-50 text-center">
            Nothing But Docs
        </h1>

        <h2 class="m-2 text-scorpion-50">
            Celebrating good documentation
        </h2>
        
        <!-- Doc Search -->
        <div class="search-container m-4 flex justify-center items-center border-violet-400 border-solid gap-4 flex-col w-72 sm:flex-row w-96">
            <input type="text" class="search-bar w-full sm:w-5/6 " placeholder="Search for Software...">

            <div class="w-10 h-10 bg-scorpion-50 rounded-full flex justify-center items-center transform transition-transform duration-300 hover:scale-110 cursor-pointer">
                <svg class="w-6 h-6 p-1 text-scorpion-950 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
        </div>

    </div>

