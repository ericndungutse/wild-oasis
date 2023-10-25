import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://icrkpoqouzjshpkthrio.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljcmtwb3FvdXpqc2hwa3RocmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxMDA1NDMsImV4cCI6MjAxMzY3NjU0M30.HH7-WaEhCkhqAaJRdZx8IgzHbU4aRwN_qrt4U9Dix6w';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
