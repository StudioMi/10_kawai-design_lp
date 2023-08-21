import { defineConfig as imageConfig } from "astro-imagetools/config";

export default imageConfig({
  format: ["avif", "webp"],
  fallbackFormat: "png",
  placeholder: "none",
  breakpoints: { count: 1 },
  cacheDir: "/.cache",
});
