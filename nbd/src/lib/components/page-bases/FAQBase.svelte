<script lang="ts">import { Section, Faq, FaqItem } from 'flowbite-svelte-blocks';
</script>

<Section name="faq">
  <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently asked questions</h2>
  <Faq>
    <div>
      <FaqItem>
        <svelte:fragment slot="h3">What does NDB do?</svelte:fragment>
        <p class="text-gray-500 dark:text-gray-400">...</p>
      </FaqItem>
      <FaqItem>
        <svelte:fragment slot="h3">How does one become a Documentarian?</svelte:fragment>
        <p class="text-gray-500 dark:text-gray-400">...</p>
      </FaqItem>
      <FaqItem>
        <svelte:fragment slot="h3">How does support work?</svelte:fragment>
        <p class="text-gray-500 dark:text-gray-400">We are a very small team, but open-source! If you have any issues, throw it to our <a href="/" class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline" target="_blank" rel="noreferrer">GitHub</a>!</p>

      </FaqItem>

    </div>
    <div>
      <FaqItem>
        <svelte:fragment slot="h3">What is your monetazation plan? Will you always be free?</svelte:fragment>
        <p class="text-gray-500 dark:text-gray-400">
          Our core features will always be free and never locked behind a paywal overtime. Our current plan for monetazation is to provide a monthly service subscription to only privite your documentation lists. 
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