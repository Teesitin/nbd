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
          jobTitle: 'CEO',
          description: 'His biggest Dream is to complete this site. He likes Corned Beef and Cabbage. ㅤ'
      },
      {
          href: '/',
          src: '/about/charity.webp',
          github: "https://github.com/CCRollins",
          alt: 'Charity Rollins',
          name: 'Charity Rollins',
          jobTitle: 'API',
          description: "She's a software engineer in the making! Her hair is full of secrets . . .ㅤㅤㅤㅤ"
      },
      {
          href: '/',
          src: '/about/daniel.webp',
          github: "https://github.com/DMosh235",
          alt: 'Daniel Moshovetis',
          name: 'Daniel Moshovetis',
          jobTitle: 'Front-End',
          description: "His dog can balance Cheetos on his nose while dressed as a turkey!ㅤㅤㅤㅤㅤㅤ"
      },
      {
          href: '/',
          src: '/about/tsehai.webp',
          github: "https://github.com/tsehaiB",
          alt: 'Tsehai Boucaud',
          name: 'Tsehai Boucaud',
          jobTitle: 'Database',
          description: 'Uses her skills earned in tetris and bookshelf organizing to write passable code!'
      },
      {
          href: '/',
          src: '/about/camila.webp',
          github: "https://github.com/camzxx",
          alt: 'Camila Florez',
          name: 'Camila Florez',
          jobTitle: 'Back-End',
          description: "She's a Cloud Software Engineer. She loves to travel and hang out with friends!ㅤ"
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