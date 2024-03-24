import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://huoqiyvsksclfnetgiep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1b3FpeXZza3NjbGZuZXRnaWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMTczNTMsImV4cCI6MjAyNjU5MzM1M30.sqr2De_XIBiYPyRuOoCVoxPVupeHCPnBomDZtQ_Ahg0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
