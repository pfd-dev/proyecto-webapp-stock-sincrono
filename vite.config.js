import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    root: '.',              // Carpeta base
    base: './',
    publicDir: 'public',    // Archivos estáticos
    build: {
        outDir: 'dist',     // Carpeta de salida
        rollupOptions: {
            input: {
                // Clave: nombre del chunk, Valor: ruta del archivo HTML
                main: resolve(__dirname, 'index.html'),
                dashboard: resolve(__dirname, 'pages/page-dashboard.html'),
                shopping: resolve(__dirname, 'pages/page-shopping-cart.html'),
                formLogin: resolve(__dirname, 'pages/page-formulario-login.html'),
                createProduct: resolve(__dirname, 'pages/page-create-product.html'),
                removeProduct: resolve(__dirname, 'pages/page-remove-product.html'),
                updateProduct: resolve(__dirname, 'pages/page-update-product.html'),
            },
        },
    },
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Sistema de Stock',
                short_name: 'StockApp',
                start_url: '/',
                display_override: ['window-controls-overlay'],
                lang: 'es-ES',
                display: 'standalone',
                background_color: 'rgb(30, 30, 30)',
                theme_color: 'rgb(255, 0, 0)',
                icons: [
                    {
                        src: '/icon-pwa-64x.png',
                        sizes: '64x64',
                        type: 'image/png',
                    },
                    {
                        src: '/icon-pwa-144x.png',
                        sizes: '144x144',
                        type: 'image/png',
                    },
                    {
                        src: '/icon-pwa-192x.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/icon-pwa-512x.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            }
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    server: {
        port: 3000,     // Puerto del servidor
        open: true,      // Abre el navegador al iniciar
    },
});