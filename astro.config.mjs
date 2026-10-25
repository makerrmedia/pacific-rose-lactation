import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update `site` if the final domain differs.
export default defineConfig({
  site: 'https://pacificroselactation.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
