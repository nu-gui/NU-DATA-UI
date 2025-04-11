# Session M4 – Figma Export to React/Tailwind

**Primary Repo**: nu-data-ui  
**Secondary Repo**: nu-data-design  
**Date**: 2025-04-11  
**Lead**: @wes  
**Participants**: @wes, @devin

---

## ✨ Objective
Export all UI designs from the Figma portal into reusable, animated, responsive React components styled with Tailwind CSS. This session focuses on preserving animations (Smart Animate), extracting design tokens, generating Tailwind config, and implementing animation hooks (Framer Motion / GSAP).

---

## 📆 Scope
- **Components**: All Figma-designed UI blocks, layouts, buttons, tabs, tables, dialogs
- **Animations**: Page transitions, hover effects, scroll-based reveals, form transitions
- **Tools**: Framer Motion, GSAP, TailwindCSS, figma-to-react, figma-animation-extractor, figma-tokens
- **Output Folders**:
  - `src/components`
  - `src/animations`
  - `src/styles/tokens`
  - `src/hooks`
  - `storybook`

---

## 🛠️ Implementation Notes
- Install tools:
  ```bash
  npm install -g @figma/api figma-api-exporter figma-tokens
  npm install react react-dom tailwindcss postcss autoprefixer framer-motion gsap
  ```

- Set up project file structure:
  ```bash
  mkdir -p src/{components,animations,styles,assets,hooks}
  ```

- Figma export steps:
  1. Extract tokens with `figma-tokens-transformer`
  2. Export components with `figma-to-react`
  3. Extract animations with `figma-animation-extractor`
  4. Generate Tailwind config from tokens
  5. Apply `framer-motion` or `GSAP` to animated components
  6. Validate variants and state changes

- Responsive implementation uses `useMediaQuery` hooks
- Define `easings.js` for custom cubic-bezier transitions
- Enable Storybook and load all components with interactive examples
- Finalize docs with `generate-docs` and commit to repo

---

## 🔗 Dependencies
- Requires: `figma-to-code-export-playbook.md`
- Blocks: `session-M5-nu-data-ui-component-tests.md` (validation & test coverage)

---

## 📊 Testing & Validation
- [ ] Storybook loads all exported components correctly
- [ ] Smart Animate transitions render correctly on first mount
- [ ] Tailwind config reflects Figma tokens (colors, spacing, typography)
- [ ] Responsive layouts tested via `useMediaQuery`
- [ ] Performance optimized via `LazyMotion`
- [ ] Accessibility: keyboard focus, aria labels, prefers-reduced-motion
- [ ] GitHub repo contains buildable output + updated README

---

## ⚠️ Known Constraints
- Some deeply nested Figma variants may require manual correction
- Non-interactive frames might miss hover state extraction
- Animation tools must account for mobile variants (different easing/duration)

---

## ✅ Next Steps
- Trigger `session-M5` for component testing + coverage
- Schedule integration with backend-middleware states for live data
- Set up GitHub workflow to validate component integrity via CI
- Publish Storybook preview (optional: Netlify/Vercel)
- Log merged animations/components to `AI-Next-Tasks.md`

---

## 📄 Artifacts
- `src/components/*` (React JSX/TSX files)
- `src/styles/tokens/*` (design token JSON)
- `src/animations/easings.js`, `hooks/useMediaQuery.ts`
- `storybook` folder with previews
- `tailwind.config.js` auto-generated
- `README.md` with integration notes

---

**Note**: Follows session planning standards from `/devin/playbooks/session_planning.md`  
See: `figma-to-code-export-playbook.md` for tooling & step details

