# Vevnit Sanity deployment and publishing

## Studio deployment
1. From the repository root, run `cd sanity`.
2. Install Studio dependencies: `npm install`.
3. Preview locally: `npm run dev`.
4. Authenticate with `npx sanity login`.
5. Deploy Studio with `npm run deploy` and choose a hostname.

Studio is deployed separately from the public Eleventy website.

## Public dataset
Eleventy reads published content from Sanity Content API. The dataset must be public for unauthenticated static builds. The website uses no write token. Never put a Sanity write token in frontend environment variables.

## GitHub publishing webhook
After the integration is merged and deployed, create a webhook in Sanity with:
- URL: `https://api.github.com/repos/makindethegreat/content-writer-portfolio/dispatches`
- Method: POST
- Header `Accept: application/vnd.github+json`
- Header `X-GitHub-Api-Version: 2022-11-28`
- Header `Authorization: Bearer <GitHub fine-grained PAT>`
- JSON body: `{"event_type":"sanity-publish"}`

Create a fine-grained GitHub token scoped to this repository with **Contents: read/write** permission for repository dispatch. Store it only in the Sanity webhook secret header configuration; never commit or share it. The workflow listens for `sanity-publish` repository dispatch events and deploys the default branch.

Webhook filter: `_type in ["article", "caseStudy", "research", "service", "resource", "siteSettings"]`. Trigger on create and update. Configure the webhook to send only published documents if your Sanity webhook options allow that.

## Legacy Markdown migration
Existing Markdown articles remain in `content/posts` and publish at their current URLs. Sanity content is added alongside them. The build excludes Sanity articles whose slug is already used by a published Markdown post, preventing duplicate output.

Run `npm run export:markdown` from the `sanity/` directory to create a reviewable NDJSON export. Import into Sanity only after authentication and dataset access are configured. Do not delete Markdown source files until each imported post is reviewed and its URL, metadata, images and formatting are verified.
