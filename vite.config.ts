import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
  plugins: [stripLucideSourcemaps(), suppressSourceMapWarnings(), react()],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  esbuild: {
    // Ignore source map errors
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ['i18next'], 
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
          three: ['three', 'vanta'],
          utils: ['react-intersection-observer', 'react-helmet-async']
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
