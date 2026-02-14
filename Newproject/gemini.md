# Project Constitution

## 🌟 North Star
Build a premium, enterprise-grade **Appointment Scheduling & Business Management System**. A high-conversion tool for service-based businesses (e.g., high-end barbershops, consultants) with a "Luxury Tech" aesthetic and "World Class" user experience.

## 🔗 Integrations
1.  **Supabase**: Auth, Real-time Database, Storage (Single Source of Truth).
2.  **External Scraper**: Background worker for industry trends/news (Business Tips).
3.  **Twilio / WhatsApp** (Implied from previous context, strictly for notifications if needed, though not explicitly in the "Ultra" prompt, sticking to the core specific prompt: Scraper is the main external addition). *Correction: The specific prompt mentions "Automated Insights Scraper".*

## 📦 Source of Truth
**Supabase**.
- All business logic state must persist here.
- Real-time subscriptions for double-booking prevention.

## 🚚 Delivery Payload
- **Framework**: Next.js (App Router).
- **Styling**: Tailwind CSS ("Luxury Tech" - deep charcoal, electric accents).
- **Platform**: Mobile-First Web Application.
- **Interactivity**: Framer Motion for transitions and micro-interactions.

## 👮 Behavioral Rules & Invariants
1.  **Metric of Success**: "Friction-free" booking funnel (Service -> Professional -> Time -> Confirm).
2.  **Aesthetic**: "Luxury Tech". No jarring reloads. Skeleton loaders allowed.
3.  **Smart Availability**:
    - Handle buffer times.
    - Strict operating hours.
    - **Instant** double-booking prevention (Supabase Realtime).
4.  **Data-First**: Define Schema before coding.
5.  **Clean Code**: Atomic tools, 3-layer architecture.

## 💾 Data Schema (Strict Definition)

### 1. Users & Auth (`profiles`)
- `id` (UUID, PK): References `auth.users`
- `email` (Text, Unique)
- `full_name` (Text)
- `role` (Text): 'admin' | 'provider' | 'staff'
- `avatar_url` (Text)
- `created_at` (Timestamp)

### 2. Services (`services`)
- `id` (UUID, PK)
- `name` (Text)
- `description` (Text)
- `duration_min` (Int): Service length in minutes
- `price` (Decimal)
- `buffer_after_min` (Int): Cleanup time after service
- `color_for_ui` (Text): Hex code
- `is_active` (Boolean)

### 3. Clients / CRM (`clients`)
- `id` (UUID, PK)
- `full_name` (Text)
- `phone_number` (Text, Unique): Primary identifier
- `email` (Text, Nullable)
- `notes` (Text): Private notes for provider
- `preferences` (JSONB): e.g., {"drink": "coffee", "style": "fade"}
- `created_at` (Timestamp)

### 4. Appointments (`appointments`)
- `id` (UUID, PK)
- `client_id` (UUID, FK): References `clients.id`
- `service_id` (UUID, FK): References `services.id`
- `provider_id` (UUID, FK): References `profiles.id`
- `start_time` (Timestamptz): Exact start
- `end_time` (Timestamptz): Calculated (start + duration)
- `status` (Text): 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show'
- `payment_status` (Text): 'unpaid' | 'paid' | 'partial'
- `amount_paid` (Decimal)
- `reminder_sent` (Boolean): Default false
- `created_at` (Timestamp)

### 5. Business Insights / Scraper (`business_insights`)
- `id` (UUID, PK)
- `title` (Text)
- `summary` (Text): AI generated summary
- `source_url` (Text)
- `source_name` (Text): e.g., 'TechCrunch', 'BarberEvo'
- `published_at` (Timestamp)
- `fetched_at` (Timestamp)

### 6. Availability Rules (`availability`)
- `id` (UUID, PK)
- `provider_id` (UUID, FK): References `profiles.id`
- `day_of_week` (Int): 0-6 (Sun-Sat)
- `start_time` (Time): e.g., '09:00'
- `end_time` (Time): e.g., '13:00'
- `is_day_off` (Boolean)
*Note: Multiple rows per day allowed to create split shifts (e.g., 9-12, 14-18).*

### 7. Unavailability Blocks (`unavailability`)
- `id` (UUID, PK)
- `provider_id` (UUID, FK): References `profiles.id`
- `start_time` (Timestamptz)
- `end_time` (Timestamptz)
- `reason` (Text): e.g., 'Miluim', 'Holiday', 'Personal'
- `created_at` (Timestamp)

## 🛠️ Maintenance Log
- [x] Initial Setup
- [x] Discovery & Vision Defined
- [x] Data Schema Defined
