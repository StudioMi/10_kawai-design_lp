/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
