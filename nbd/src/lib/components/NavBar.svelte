<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>


<Navbar let:hidden let:toggle rounded color="form" class="bg-transparent text-scorpion-50">
    <NavBrand href="/">

      <span class="self-center whitespace-nowrap text-xl font-semibold ">NBD</span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
      <NavLi href="/" active={true} class="text-scorpion-50">Home</NavLi>
      <NavLi href="/how-we-grade" class="text-scorpion-50">Methodology</NavLi>
      <NavLi href="/about" class="text-scorpion-50">About</NavLi>
      <NavLi href="/donate" class="text-scorpion-50">Donate</NavLi>
      <NavLi href="/faq" class="text-scorpion-50">FAQ</NavLi>
    </NavUl>
</Navbar>