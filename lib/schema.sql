-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/nqosvwyttibjobdzvqtz/sql)

-- Bookings table
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  service text not null,
  date text not null,
  time text not null,
  message text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz default now()
);

-- Enquiries table
create table if not exists enquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  message text not null,
  status text default 'new' check (status in ('new', 'read', 'replied')),
  created_at timestamptz default now()
);

-- Subscribers table
create table if not exists subscribers (
  id uuid default gen_random_uuid() primary key,
  name text,
  phone text,
  email text unique,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table bookings enable row level security;
alter table enquiries enable row level security;
alter table subscribers enable row level security;

-- Public can insert (submit forms)
create policy "Anyone can book" on bookings for insert with check (true);
create policy "Anyone can enquire" on enquiries for insert with check (true);
create policy "Anyone can subscribe" on subscribers for insert with check (true);

-- Only authenticated users (Geetha/admin) can read/update
create policy "Admin reads bookings" on bookings for select using (auth.role() = 'authenticated');
create policy "Admin updates bookings" on bookings for update using (auth.role() = 'authenticated');
create policy "Admin reads enquiries" on enquiries for select using (auth.role() = 'authenticated');
create policy "Admin updates enquiries" on enquiries for update using (auth.role() = 'authenticated');
create policy "Admin reads subscribers" on subscribers for select using (auth.role() = 'authenticated');
