import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // Generate service worker and manifest
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  // PWA Configuration
  define: {
    __PWA_VERSION__: JSON.stringify(process.env.npm_package_version || "1.0.0"),
    __PWA_BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
});
