# Instructions
- clone
- `npm install`
- `npm run dev`
- Login via Google provider
- Refresh the page

# Behavior
- Results will not show on page refresh
  - supabaseClient will call with anon token instead of user token
- Results will show on login redirect or on HMR refresh

# Notes
- Log the results, you'll see in the vite console the results are there (available on server). But are not available in the browser
- I noticed `startSupabaseSessionSync` sets auth inside `onMount`. I believe this is why even if you move the `loadItems` call to `onMount` or check for `browser` it still doesn't work because it still gets called slightly before auth is available on the supabaseClient. Hence why the setTimeout works.
- If you add some sort of second subscription to the `if` statement it works because it fires twice, once when supabaseClient is not ready (when user emits) and once immediately after when it is
- Maybe there should be some sort of callback/value/emission that lets you know when auth is ready instead of checking for `$page.data.session.user` which doesn't necessarily let you know if auth is available on the `supabaseClient`
