import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Booking = {
  id?: string
  name: string
  phone: string
  service: string
  date: string
  time: string
  message?: string
  status?: 'pending' | 'confirmed' | 'cancelled'
  created_at?: string
}

export type Enquiry = {
  id?: string
  name: string
  phone: string
  message: string
  status?: 'new' | 'read' | 'replied'
  created_at?: string
}

export type Subscriber = {
  id?: string
  name?: string
  phone?: string
  email?: string
  created_at?: string
}
