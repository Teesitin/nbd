<script>
    import { Section, News, HeroHeader, HeroBody } from 'flowbite-svelte-blocks';
    import { Button } from 'flowbite-svelte';
    import { ArrowRightSolid } from 'flowbite-svelte-icons';
</script>


<Section name="heroDefault">
  <HeroHeader>
    <svelte:fragment slot="h1">Enjoying Nothing But Docs?</svelte:fragment>
    <svelte:fragment slot="paragraph">We know it takes a bit of green to keep the gears spinning, and hey, every little bit helps. With your support, we can keep Nothing But Docs up and running for free! Big thanks for even considering to pitch in!</svelte:fragment>
  </HeroHeader>
  
  <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
    <a href="/">
      <Button size="lg" href="https://paypal.me/DeLayneRussell?country.x=US&locale.x=en_US">
        Donate to the Owner via PayPal<ArrowRightSolid size="md" class="ml-2 -mr-1" />
      </Button>
    </a>
  </div>

  <HeroBody>
  </HeroBody>
</Section>