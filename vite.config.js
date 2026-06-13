import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        recipe: resolve(__dirname, "recipe.html"),
        favorites: resolve(__dirname, "favorites.html"),
      },
    },
  },
});