# Findings & Research

## 🟢 Discovery (Completed)

### 1. North Star
A premium Appointment Scheduling SaaS ("Ultra-High-End").
- **Target**: Barbershops, Consultants.
- **Key Differentiator**: "Luxury Tech" feel, "mobile-app" native feel on web.

### 2. Core Modules ("Calmark" Killers)
- **The Flow**: Service -> Professional -> Time -> Confirm.
- **Smart Logic**: Buffers, Operating Hours, Real-time conflict checks.
- **Command Center**: Revenue/Appointment overview + **Automated Insights (Scraper)**.
- **CRM**: Client history and preferences.

### 3. Tech Stack Requirements
- Next.js (App Router)
- Tailwind CSS (Deep Charcoals, Electric Blue/Gold)
- Supabase (Auth, DB, Realtime)
- Framer Motion

### 4. Constraints
- **Mobile-First**: Must work perfectly on phone.
- **Performance**: No jarring reloads.
- **Reliability**: Deterministic logic.

## 🔎 Research Needs
- [ ] **Supabase Realtime**: Best practices for booking race conditions.
- [ ] **Framer Motion**: "Page transition" patterns in Next.js App Router.
- [ ] **Scraping**: Reliable sources for "Business Tips" (e.g., TechCrunch, industry blogs) and a simple scraper architecture (maybe Python script in `tools/`).
