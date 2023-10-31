<script>
    import { Section, ArticleAuthor, ArticleBody, ArticleHead, ArticleWrapper, BlogHead, BlogBodyWrapper } from 'flowbite-svelte-blocks';
    import { VideoSolid, ArrowRightOutline, NewspaperSolid } from 'flowbite-svelte-icons';

    import { Card, Button, Toggle } from 'flowbite-svelte';
    import { Carousel } from 'flowbite-svelte';

    let vCard = false;
    let images = [{ alt: 'DeLayne Russell', srcset: '/about/2.webp' },{ alt: 'DeLayne Russell', srcset: '/about/1.webp' },{ alt: 'DeLayne Russell', srcset: '/about/3.webp' }];

  </script>
  
  <Section name="blog">
    <BlogHead>
      <svelte:fragment slot="h2">The Team Behind Nothing But Docs</svelte:fragment>
      <svelte:fragment slot="paragraph">
        <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">They say there is no 'i' in team.</p>
      </svelte:fragment>
    </BlogHead>

    <div>
      <Card reverse={vCard} class="mb-4 m-auto">
        <div class="max-w-4xl">
          <Carousel {images} duration={3000} let:Indicators class="">
            <Indicators />
          </Carousel>
        </div>

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">DeLayne Russell</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">His biggest Dream is to complete this site. He likes Corned Beef and Cabbage.</p>
        <Button>
          Read more <ArrowRightOutline class="w-3.5 h-3.5 ml-2 text-white" />
        </Button>
      </Card>
  </div>

  </Section>