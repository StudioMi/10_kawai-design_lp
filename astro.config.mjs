import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import { astroImageTools } from "astro-imagetools";
import relativeLinks from "astro-relative-links";

// https://astro.build/config
export default defineConfig({
  build: {
    assets: "assets"
  },
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  },
  server: {
    open: true,
    host: true
  },
  integrations: [tailwind(), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), astroImageTools, relativeLinks({})]
});