# Technical Specification

## 1. Stack
- **Frontend**: React 19 (Hooks, Context API)
- **Language**: TypeScript (Strict mode)
- **Build Tool**: Vite
- **UI Framework**: Material UI (MUI) v7
- **Styling**: Emotion (CSS-in-JS)

## 2. Persistence Architecture
The app follows a **Local-First** philosophy.
- **Backend**: A custom Vite plugin (`local-api`) implemented in `vite.config.ts`.
- **API**:
  - `GET /api/history`: Reads `roast-history.json` from the root directory.
  - `POST /api/history`: Overwrites `roast-history.json` with the new data.
- **Data Format**: A JSON array of `RoastLog` objects.

## 3. Coding Standards
- **Strict Typing**: All data models must be defined in `src/types/index.ts`. No `any`.
- **Component Structure**: Functional components using MUI components. Avoid custom CSS where MUI system properties (`sx`) can be used.
- **Time Handling**: Use the utility functions in `src/utils/timeFormat.ts` for all time-related displays.

## 4. Key Patterns
- **Soft Deletes**: (Implementing) All deletions should mark a `deletedAt` timestamp rather than removing data from the JSON file.
- **Real-time Updates**: The timer uses a 100ms interval for precision, but UI updates are optimized to prevent unnecessary re-renders.
