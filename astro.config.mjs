import { defineConfig } from 'astro/config';
import vercelServerless from '@astrojs/vercel/serverless';
import tailwind from "@astrojs/tailwind";
import { VitePWA } from "vite-plugin-pwa"
import react from "@astrojs/react";

export default defineConfig({
  output: 'server',
  adapter: vercelServerless({
    imageService: true,
  }),
  integrations: [tailwind(), react()],
  vite: {
		build: {
			cssMinify: "lightningcss",
		},
		ssr: {
			noExternal: ["path-to-regexp"],
		},
		plugins: [
			VitePWA({
				registerType: "autoUpdate",
				workbox: {
					globDirectory: ".vercel/output/static",
					globPatterns: ["**/*.{html,js,css,woff,woff2,ttf,eot,ico}"],
					runtimeCaching: [
						{
							urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
							handler: "CacheFirst",
							options: {
								cacheName: "images",
								expiration: {
									maxEntries: 100,
									maxAgeSeconds: 30 * 24 * 60 * 60,
								},
							},
						},
						{
							urlPattern: /\.(?:woff|woff2|ttf|eot|ico)$/,
							handler: "CacheFirst",
							options: {
								cacheName: "fonts",
								expiration: {
									maxEntries: 10,
									maxAgeSeconds: 30 * 24 * 60 * 60,
								},
							},
						},
					],
					navigateFallback: null,
				},
			}),
		],
	},
});
