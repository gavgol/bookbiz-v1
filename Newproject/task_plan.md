# Task Plan (B.L.A.S.T. Protocol)

## 🟢 Protocol 0: Initialization
- [x] Initialize Project Memory
- [x] **Discovery**: Defined "Ultra-High-End" Vision & Stack

## 🏗️ Phase 1: B - Blueprint
- [x] **Discovery**: Ask and answer the 5 Discovery Questions
- [x] **Data-First**: Define JSON Data Schema in `gemini.md`
- [x] **Research**: Search for resources

## ⚡ Phase 2: L - Link
- [x] **Setup Supabase**: Connect via `.env`.
- [x] **Verify**: Script to check Supabase connection.
- [x] **Scraper Handshake**: Simple script to fetch 1 headline from a news source.

## ⚙️ Phase 3: A - Architect
- [x] **Layer 1 (SOPs)**:
    - `booking_flow.md` ( The funnel logic)
    - `availability_engine.md` ( The time slot calc)
- [x] **Layer 1.5 (Components)**:
    - `TimeSlotPicker.tsx` (Connected to Supabase)
- [ ] **Layer 2 (Nav)**:
    - Routing for "Owner Dashboard" vs "Public Booking Page"
- [ ] **Layer 3 (Tools)**:
    - `get_available_slots.py`
    - `create_appointment.py`
    - `srape_industry_news.py`

## ✨ Phase 4: S - Stylize (The "Wow" Factor)
- [ ] **Design System**: Tailwind config for "Deep Charcoal" & "Electric Gold".
- [ ] **Components**:
    - "Flow" Booking Widget (Framer Motion)
    - Command Center Dashboard
- [ ] **Polish**: Skeleton loaders, smooth transitions.

## 🛰️ Phase 5: T - Trigger
- [ ] **News Scraper Automation**: Schedule 24h job.
- [ ] **Final Deployment**.
