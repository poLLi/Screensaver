import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'Clock Screensaver',
    description: 'Hockey clock screensaver with widgets',
    base: '/Screensaver/',
    head: [
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
        ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap' }],
        ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js' }],
        ['script', { src: 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js' }],
    ],
    vite: {
        ssr: {
            noExternal: ['three', 'vanta'],
        },
    },
});
