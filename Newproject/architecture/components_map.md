# Component Map
> Strict separation of Logic (Data fetching) and UI (Presentation).

## 1. Atoms (Base)
*   `Button.tsx` (Variants: Primary/Glow, Ghost, Outline)
*   `Card.tsx` (Glassmorphic Container)
*   `Input.tsx` (Floating Label, clean borders)
*   `Badge.tsx` (Status Indicators)
*   `Skeleton.tsx` (Loading states)

## 2. Molecules (Interactive)
*   `ServiceCard.tsx`: Displays Icon, Name, Duration, Price. Selectable state.
*   `ProviderAvatar.tsx`: Image + Name + Role.
*   `DateStrip.tsx`: Horizontal scrollable date picker (iOS style).
*   `TimeSlotGrid.tsx`: Grid of available times. Handles "Busy" vs "Free".
*   `Modal.tsx`: Glassmorphic overlay for confirmations.

## 3. Organisms (Complex sections)
*   `BookingWizard.tsx`: Manages the multi-step state (Service -> Provider -> Time).
    *   *Micro-interaction*: AnimatePresence between steps.
*   `DashboardStats.tsx`: Revenue, Appt Counts (Owner View).
*   `BusinessInsightsFeed.tsx`: The Scraper results list.

## 4. Templates (Pages)
*   `/booking`: Public booking page.
*   `/admin`: Protected dashboard.
