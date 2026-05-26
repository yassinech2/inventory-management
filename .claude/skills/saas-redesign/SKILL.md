---
name: saas-redesign
description: Redesign a Vue 3 application's UI into a modern SaaS-style interface with a left vertical navigation sidebar, centralized design tokens, and a polished professional look. Scope is the navigation shell and tokens only — page-level views and component primitives are out of scope. Always produces a written plan first and waits for user approval before editing files.
---

# SaaS Redesign — Navigation Shell & Design Tokens

Convert a Vue 3 app's top-bar navigation into a modern SaaS layout with a left vertical sidebar, a slim top header for page-level actions, and a centralized design-token system that the rest of the app can consume.

## Scope (do not exceed without asking)

In scope:
- The application shell: root `App.vue`, layout structure, sidebar, header.
- Design tokens: color palette, spacing scale, typography, radii, shadows, motion.
- Router-link styling for the new nav.

Out of scope (do not touch unless the user expands scope):
- Individual page views in `views/*.vue`.
- Reusable component primitives (cards, tables, buttons).
- API, store, or routing structure (routes themselves can be re-ordered for the sidebar but route paths stay the same).
- Backend code.

If the user asks for something outside scope mid-task, stop and confirm before proceeding.

## Workflow

This skill is **plan-then-apply**. Never edit files in the first pass.

### Step 1 — Audit

Read the current shell to understand what's there. At minimum:
1. The Vue entry (`src/main.js` or `src/main.ts`) to find the root component and any global CSS imports.
2. The root `App.vue` — capture the current nav structure, where `<router-view />` sits, and any global styles.
3. The router file (`src/router/*`) — get the full list of routes, their `name`, `path`, and any `meta` (icons, labels, groupings).
4. Any existing global stylesheet (`assets/main.css`, `styles/*`, or `<style>` in `App.vue`) to see what tokens already exist.
5. `index.html` for fonts and meta.

Do **not** read every page view — they are out of scope.

### Step 2 — Plan

Produce a written plan with these sections. Show it to the user and wait for approval before editing.

**A. Current state summary** (3–6 bullets)
What the nav looks like today, where styles live, what tokens already exist or are missing.

**B. Token system to introduce**
List the exact CSS custom properties you'll define, with concrete values. Use the reference token set below as a starting point and adjust to fit any existing brand colors you observed.

**C. Sidebar structure**
A tree showing the nav groups and items, mapped to existing routes. Call out anything that doesn't map cleanly (orphan routes, routes that should be hidden from nav, etc.).

**D. File change list**
For each file you'll touch, one line: `path — what changes`. Group as:
- New files (e.g., `src/styles/tokens.css`, `src/components/layout/AppSidebar.vue`)
- Modified files (e.g., `src/App.vue`, `src/main.js`)

**E. Visual sketch**
A short ASCII sketch of the new layout (sidebar width, header height, content area). Helps the user catch layout intent issues before code.

**F. Open questions**
Anything ambiguous — icon library choice, collapse behavior, dark mode, etc. Default to sensible answers but flag them.

### Step 3 — Apply

Only after the user approves the plan:
1. Delegate `.vue` file creation/modification to the **vue-expert** subagent (per project CLAUDE.md: "ANY time you need to create or significantly modify a .vue file, you MUST delegate to vue-expert"). Pure CSS files can be written directly.
2. Apply edits in the order listed in the plan.
3. After editing, run the project's dev server (use the `start` skill if available) and verify visually with Playwright MCP — confirm the sidebar renders, links navigate, and nothing in the existing pages is visually broken by the new shell.
4. Report what changed and any follow-ups the user might want (e.g., "page views still use old spacing — want me to expand scope?").

## Layout pattern

```
+----------------+--------------------------------------+
|                |  Page title          [actions / user]|  <- top header (56-64px)
|   SIDEBAR      +--------------------------------------+
|   (240-260px)  |                                      |
|                |                                      |
|   - Logo       |        <router-view />               |
|   - Nav group  |        (max-width ~1280px,           |
|     - item     |         padded 24-32px)              |
|     - item     |                                      |
|   - Nav group  |                                      |
|     - item     |                                      |
|                |                                      |
|   ----         |                                      |
|   User chip    |                                      |
+----------------+--------------------------------------+
```

Implementation notes:
- Use CSS Grid on the app root: `grid-template-columns: var(--sidebar-width) 1fr; grid-template-rows: var(--header-height) 1fr;`.
- Sidebar is `position: sticky; top: 0; height: 100vh;` so it stays put when content scrolls.
- The header sits above only the content column, not the sidebar (the sidebar's logo area aligns with the header height).
- On screens < 1024px, sidebar collapses to icons-only or off-canvas; pick one in the plan.

## Reference token set

Use these as a starting point. Adjust hues to match anything you observed in the audit; keep the scale intact.

```css
:root {
  /* Color — neutral surface */
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-sidebar: #0f172a;
  --color-sidebar-fg: #cbd5e1;
  --color-sidebar-fg-active: #ffffff;
  --color-sidebar-hover: #1e293b;
  --color-border: #e2e8f0;

  /* Color — text */
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-text-subtle: #94a3b8;

  /* Color — brand & status */
  --color-brand: #4f46e5;
  --color-brand-hover: #4338ca;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-info: #3b82f6;

  /* Spacing — 4px scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* Layout */
  --sidebar-width: 248px;
  --sidebar-width-collapsed: 64px;
  --header-height: 60px;
  --content-max-width: 1280px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.04);
  --shadow-md: 0 4px 12px rgba(15, 23, 42, 0.06);

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 13px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --line-height-tight: 1.25;
  --line-height-base: 1.5;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Motion */
  --motion-fast: 120ms ease-out;
  --motion-base: 180ms ease-out;
}
```

If the project already has tokens, **merge rather than replace** — keep existing variable names that page views might consume, and add the new ones alongside. Flag any conflicting values in the plan's "Open questions" section.

## Sidebar component contract

The sidebar is a Vue SFC (`AppSidebar.vue`). It should:
- Accept the nav structure as a `defineProps` array (groups → items with `to`, `label`, optional `icon`), so it's data-driven rather than hard-coded.
- Use `<router-link>` with `active-class` for the active state — never re-implement active detection.
- Render nav-group headings as small uppercase labels with `--color-text-subtle`.
- Item style: 8px radius, hover background `--color-sidebar-hover`, active background slightly lighter + left accent bar in `--color-brand`.
- Bottom of sidebar: an optional user chip slot.

## Anti-patterns to avoid

- Don't introduce a CSS framework (Tailwind, etc.) unless the project already uses one. Use plain CSS with the tokens.
- Don't add a state library for nav state — a `ref` in `App.vue` for collapse is enough.
- Don't put nav items in a hard-coded `<ul>` inside `App.vue` — make the sidebar take its data from a config so adding routes later is trivial.
- Don't restyle individual page views as a side effect. If pages look broken under the new shell, surface that as a follow-up, not a scope creep.
- Don't add emojis to the UI (per project CLAUDE.md).
- Don't break the existing router — keep all route paths identical.

## Verification checklist

Before reporting done:
- [ ] Plan was approved by the user before any file edits.
- [ ] All routes from the original router are reachable from the new sidebar (or explicitly hidden with user agreement).
- [ ] Active route is visually distinguishable.
- [ ] Sidebar stays fixed when content scrolls.
- [ ] No console errors on any route.
- [ ] Tokens live in a dedicated stylesheet imported globally, not duplicated across components.
- [ ] Visual check via Playwright MCP on at least 2 routes confirms the shell renders correctly.
