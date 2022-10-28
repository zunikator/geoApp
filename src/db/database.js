//import pg from 'pg';
// import { Pool } from 'postgres-pool';
// import {config} from './config';

import { createClient } from '@supabase/supabase-js'

//minuto 40

// export const pool = new Pool(config);

const supabaseUrl = 'https://egywyqlkwjjzamgokooc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVneXd5cWxrd2pqemFtZ29rb29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQwNjU1ODUsImV4cCI6MTk3OTY0MTU4NX0.aBYSd70ydljqpd0x5tG9zLPvzmx9Y-tHH4g-8c-d7rs'

const supabaseUrl2 = 'https://dfitsrrlrzyxijxjbrve.supabase.co'
const supabaseKey2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmaXRzcnJscnp5eGlqeGpicnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY2NDI3ODEsImV4cCI6MTk4MjIxODc4MX0.Pmo-f2KWrbN3j_S_LyBxks9xJQCtHz5I2bX_h3-j_LY'


export const supabase = createClient(supabaseUrl2, supabaseKey2)
