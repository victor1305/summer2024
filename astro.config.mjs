import { defineConfig } from 'astro/config';
import netlifyIntegration from '@astrojs/netlify';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

export default defineConfig({
  output: 'server',
  adapter: netlifyIntegration(),
  integrations: [tailwind(), react()]
});