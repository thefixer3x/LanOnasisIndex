import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const stripLucideSourcemaps = () => ({
  name: 'strip-lucide-sourcemaps',
  enforce: 'pre',
  transform(code: string, id: string) {
    if (!id.includes('node_modules/lucide-react/dist/esm')) {
      return null;
    }

    // Remove source map references more aggressively
    const cleaned = code
      .replace(/\/\/#[ \t]*sourceMappingURL=.*\n?/g, '')
      .replace(/\/\/# sourceMappingURL=.*\n?/g, '')
      .replace(/\/\*# sourceMappingURL=.*\*\//g, '');

    return cleaned === code ? null : { code: cleaned, map: null };
  }
});

const suppressSourceMapWarnings = () => ({
  name: 'suppress-sourcemap-warnings',
  configureServer(server: any) {
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      const message = args[0];
      if (typeof message === 'string' && message.includes('Failed to load source map')) {
        return; // Suppress source map warnings
      }
      originalWarn.apply(console, args);
    };
  }
});

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@lanonasis/shared-auth': path.resolve(__dirname, '../../packages/shared-auth/src/index.ts')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
          three: ['three', 'vanta'],
          utils: ['react-intersection-observer', 'react-helmet-async'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true,
    fs: {
      strict: false
    }
  },
  preview: {
    port: 4173,
    host: true
  }
});