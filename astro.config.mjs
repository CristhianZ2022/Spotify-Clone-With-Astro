// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  output: 'server',
  integrations: [svelte(), react()],

  env: {
    schema: {
      SHOW_PLAY_BUTTON: envField.boolean({ default: true, context: 'server', access: 'public' }),
      SHOW_SEARCH_BUTTON: envField.boolean({ default: true, context: 'server', access: 'public' }),
    }
  },

  adapter: vercel()
});