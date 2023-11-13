import solid from "solid-start/vite";
import { defineConfig } from "vite";
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    solid(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    })
  ],
});
