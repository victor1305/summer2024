import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

export default defineConfig({
  site: "https://summer2024-three.vercel.app",
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind(), react()]
});