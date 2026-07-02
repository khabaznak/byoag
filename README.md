# BYOAg Website

Initial public website for BYOAg — Bring Your Own Agent.

BYOAg is an experimental open architectural pattern for allowing people to bring their own AI agent into an environment-controlled experience. The site explains the concept, draft interaction model, early examples, trust boundaries, and project status.

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
  config/         Site metadata, navigation, and replaceable links
  layouts/        Base HTML layout and metadata
  pages/          Static routes
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

## Editing Content

Most page content lives in `src/pages`. Shared navigation, GitHub URL, social metadata, and project URLs live in `src/config/site.ts`.

## Status

BYOAg is experimental. Do not describe it as a finalized standard, production guarantee, or vendor-owned product.
