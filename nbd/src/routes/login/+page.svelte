<script lang="ts">
  import { Section, Register } from 'flowbite-svelte-blocks';
  import { Button, Checkbox, Label, Input } from 'flowbite-svelte';

  import { Auth } from '@supabase/auth-ui-svelte';
  import { ThemeSupa } from '@supabase/auth-ui-shared';

  export let data;
</script>
    
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
            <div class="flex items-start">
              <Checkbox>Remember Me</Checkbox>
              <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
            </div>
            <Button type="submit" class="w-full1">Sign in</Button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
            </p>
          </form>
        </div>
      </Register>
    </Section>


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