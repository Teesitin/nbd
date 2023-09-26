<script>
    import PageBase from "$lib/PageBase.svelte";
    import HeroSearch from "$lib/components/HeroSearch.svelte";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

</script>


<PageBase>

      
      <Navbar let:hidden let:toggle rounded color="form">
        <NavBrand href="/">
          <img src="/images/flowbite-svelte-icon-logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
        </NavBrand>
        <NavHamburger on:click={toggle} />
        <NavUl {hidden}>
          <NavLi href="/" active={true}>Home</NavLi>
          <NavLi href="/about">About</NavLi>
          <NavLi href="/docs/components/navbar">Navbar</NavLi>
          <NavLi href="/pricing">Pricing</NavLi>
          <NavLi href="/contact">Contact</NavLi>
        </NavUl>
      </Navbar>


    <HeroSearch>
    </HeroSearch>
</PageBase>