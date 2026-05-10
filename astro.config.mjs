import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

export default defineConfig({
  server: { port: 4444 },
  trailingSlash: "never",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react({
      include: [
        "**/components/**/*.jsx",
        "**/components/**/*.tsx",
      ],
    }),
  ],
});
