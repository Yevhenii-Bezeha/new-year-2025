import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/new-year-2025/", // Change this to your repository name
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "icons/*.png"],
      manifest: {
        name: "Together Time Evening",
        short_name: "Together Time",
        description: "Make every moment special with your loved one",
        theme_color: "#4f46e5",
        start_url: "/new-year-2025/", // Change this to your repository name
        scope: "/new-year-2025/", // Change this to your repository name
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
