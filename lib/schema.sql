-- Run this in Supabase SQL Editor
-- https://supabase.com/dashboard/project/nqosvwyttibjobdzvqtz/sql

-- ─────────────────────────────────────────────
-- STEP 1: Get Geetha's admin UUID
--   SELECT id FROM auth.users WHERE email = 'geetha@skinora.in';
--   Replace ADMIN_UUID below with the returned id.
-- ─────────────────────────────────────────────

-- Bookings table (date/time as proper types; text fields length-capped)
create table if not exists bookings (
  id         uuid        default gen_random_uuid() primary key,
  name       text        not null check (char_length(name) between 1 and 100),
  phone      text        not null check (char_length(phone) between 5 and 20),
  service    text        not null check (char_length(service) between 1 and 150),
  date       date        not null,
  time       text        not null check (char_length(time) between 1 and 20),
  message    text                 check (message is null or char_length(message) <= 500),
  status     text        default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz default now()
);

-- Enquiries table
create table if not exists enquiries (
  id         uuid        default gen_random_uuid() primary key,
  name       text        not null check (char_length(name) between 1 and 100),
  phone      text        not null check (char_length(phone) between 5 and 20),
  message    text        not null check (char_length(message) between 1 and 1000),
  status     text        default 'new' check (status in ('new', 'read', 'replied')),
  created_at timestamptz default now()
);

-- Subscribers table
create table if not exists subscribers (
  id         uuid        default gen_random_uuid() primary key,
  name       text                 check (name is null or char_length(name) <= 100),
  phone      text                 check (phone is null or char_length(phone) <= 20),
  email      text        unique   check (email is null or char_length(email) <= 254),
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table bookings    enable row level security;
alter table enquiries   enable row level security;
alter table subscribers enable row level security;

-- ── Public INSERT policies (anyone can submit forms) ──
create policy "Anyone can book"       on bookings    for insert with check (true);
create policy "Anyone can enquire"    on enquiries   for insert with check (true);
create policy "Anyone can subscribe"  on subscribers for insert with check (true);

-- ── Admin-only SELECT / UPDATE (replace ADMIN_UUID with real value) ──
-- Get it: SELECT id FROM auth.users WHERE email = 'geetha@skinora.in';
do $$
declare
  admin_uid uuid := 'ADMIN_UUID';  -- ← replace this
begin

  execute format($f$
    create policy "Admin reads bookings"
      on bookings for select
      using (auth.uid() = %L)
  $f$, admin_uid);

  execute format($f$
    create policy "Admin updates bookings"
      on bookings for update
      using (auth.uid() = %L)
  $f$, admin_uid);

  execute format($f$
    create policy "Admin reads enquiries"
      on enquiries for select
      using (auth.uid() = %L)
  $f$, admin_uid);

  execute format($f$
    create policy "Admin updates enquiries"
      on enquiries for update
      using (auth.uid() = %L)
  $f$, admin_uid);

  execute format($f$
    create policy "Admin reads subscribers"
      on subscribers for select
      using (auth.uid() = %L)
  $f$, admin_uid);

end $$;
