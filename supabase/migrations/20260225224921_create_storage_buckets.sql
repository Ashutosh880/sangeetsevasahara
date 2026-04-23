/*
  # Create Storage Buckets

  ## Overview
  Creates storage buckets for audition videos and payment screenshots

  ## New Buckets
  1. `audition-videos` - Stores audition video files
  2. `payment-screenshots` - Stores payment proof screenshots

  ## Security
  - Public access for reading (with RLS)
  - Authenticated users can upload
  - File size limits enforced at application level
*/

-- Create audition-videos bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('audition-videos', 'audition-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Create payment-screenshots bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-screenshots', 'payment-screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for audition-videos
CREATE POLICY "Anyone can upload audition videos"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'audition-videos');

CREATE POLICY "Anyone can view audition videos"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'audition-videos');

-- Set up storage policies for payment-screenshots
CREATE POLICY "Anyone can upload payment screenshots"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'payment-screenshots');

CREATE POLICY "Anyone can view payment screenshots"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'payment-screenshots');