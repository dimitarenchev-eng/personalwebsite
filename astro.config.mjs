import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://enchev.me',
  output: 'static',

  build: {
    inlineStylesheets: 'auto',
  },

  compressHTML: true,
  adapter: cloudflare()
});