/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rcnnrrctbtaslwqtvrye.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbm5ycmN0YnRhc2x3cXR2cnllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzA0MzcsImV4cCI6MjA4ODcwNjQzN30.v65xi3jsxbO2CE__Pw84i5baMPDVzQ-aQFUnwukFb7Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
