import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://inthon.fjey.me:8080",
        changeOrigin: true,
        // rewrite 제거: /api/classes -> http://inthon.fjey.me:8080/api/classes
        secure: false,
        ws: true,
      },
    },
  },
});
