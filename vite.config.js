import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // The preview proxy sends a rotating sandbox hostname, so allow all hosts.
    allowedHosts: true,
    // Bind mounts often don't deliver file events; poll so hot reload works.
    watch: { usePolling: true, interval: 300 },
  },
});
