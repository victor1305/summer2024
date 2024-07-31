import { defineConfig } from 'astro/config';
import vercelServerless from '@astrojs/vercel/serverless';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

export default defineConfig({
  output: 'server',
  adapter: vercelServerless(),
  integrations: [tailwind(), react()]
});