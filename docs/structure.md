# Project Structure & Map

## 1. Directory Overview
- `docs/`: Documentation and feature specifications.
- `public/`: Static assets (favicon, etc.).
- `src/`: Main application source.
  - `assets/`: Images and global styles.
  - `components/`: Reusable UI components.
  - `theme/`: MUI theme configuration.
  - `types/`: TypeScript interfaces and types.
  - `utils/`: Stateless helper functions.
- `_legacy/`: Archive of previous implementations (do not use for new features).

## 2. Naming Conventions
- **Components**: PascalCase (e.g., `HistoryDrawer.tsx`).
- **Utilities/Types**: camelCase (e.g., `timeFormat.ts`, `index.ts`).
- **Files**: Use `.tsx` for components and `.ts` for logic-only files.

## 3. Data Flow
1. `App.tsx` serves as the main orchestrator, holding the primary state.
2. Components receive state and handlers via props.
3. Persistence is triggered by `App.tsx` calling the local Vite API.
