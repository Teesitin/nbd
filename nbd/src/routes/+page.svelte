<script lang="ts">
    import HeroSearch from "$lib/components/HeroSearch.svelte";
    import HeroExplain from "$lib/components/HeroExplain.svelte";
    import MethodologyBase from "$lib/components/page-bases/MethodologyBase.svelte";
    import AboutBase from "$lib/components/page-bases/AboutBase.svelte";
    import DonateBase from "$lib/components/page-bases/DonateBase.svelte";
    import FAQBase from "$lib/components/page-bases/FAQBase.svelte";


    import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;

</script>

<svelte:head>
	<title>Nothing But Docs</title>
</svelte:head>

<HeroSearch/>
