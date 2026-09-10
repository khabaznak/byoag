# BYOAg Website

Public website and implementation guide for BYOAg — Bring Your Own Agent.

BYOAg is an open architectural pattern in active development for bringing a user-owned AI agent into a platform-controlled experience through explicit identity, scoped authority, and clean separation. The site documents the concept, working 0.1 protocol binding, reference plugin, trust model, adoption patterns, implementation guidance, and project status.

## Local Setup

```sh
npm install
npm run dev
```

The dev server runs locally through Astro.

## Commands

```sh
npm run dev       # Start local development
npm run format    # Format source files
npm run lint      # Check formatting
npm run typecheck # Run Astro and TypeScript checks
npm run build     # Type-check and build production output
```

## Project Structure

```text
src/
  components/     Shared UI components
  config/         Site metadata, documentation navigation, and replaceable links
  layouts/        Base HTML layout and metadata
  pages/          Static routes, including protocol and build guides
  styles/         Global CSS variables and utilities
public/           Static assets, robots.txt, favicon, social card
```

## Deployment

This is a static Astro site suitable for Cloudflare Pages.

Recommended Cloudflare Pages settings:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: current LTS

The canonical site URL is configured as `https://byoag.ai` in `astro.config.mjs`.

Cloudflare Pages should deploy the `main` branch after the production build succeeds. The repository intentionally contains no application server, authentication layer, database, or runtime secrets.

## Editing Content

Most page content lives in `src/pages`. Documentation navigation and status labels live in `src/config/navigation.ts`. Shared navigation, repository links, social metadata, and the replaceable adoption-inquiry destination live in `src/config/site.ts`.

## Status

The repository contains a working 0.1 implementation target and remains in active development. Keep protocol maturity, implemented behavior, planned features, and production-readiness claims clearly separated.
