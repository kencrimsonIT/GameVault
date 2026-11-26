// The Supabase client appends `/auth/v1` itself, so pasting the Data API
// (`/rest/v1`) or Auth endpoint would produce a broken `/rest/v1/auth/v1/...`
// request that Supabase answers with "No API key found in request".
const normalizeSupabaseUrl = (value: string) =>
    value
        .trim()
        .replace(/\/+$/, '')
        .replace(/\/(rest|auth)\/v1$/i, '')

export const env = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    supabaseUrl: normalizeSupabaseUrl(import.meta.env.VITE_SUPABASE_URL ?? ''),
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? '',
}
