import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://AndrewMaksimchuk.github.io',
    base: '/note',
    srcDir: "./web_site",
    publicDir: "./web_public",
    outDir: "./web_static",
    output: "static",
    build: {
        format: "file"
    },
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            wrap: true,
        },
    },
    devToolbar: {
        enabled: false,
    },
});