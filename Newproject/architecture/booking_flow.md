# Architecture SOP: The "Flow" Booking Funnel

## 🎯 Goal
Create a frictionless, "Luxury App-Like" booking experience on the web. Zero jarring reloads. Instant feedback.

## 🔄 The Funnel Steps
1.  **Service Selection**
    *   Display: Grid of services with high-quality icons/images.
    *   Data: Fetch `services` where `is_active = true`.
    *   Interaction: Tap to select -> slide to next step.
2.  **Provider Selection**
    *   Display: Avatar list of `profiles` (role='provider').
    *   Logic: Filter by who performs the selected service (if specific).
    *   Default: If only 1 provider, auto-skip this step.
3.  **Time Slot Selection (The Complex Part)**
    *   Display: Horizontal Date Picker (iOS style) + Vertical Time Slots Grid.
    *   Data: Call `rpc/get_available_slots` (Postgres Function).
    *   Interaction: Real-time check. If a slot is taken mid-selection, show "Just booked" toast.
4.  **Identification (The "CRM" Link)**
    *   Input: Phone Number (Primary Key).
    *   Logic: Query `clients` by phone.
        *   Found: Auto-fill name.
        *   New: Ask for Name.
    *   Auth: No password required for booking. SMS OTP (Optional Phase 2).
5.  **Confirmation & Payment**
    *   Display: Summary Card (Service, Time, Price).
    *   Action: "Confirm & Book".
    *   Database: Insert into `appointments`.

## 🎨 UI/UX Invariants
*   **Framer Motion**: Use `AnimatePresence` for step transitions (Slide Left/Right).
*   **Skeleton Loaders**: Never show a blank screen while fetching slots.
*   **Error Handling**: "Optimistic UI" - assume success, roll back on error.
