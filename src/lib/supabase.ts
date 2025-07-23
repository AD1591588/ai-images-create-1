import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://xcswvdcgdpgkciztebbx.supabase.co';
const supabaseKey = 'sb_publishable_oUL2j5zhlWCyz-mMlcflkw_EmmcFTW-';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };