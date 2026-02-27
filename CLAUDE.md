# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Micro design system bridging Figma designs with production-ready React components. Components are built to be portable — usable standalone via GitHub and embeddable in WordPress (via block editor or headless approach).

## Stack

- **React** (component library, no framework — plain Vite or CRA)
- **Tailwind CSS** (utility-first styling, no custom CSS unless absolutely necessary)
- **Storybook** (component documentation and visual testing)

## Commands

```bash
npm install          # install dependencies
npm run dev          # Vite dev server
npm run build        # production build
npm run storybook    # launch Storybook
npm run build-storybook  # static Storybook export
npm run lint         # ESLint
npm run test         # Vitest (unit tests)
npm run test -- --run src/components/Button  # run single test file
```

## Architecture

```
src/
  tokens/          # Design tokens (colors, spacing, typography) — single source of truth
  components/      # One folder per component: Component.jsx + Component.stories.jsx + Component.test.jsx
  utils/           # Shared helpers (cn(), etc.)
index.js           # Public API — re-exports all components
tailwind.config.js # Maps design tokens into Tailwind theme
```

### Design Token Flow

Figma variables → `src/tokens/` (JS/JSON) → `tailwind.config.js` (mapped to theme) → components use Tailwind classes only.

Never hardcode color hex values or spacing numbers in components. Always reference tokens via Tailwind classes.

### Component Rules

- One component per file, named in PascalCase.
- Props use TypeScript-style JSDoc (`@param`, `@type`) for IDE support without requiring full TS migration.
- Variants are driven by props, not CSS classes applied externally.
- No inline `style` attributes — Tailwind classes only.
- Use the `cn()` utility (from `clsx` + `tailwind-merge`) for conditional class logic.

### WordPress Compatibility

- Components must work without a build step when exported as plain JS bundles (`iife` format via Vite `lib` mode).
- Avoid browser-only APIs (no `window`/`document` in render paths) to support SSR contexts.
- WordPress blocks that wrap these components live in a separate `/wordpress` directory (not part of the core library build).
- Keep component markup semantic (landmarks, ARIA where needed) — WordPress themes may inject additional styles.

## Figma Workflow

This project uses the Figma MCP server (`mcp__figma__get_design_context`).

When implementing a design from a Figma URL:
1. Call `get_design_context` with the node ID and file key.
2. Map any Figma variables to existing tokens in `src/tokens/` before writing component code.
3. If the Figma component has a Code Connect mapping, use that component directly instead of generating new code.
4. Do not copy raw hex colors or pixel values from Figma output — translate them to token names.

## Code Style

- **No default exports** for components — named exports only (`export function Button`).
- Imports ordered: React → third-party → internal (tokens, utils, other components).
- Tailwind class order follows the official Prettier plugin order (layout → spacing → typography → color → state).
- Keep component files under 150 lines. Extract sub-components into the same folder if needed.
- Story files must include at least: Default, all major variants, and a Disabled state.
