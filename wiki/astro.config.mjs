// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { draft } from './src/site.config.js';

// The wiki is served from /wiki/ on the same address as the calculator.
// build.py writes the calculator to ../dist, and this writes the wiki beside it.
const SITE = 'https://diysolarng.openculture.org.ng';

export default defineConfig({
  site: SITE,
  base: '/wiki',
  outDir: '../dist/wiki',
  integrations: [
    starlight({
      title: 'DIY Solar Nigeria Wiki',
      description:
        'Practical solar knowledge from the DIY Solar Nigeria Telegram group, organised by topic.',
      customCss: ['./src/styles/site.css'],
      components: { Footer: './src/components/Footer.astro', Banner: './src/components/Banner.astro' },
      head: [
        // While the wiki is a draft, ask search engines not to list it.
        ...(draft ? [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } }] : []),
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700&family=Figtree:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
          },
        },
      ],
      sidebar: [
        { label: 'Solar calculator', link: `${SITE}/` },
        { label: 'About this wiki', items: [{ autogenerate: { directory: 'about' } }] },
        { label: 'Plan your system', items: [{ autogenerate: { directory: 'plan-your-system' } }] },
        { label: 'Solar panels', items: [{ autogenerate: { directory: 'panels' } }] },
        { label: 'Lithium batteries', items: [{ autogenerate: { directory: 'lithium-batteries' } }] },
        { label: 'Tubular batteries', items: [{ autogenerate: { directory: 'tubular-batteries' } }] },
        { label: 'Wiring and protection', items: [{ autogenerate: { directory: 'wiring-and-protection' } }] },
        { label: 'Monitoring', items: [{ autogenerate: { directory: 'monitoring' } }] },
      ],
    }),
  ],
});
