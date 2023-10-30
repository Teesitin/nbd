<script lang="ts">
  import { Section, Register } from 'flowbite-svelte-blocks';
  import { Button, Checkbox, Label, Input } from 'flowbite-svelte';

  import { Auth } from '@supabase/auth-ui-svelte';
  import { ThemeSupa } from '@supabase/auth-ui-shared';

  export let data;
</script>
    

<Section name="login">
  <div class="row flex-center flex">
    <div class="col-6 form-widget">
      <Auth
        supabaseClient={data.supabase}
        view="magic_link"
        redirectTo={`${data.url}/auth/callback`}
        showLinks={false}
        appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
      />
    </div>
  </div>
</Section>

<div class="m-auto w-96 text-center">↓↓↓ Make login look like this later! ↓↓↓</div>

<Section name="login">
  <Register href="/">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form class="flex flex-col space-y-6" action="/">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Login</h3>
        <Label class="space-y-2">
          <span>Email</span>
          <Input type="email" name="email" placeholder="" required />
        </Label>
        <Label class="space-y-2">
          <span>Password</span>
          <Input type="password" name="password" placeholder="" required />
        </Label>

        <Button type="submit" class="w-full1">Send Confirmation Email</Button>

      </form>
    </div>
  </Register>
</Section>


