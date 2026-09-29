import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, Plugin } from "vite";

const apiMiddlewarePlugin = (): Plugin => ({
  name: "api-middleware",
  configureServer(server) {
    import("./server/api.ts").then(({ apiApp }) => {
      server.middlewares.use(apiApp);
    });
  },
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiMiddlewarePlugin()],
    resolve: {
      alias: {
        "@": path.resolve("."),
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };
});
