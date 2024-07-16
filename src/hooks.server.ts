import type { Handle } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';

export const handle: Handle = async ({ event, resolve }) => {
    console.log('Hooook!!');
    
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
          getAll: () => event.cookies.getAll(),
          /**
           * SvelteKit's cookies API requires `path` to be explicitly set in
           * the cookie options. Setting `path` to `/` replicates previous/
           * standard behavior.
           */
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) => {
              event.cookies.set(name, value, { ...options, path: '/' })
            })
          },
        },
    })

      /**
       * a little helper that is written for convenience so that instead
       * of calling `const { data: { session } } = await supabase.auth.getSession()`
       * you just call this `await getSession()`
       */
      event.locals.safeGetSession = async () => {
        const {
          data: { session },
        } = await event.locals.supabase.auth.getSession()
        if (!session) {
          return { session: null, user: null }
        }

        const {
          data: { user },
          error,
        } = await event.locals.supabase.auth.getUser()
        if (error) {
          // JWT validation has failed
          return { session: null, user: null }
        }

        return { session, user }
      }

      return resolve(event, {
        filterSerializedResponseHeaders(name) {
          return name === 'content-range'
        },
      })
};