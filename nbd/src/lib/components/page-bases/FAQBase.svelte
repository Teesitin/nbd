<script lang="ts">import { Section, Faq, FaqItem } from 'flowbite-svelte-blocks';
</script>

<Section name="faq">
  <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently asked questions</h2>
  <Faq>
    <div>
      <FaqItem>
        <svelte:fragment slot="h3">What is Nothing But Doc?</svelte:fragment>
        <p class="text-gray-500 dark:text-gray-400">Think of Nothing But Doc as your go-to spot for software docs. It's a library driven by the communities that use them for all the guides and instructions you need for different software, from the basics of Svelte to the nitty-gritty of Supabase.</p>
      </FaqItem>

      <FaqItem>
        <svelte:fragment slot="h3">How does one become a "Documentarian"?</svelte:fragment>
        <p class="text-gray-500 dark:text-gray-400">That is too many words to put in a single paragraph, but we did try a whole page! Check out how to grade documentation over here.</p>
        <a href="/" class="font-medium  text-primary-600 dark:text-primary-500 hover:underline" target="_blank" rel="noreferrer">How To Doc</a>
      </FaqItem>

      <FaqItem>
        <svelte:fragment slot="h3">How does support work?</svelte:fragment>
        <p class="text-gray-500 dark:text-gray-400">We are a very small team, but open-source! If you have any issues, throw it to our <a href="/how-to-doc" class="font-medium text-primary-600 dark:text-primary-500 hover:underline" target="_blank" rel="noreferrer">GitHub</a>!</p>
        <p class="text-gray-500 dark:text-gray-400">We will in the future have a dedicated email for support.</p>
      </FaqItem>

    </div>
    <div>
      <FaqItem>
        <svelte:fragment slot="h3">What is your monetazation plan? Will you always be free?</svelte:fragment>
        <p class="text-gray-500 dark:text-gray-400">
          Our core features will always be free and never locked behind a paywall overtime. Our current plan for monetazation is to provide a monthly service subscription to only privite your documentation lists. 
        </p>
      </FaqItem>
      <FaqItem>
        <svelte:fragment slot="h3">What does the free version include?</svelte:fragment>
        <p class="text-gray-500 dark:text-gray-400">
          Everything! Well, everything other then privating your documentation lists. All lists on a free account will be public.
        </p>
      </FaqItem>


    </div>
  </Faq>
</Section>