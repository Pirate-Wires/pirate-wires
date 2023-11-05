# Pirate Wires

This is a Next.js project w/ Sanity Studio for content management and Supabase for auth and comments. Auth is integrating Supabase with Stripe so that we can have pay-walled content.

One of the most important aspects of this project is newlsetter sending. We are using customer.io to handle our email delivery and email templating. The content for the emails is managed in Sanity Studio and then sent to customer.io via `/lib/sanity/schemas/SendEmailCustomerIO.jsx` where we make use of `useFormValue` to shape the body of the api request in the Sanity Studio Post editor UI.

## Supabase

[commenting_user_profiles.sql](/pirate-wires/supabase/commenting_user_profiles.sql) and [stripe_customers.sql](/pirate-wires/supabase/stripe_customers.sql) are the two table sets we have created in Supabase which deal with commenting and payments.

The site is deployed as "production" to https://pirate-wires.vercel.app
Only the main branch is being worked on as the site is still in development. The day will come when we point piratewires.com to this vercel app and then we will have a "staging" branch and a "production" branch. Best to commit directly to main now and avoid branching.

## Next.js

We are using Next.js 13 w/ `@supabase/auth-helpers-nextjs` for authentication which is a slightly different flavor than next-auth but the patterns are mostly the same. The front-end is React components w/ Tailwind and most components can be found in `/components/` and `/lib/supabase-comments/components/` for the comments related components.

`/app/(website)/` is the main site liveing in the app dir. Apart from the `public` directory and the `(website)` directory, no "front-end" content is anywhere else.

## Sanity Studio

The Sanity Studio is where we manage the content for the site. https://localhost:3000/studio/ or https://pirate-wires.vercel.app/studio/

- `/app/(sanity)/` is where the sanity studio lives.
- `/lib/sanity/` is where the sanity client, schemas, and queries live.

## Stripe

See Supabase section above. We are using Supabase with Stripe payments to handle subscriptions and site access vie Supabase wrappers.

## Customer.io

Email template design happens here. Presently we are using a Foundation based CSS library that customer.io has by default, however a Tailwind library would be prefereable.

## Local Development

`pnpm install`

`pnpm run dev`

Team members please ping [@whaleen](https://github.com/whaleen) for env vars.

## Local Sanity Studio

`sanity start`

### CLI

CLI for Vercel, Sanity, and Supabase, are installed as devDependencies.

Stripe Cli can be installed with `brew install stripe/stripe-cli/stripe` or see
https://stripe.com/docs/stripe-cli for more options.

Vercel, Sanity, and Supabase:

- https://vercel.com/docs/cli
- https://www.sanity.io/docs/cli
- https://supabase.com/docs/guides/cli
