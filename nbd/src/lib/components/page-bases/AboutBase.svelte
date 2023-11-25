<script>
    import { Section, ArticleAuthor, ArticleBody, ArticleHead, ArticleWrapper, BlogHead, BlogBodyWrapper } from 'flowbite-svelte-blocks';
    import { VideoSolid, ArrowRightOutline, NewspaperSolid } from 'flowbite-svelte-icons';



    import {  TeamWrapper, TeamHeader, TeamBody, TeamItem, Facebook, Github, Twitter } from 'flowbite-svelte-blocks';
    let members = [
        {
            href: '/',
            src: '/about/3-square.webp',
            github: "https://github.com/Teesitin",
            alt: 'DeLayne Russell',
            name: 'DeLayne Russell',
            jobTitle: 'CEO & Web Developer',
            description: 'His biggest Dream is to complete this site. He likes Corned Beef and Cabbage.'
        },
        {
            href: '/',
            src: '/about/charity.webp',
            github: "https://github.com/CCRollins",
            alt: 'Charity Rollins',
            name: 'Charity Rollins',
            jobTitle: 'Lost & Confused',
            description: "She's trying to figure out how this thing works. So far, she's only got her Github linked. This is only temporary."
        }
    ];

  </script>
  




    
<Section name="team">
  <TeamWrapper>
    <TeamHeader>
      <svelte:fragment slot="label">The Team Behind Nothing But Docs</svelte:fragment>
      <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">A dedicated team full of dedicated people</p>
    </TeamHeader>
    <TeamBody>
      {#each members as { href, src, alt, github, name, jobTitle, description }}
        <TeamItem {href} {src} {alt} {name} {jobTitle} imgClass="w-96 aspect-square">
          <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
            {description}
          </p>
          <svelte:fragment slot="social">
            <Github href={github} />
          </svelte:fragment>
        </TeamItem>
      {/each}
    </TeamBody>
  </TeamWrapper>
</Section>