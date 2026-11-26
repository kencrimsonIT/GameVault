# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## Social sign-in (Google, Facebook, Discord)

The auth page supports three OAuth providers through Supabase Auth. Supabase
performs the authorization-code exchange server-side, so the Vite app only needs
the public project URL and publishable (anon) key.

### 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Open **Project Settings -> API** and copy the **Project URL** and
   **publishable/anon key**.
3. Add them to `game-vault/.env` (see `.env.example`):

   ```dotenv
   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_...
   ```

   Use the bare project URL. Do **not** append `/rest/v1` or `/auth/v1`: the
   Supabase client adds the auth path itself, and a suffixed URL makes OAuth
   sign-in fail with `No API key found in request`.

4. Open **Authentication -> URL Configuration** and add the app redirect URLs:

   ```text
   http://localhost:5173/auth/callback
   https://your-production-domain.com/auth/callback
   ```

   Set the Site URL to `http://localhost:5173` while developing. If Vite picks a
   different port, add that exact callback URL too.

### 2. Configure each provider

For every provider below, use `https://<project-ref>.supabase.co/auth/v1/callback`
as the provider-side redirect/callback URL, then paste the provider's client ID
and secret into the matching provider in **Authentication -> Sign In / Providers**.

| Provider | Where to create the app | Provider redirect setting |
| --- | --- | --- |
| Google | Google Cloud Console -> APIs & Services -> Credentials -> Create OAuth client ID -> Web application | Authorized redirect URI: Supabase callback above. Add `http://localhost:5173` as an authorized JavaScript origin. |
| Facebook | [developers.facebook.com](https://developers.facebook.com) -> Create App -> Consumer -> add Facebook Login | Facebook Login -> Settings -> Valid OAuth Redirect URIs: Supabase callback above. The app must be Live (or the tester must be added), and the `email` permission is required. |
| Discord | [discord.com/developers/applications](https://discord.com/developers/applications) -> New Application -> OAuth2 | Add the Supabase callback URL under Redirects. |

Restart `pnpm dev` after changing `.env`.

### 3. How the app handles the flow

- The buttons in `src/features/auth/components/SocialAuthButtons.tsx` call
  `signInWithOAuth` with PKCE and redirect to the provider.
- Supabase returns to `/auth/callback`, where `AuthCallbackPage` reads the
  session and maps the provider profile into the app's `User` model.
- Existing accounts are linked by email and the provider is added to
  `authProviders`; new social accounts are created in `data/db.json` through
  json-server. The local session is stored the same way as email/password login.
- Logging out clears both the app session and the Supabase session.
- If a provider does not return an email address, the login is rejected with a
  message asking the user to grant email access.

Run the mock API while testing so social profiles can be created:

```bash
pnpm api
pnpm dev
```
