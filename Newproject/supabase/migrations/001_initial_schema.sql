-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Users/Providers - Linked to Supabase Auth)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  role text check (role in ('admin', 'provider', 'staff')) default 'provider',
  avatar_url text,
  created_at timestamptz default now()
);

-- RLS: Profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- 2. SERVICES
create table services (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  duration_min int not null,
  price decimal(10, 2) not null,
  buffer_after_min int default 0,
  color_for_ui text,
  is_active boolean default true,
  provider_id uuid references profiles(id) -- Optional: if services are provider-specific
);

-- RLS: Services
alter table services enable row level security;
create policy "Services are viewable by everyone" on services for select using (true);
create policy "Admins/Providers can manage services" on services for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'provider'))
);

-- 3. CLIENTS (CRM)
create table clients (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  phone_number text unique not null,
  email text,
  notes text,
  preferences jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- RLS: Clients
alter table clients enable row level security;
create policy "Providers can view all clients" on clients for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'provider'))
);
create policy "Providers can insert clients" on clients for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'provider'))
);
create policy "Providers can update clients" on clients for update using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'provider'))
);

-- 4. APPOINTMENTS
create table appointments (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references clients(id) not null,
  service_id uuid references services(id) not null,
  provider_id uuid references profiles(id) not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status text check (status in ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')) default 'pending',
  payment_status text check (payment_status in ('unpaid', 'paid', 'partial')) default 'unpaid',
  amount_paid decimal(10, 2) default 0,
  reminder_sent boolean default false,
  created_at timestamptz default now()
);

-- RLS: Appointments
alter table appointments enable row level security;
create policy "Providers see all appointments" on appointments for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'provider'))
);
-- Note: For public booking, we might need a function or specific policy to allow creation without being logged in, 
-- or we use a "service_role" key in the backend for the booking flow. 
-- For now, allow auth users (providers) to manage. Review "Public Booking" logic in Phase 3.

-- 5. AVAILABILITY RULES
create table availability (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references profiles(id) not null,
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_day_off boolean default false
);

-- RLS: Availability
alter table availability enable row level security;
create policy "Reviewable by everyone" on availability for select using (true);
create policy "Providers manage own availability" on availability for all using (auth.uid() = provider_id);

-- 6. UNAVAILABILITY BLOCKS (Miluim, Holidays)
create table unavailability (
  id uuid default uuid_generate_v4() primary key,
  provider_id uuid references profiles(id) not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  reason text,
  created_at timestamptz default now()
);

-- RLS: Unavailability
alter table unavailability enable row level security;
create policy "Reviewable by everyone" on unavailability for select using (true);
create policy "Providers manage own blocks" on unavailability for all using (auth.uid() = provider_id);

-- 7. BUSINESS INSIGHTS (Scraper)
create table business_insights (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  summary text,
  source_url text,
  source_name text,
  published_at timestamptz,
  fetched_at timestamptz default now()
);

-- RLS: Insights
alter table business_insights enable row level security;
create policy "Viewable by providers" on business_insights for select using (
   exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'provider'))
);
-- Insert policy typically managed by backend script/service role
