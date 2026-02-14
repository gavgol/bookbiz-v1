# Architecture SOP: Availability Engine

## 🧠 The Logic Core
This engine calculates *true* assignable time slots by intersecting **Work Hours** with **Existing Appointments** and **Unavailability Blocks**.

## 🔢 The Algorithm
1.  **Fetch Base Availability**:
    *   Query `availability` table for the Provider + Day of Week.
    *   *Result*: List of time ranges (e.g., `09:00-12:00`, `13:00-18:00`).
2.  **Fetch Constraints (The Subtractors)**:
    *   Query `appointments` for Provider + Date.
    *   Query `unavailability` for Provider + Date (Holidays, Miluim).
3.  **Apply Service Duration & Buffer**:
    *   Let $D = \text{Service Duration}$
    *   Let $B = \text{Service Buffer}$
    *   Total Slot Size Needed = $D$ (Buffer is time *after*, so it just pushes the next slot).
4.  **Slot Generation Loop**:
    *   Start at `Base Availability Start`.
    *   Check if `[CurrentTime, CurrentTime + D]` intersects any Constraint.
    *   If **No Intersection**: Add to `AvailableSlots`.
    *   Increment `CurrentTime` by `Interval` (e.g., 15 or 30 mins).
    *   *Constraint Handling*: If intersection found, jump `CurrentTime` to `Constraint End`.

## 🛡️ Double-Booking Protection (Supabase Realtime)
*   **Race Condition**: Two users click 10:00 AM at the exact same second.
*   **Solution**:
    1.  **Database Constraint**: Add a Postgres `EXCLUDE` constraint on `(provider_id, time_range)` OR
    2.  **Application Lock**: Optimistic Locking isn't enough. We rely on the DB Insert to fail for the loser.
    3.  **Real-time Feedback**: Subscribe to `INSERT` on `appointments`. If an ID comes in for the looked-at day, trigger a re-fetch of slots.

## 💾 Database Function (RPC)
We will implement this logic in a Postgres function `get_available_slots(provider_uuid, date, service_duration)` for speed.
