/** @format */
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import ViteEslintPlugin from "vite-plugin-eslint";

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  build: { cssCodeSplit: true },
  css: { preprocessorOptions: { less: { javascriptEnabled: true } } },
  plugins: [
    vue(),
    Components({ resolvers: [NaiveUiResolver()] }),
    ViteEslintPlugin(),
  ],
  resolve: {
    alias: {
      "@": resolve("./src/"),
      "@views": resolve("./src/views/"),
      "@components": resolve("./src/components/"),
      "@composables": resolve("./src/composables/"),
      "@layouts": resolve("./src/layouts/"),
      "@stores": resolve("./src/stores/"),
      "@services": resolve("./src/services/"),
      "@helps": resolve("./src/helps/"),
      "@events": resolve("./src/events/"),
      "@constants": resolve("./src/constants/"),
      "@styles": resolve("./src/styles/"),
    },
  },
  server: {
    port: 9999,
    open: true,
    // proxy: {
    //   "/mes-v1": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //   },
    // },
  },
});
