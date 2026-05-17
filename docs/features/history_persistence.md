# Feature: Local History Persistence

## 1. Objective
Enable users to save their completed coffee roasting sessions to their local machine without manually downloading files, and have the app automatically load these sessions upon startup.

## 2. Context
Currently, the app stores logs in the browser's `localStorage` (or needs a manual export/import). This limits portability across different browsers on the same machine and risks accidental data loss if browser data is cleared.

## 3. Requirements
- Create a mechanism to persist data to a `.json` file.
- The app must read the file when the page loads.
- The app must overwrite the file when a new log is created or an existing log is deleted.
- No external databases or heavy backends should be used in this phase.

## 4. Technical Approach
- **UI:** No visible changes, use the existing "Save" button and "Delete" button from `HistoryDrawer`.
- **API (Vite Middleware):** Create a custom `Plugin` in `vite.config.ts`.
  - `GET /api/history` -> Reads `roast-history.json` and serves it.
  - `POST /api/history` -> Takes the JSON body and writes it to `roast-history.json`.
- **Frontend App:** Update persistence logic in `App.tsx` to use system `fetch()` targeting local API instead of `localStorage`.

## 5. Acceptance Criteria
- [x] App mounts and immediately displays previously saved roasts without user interaction.
- [x] Saving a roast adds it to the list and permanently stores it in `roast-history.json` on disk.
- [x] Deleting a roast removes it from the screen and permanently deletes the entry from `roast-history.json`.
- [x] No server-starting steps required for the user other than `npm run dev`.
