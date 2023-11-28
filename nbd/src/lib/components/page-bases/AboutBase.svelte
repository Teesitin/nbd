<script>
    import { Section, ArticleAuthor, ArticleBody, ArticleHead, ArticleWrapper, BlogHead, BlogBodyWrapper } from 'flowbite-svelte-blocks';
    import { VideoSolid, ArrowRightOutline, NewspaperSolid } from 'flowbite-svelte-icons';



    import {  TeamWrapper, TeamHeader, TeamBody, TeamItem, Facebook, Github, Twitter } from 'flowbite-svelte-blocks';
    let members = [
        {
            href: '/',
            src: '/about/creators/delayne.webp',
            alt: 'DeLayne Russell',
            name: 'DeLayne Russell',
            jobTitle: 'CEO & Project Manager',
            description: 'His biggest Dream is to complete this site. He likes Corned Beef and Cabbage.'
        },
        {
            href: '/',
            src: '/about/creators/camila.webp',
            alt: 'Camila Florez',
            name: 'Camila Florez',
            jobTitle: 'Back-end',
            description: "She's a Cloud Software Engineer. She loves to travel and hang out with friends!"
        },
        {
            href: '/',
            src: '/about/creators/charity.webp',
            alt: 'Charity Rollins',
            name: 'Charity Rollins',
            jobTitle: 'API',
            description: "She's a software engineer in the making! Her hair is full of secrets..."
        },
        {
            href: '/',
            src: '/about/creators/daniel.webp',
            alt: 'Daniel Moshovetis',
            name: 'Daniel Moshovetis',
            jobTitle: 'Front-end',
            description: "His dog can balance Cheetos on his nose while dressed as a turkey!"
        },
        {
            href: '/',
            src: '/about/creators/tsehai.webp',
            alt: 'Tsehai Boucaud',
            name: 'Tsehai Boucaud',
            jobTitle: 'Database',
            description: 'Uses her skills earned in tetris and bookshelf organizing to write passable code!'
        },

    ];
</script>
  
<Section name="team">
  <TeamWrapper>
    <TeamHeader>
      <svelte:fragment slot="label">The Team Behind Nothing But Docs</svelte:fragment>
      <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">A dedicated team full of dedicated people</p>
    </TeamHeader>
    <TeamBody>
      {#each members as { href, src, alt, name, jobTitle, description }}
        <TeamItem {href} {src} {alt} {name} {jobTitle} imgClass="w-96 aspect-square">
          <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
            {description}
          </p>
          <!-- <svelte:fragment slot="social">
            <Github href="https://github.com/Teesitin" />
          </svelte:fragment> -->
        </TeamItem>
      {/each}
    </TeamBody>
  </TeamWrapper>
</Section>