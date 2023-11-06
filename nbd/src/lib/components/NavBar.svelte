<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    import { DarkMode } from 'flowbite-svelte';
</script>

<Navbar class="bg-transparent text-scorpion-950  dark:bg-scorpion-950">
  <NavBrand href="/">
    <span class="whitespace-nowrap text-xl font-semibold ">NBD</span>
  </NavBrand>

  <NavHamburger/>
    <NavUl ulClass="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium items-center">
      <NavLi href="/" active={true} class="text-scorpion-950">Home</NavLi>
      <NavLi href="/about" class="text-scorpion-950">About</NavLi>
      <NavLi href="/donate" class="text-scorpion-950">Donate</NavLi>
      <NavLi href="/faq" class="text-scorpion-950">FAQ</NavLi>
      <NavLi href="/login" class="text-scorpion-950">Login</NavLi>
      <NavLi href="/account/main" class="text-scorpion-950">Account Demo</NavLi>
      <DarkMode />
    </NavUl>
</Navbar>