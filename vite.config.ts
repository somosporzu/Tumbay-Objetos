import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

// Plugin to automatically copy index.html to 404.html for GitHub Pages SPA compatibility
function githubPagesSpaPlugin() {
  return {
    name: 'github-pages-spa',
    closeBundle() {
      try {
        const distIndex = path.resolve(import.meta.dirname, 'dist', 'index.html');
        const dist404 = path.resolve(import.meta.dirname, 'dist', '404.html');
        if (fs.existsSync(distIndex)) {
          fs.copyFileSync(distIndex, dist404);
        }
      } catch (e) {
        // Non-blocking in case dist is elsewhere
      }
    },
  };
}

export default defineConfig(() => {
  return {
    // Relative base path ensures all assets load properly on GitHub Pages subpaths (e.g. username.github.io/repo-name/)
    base: './',
    plugins: [react(), tailwindcss(), githubPagesSpaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
