# Feature Specification: History Cards Revamp

## 1. Feature Name
Revamp History Cards with Timeline Visualization

## 2. Objective
Redesign the roast history cards in the side drawer to be more compact, modern, and visually informative. The primary goal is to provide a quick, intuitive visualization of the roast phases (Dry, Maillard, Development) using a horizontal timeline bar, rather than just listing numbers.

## 3. Requirements
- Consolidate the data points (Total Time, DTR, Weight Loss, Est. Phase) into a more compact and readable layout.
- Introduce a horizontal timeline bar for each roast card.
- The timeline should visually represent the proportional duration of each phase relative to the total roast time:
  - **Drying Phase:** From start (0:00) to `dryEndTime`.
  - **Maillard Phase:** From `dryEndTime` to `firstCrackTime`.
  - **Development Phase:** From `firstCrackTime` to the end of the roast (`totalSeconds`).
- The timeline should include visual indicators or markers for the phase transitions.
- Maintain the existing functionality: deleting roasts and displaying the bean name and date.

## 4. Technical Approach
- **UI/UX Changes:** 
  - Modify the `Card` component in `HistoryDrawer.tsx` to reduce padding and margins.
  - Reorganize the typography to use smaller font sizes for secondary information.
  - Implement a `RoastTimelineBar` functional component:
    - Base height is 20px to accommodate inner text.
    - Each phase (Drying, Maillard, Development) is displayed as a segment inside a flex container, colored according to the app's standard theme (Success, Warning, Error).
    - If a phase is >10% of the total time width, it displays an inner label (DRY, MAI, DEV).
    - Top elapsed times are displayed over the bar segments for exactly how long each respective phase took.
    - Bottom of the bar contains explicit marker labels using bold text: "FC" for First Crack and "End" for the end of roast time.
  - Consolidate bottom row info: Update "DTR" to "Development" and "Loss" to "Weight loss". Remove explicit total time stats that repeat the bar information.

## 5. Acceptance Criteria
- [x] History cards occupy significantly less vertical space than the previous version.
- [x] All essential data (Development time, Weight Loss) remains visible in a denser format aligned on a single row below the bar.
- [x] A 20px horizontal bar accurately visualizes the three roasting phases based on the saved timestamps.
- [x] Phase durations (DRY, MAI, DEV) are clearly shown inside their respective portions of the timeline bar.
- [x] Exactly elapsed phase times are shown centered above each portion of the bar.
- [x] "FC" (First Crack start) and "End" timestamps are placed precisely below the bar transitions and have bold typography.
- [x] The delete functionality still works correctly on the revamped cards.
