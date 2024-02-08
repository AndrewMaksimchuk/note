import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    srcDir: "./web_site",
    publicDir: "./web_public",
    outDir: "./web_static",
    output: "static",
    build: {
        format: "file" // https://docs.astro.build/en/reference/configuration-reference/#buildformat
    },
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            wrap: true,
        },
    },
    devToolbar: {
        enabled: true,
    },
});
