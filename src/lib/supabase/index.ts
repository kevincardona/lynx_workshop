import 'util' // import util to preload the polyfill

import { createClient } from '@supabase/supabase-js'
import SimpleURL from './polyfills/url.ts';
import { supabaseStorage } from './storage.ts';

// Override global URL with our polyfill
// For some reason the default 'url' package doesn't support 
// most features that are expected by supabase
globalThis.URL = SimpleURL;

const lynxFetch = fetch;

const supabaseUrl = process.env.SUPABASE_URL || 'http://fake-website.lakjsdflakjfds'
const supabaseKey = process.env.SUPABASE_KEY || 'fake-token-please-replace'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { storage: supabaseStorage },
  global: {
    fetch: lynxFetch
  },
})

