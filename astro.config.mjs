import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import restorationCss from "./scripts/restoration-css.mjs";
import siteRoutes from "./scripts/site-routes.mjs";

export default defineConfig({
  server: { port: 4444 },
  trailingSlash: "never",
  redirects: {
    "/mockup-ar": "/actionrestoration",
    "/actionrestoration/gallery": "/actionrestoration/about-us",
    "/actionrestoration/service": "/actionrestoration/services",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    siteRoutes(),
    restorationCss(),
    react({
      include: [
        "**/components/**/*.jsx",
        "**/components/**/*.tsx",
      ],
    }),
  ],
});
