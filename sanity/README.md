# Vevnit Sanity CMS

Separate Studio project; the Eleventy site remains the public frontend.

## Setup
1. Create a Sanity project at https://www.sanity.io/manage and copy the project ID.
2. In `sanity/`, create `.env` based on `.env.example` and set `SANITY_STUDIO_PROJECT_ID` and dataset.
3. Run `npm install` in `sanity/`, then `npm run dev`.
4. Deploy Studio separately with `npm run deploy` and choose a studio hostname.
5. Configure a Sanity webhook targeting the GitHub repository dispatch endpoint. The required GitHub token should be stored as a Sanity secret; configure the webhook with event `publish` and POST to the repository dispatch API with event_type `sanity-publish`.
6. Add GitHub repository Actions variable `SANITY_PROJECT_ID` and `SANITY_DATASET` once the project exists. Public published content is read without a token.

## Content types
Article, case study, research, service, site settings, resource.

This scaffolding does not automatically replace existing static page content. Templates should be migrated incrementally to avoid visual or URL regressions.
