# Vevnit CMS publishing automation

The website workflow already listens for the GitHub `repository_dispatch` event `sanity-publish`. To rebuild the static site when an article is published, a secure relay is still required between Sanity and GitHub because GitHub's dispatch API requires authentication.

## Event contract
The relay should send:

- Method: `POST`
- URL: `https://api.github.com/repos/makindethegreat/content-writer-portfolio/dispatches`
- Headers: `Authorization: Bearer <GitHub token>`, `Accept: application/vnd.github+json`, `X-GitHub-Api-Version: 2022-11-28`, `Content-Type: application/json`
- Body: `{"event_type":"sanity-publish","client_payload":{"documentId":"<published article id>"}}`

The GitHub token must be stored in the relay's secret environment, never in Sanity, Studio code, the website, or this repository. Use a fine-grained token scoped only to this repository with the minimum permission required to dispatch repository events (GitHub currently requires Contents: read/write for this endpoint).

## Sanity webhook
Create a webhook in the Sanity project settings for the `production` dataset:
- Trigger: Create, Update, Delete
- Filter: `_type == "article" && draft != true`
- Projection: `{"_id": _id, "slug": slug.current, "publishedAt": publishedAt}`
- Delivery: POST to the relay URL, with the Sanity webhook secret enabled

The relay must validate the Sanity webhook signature before dispatching GitHub. Do not point Sanity directly at the GitHub dispatch API: Sanity cannot safely hold a GitHub bearer token in the webhook configuration. Configure and deploy the relay separately, then test a publish event. The site deployment is not considered automatic until this relay is live and a published article successfully triggers a GitHub Pages run.
