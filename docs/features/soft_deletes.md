# Feature: Soft-Deletes & History Recovery

## 1. Objective
Enable users to "delete" roast history items without permanently removing them from the underlying data file. This allows for a "Trash" or "Recovery" workflow, preventing accidental data loss.

## 2. Context
Currently, the `deleteRoast` function filters the history array and overwrites the JSON file, making it impossible to recover a deleted roast.

## 3. Requirements
- Items should not be removed from `roast-history.json` upon deletion.
- Items should not be removed from `roast-history.json` upon deletion.
- A `deletedAt` timestamp must be added to the roast object.
- The UI must hide deleted items completely.
- A **custom MUI Confirmation Dialog** must appear before a roast is deleted (replaces `window.confirm`).

## 4. Technical Approach
- **Types**: Update `RoastLog` in `src/types/index.ts` to include `deletedAt?: number`.
- **UI Component**: Create `src/components/ConfirmationDialog.tsx` using MUI `Dialog`, `DialogTitle`, `DialogContent`, and `DialogActions`.
- **App Logic**:
  - Add state `deleteConfirmOpen` and `roastToDeleteId` in `App.tsx`.
  - Update `deleteRoast(id)` to:
    1. Set the target ID and open the custom dialog.
  - Implement `handleConfirmDelete()` to:
    1. Perform the soft-delete mapping.
    2. Close the dialog.
- **UI (`HistoryDrawer`)**:
  - Filter the `history` array to only show items where `deletedAt` is undefined/null.

## 5. Acceptance Criteria
- [x] Clicking the "Delete" icon opens a styled MUI Dialog.
- [x] The dialog has clear "Cancel" and "Delete" (destructive) actions.
- [x] Clicking "Cancel" closes the dialog without changes.
- [x] Clicking "Delete" in the dialog hides the roast and saves the `deletedAt` timestamp to disk.
- [x] UI is responsive and looks premium on both Desktop and Mobile.

