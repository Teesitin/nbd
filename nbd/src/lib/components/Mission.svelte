<script lang="ts">import { Section, ContentWithImage } from 'flowbite-svelte-blocks';
</script>

<Section name="contentwithimg">
  <ContentWithImage>
    <svelte:fragment slot="h2">The Mission for NBD</svelte:fragment>
    <p class="mb-4">
        Our mission at Nothing But Docs is to simplify the software documentation journey by providing an intuitive, user-friendly platform that supports and empowers developers to create, share, and manage high-quality documentation.
        We are committed to fostering a collaborative ecosystem that enables continuous learning and growth, ensuring that software documentation remains accessible, organized, and up-to-date for the global tech community.
    </p>

    <p class="mb-4">
        Through you, yes you, we can provide everyone the best documentation for every software out there! 
    </p>

    <svelte:fragment slot="image">
      <img class="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
      <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
    </svelte:fragment>
  </ContentWithImage>
</Section>