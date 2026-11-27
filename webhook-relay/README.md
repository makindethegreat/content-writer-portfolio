# Sanity → GitHub Pages publish relay

This small Cloudflare Worker verifies the Sanity webhook signature and sends the repository dispatch event that the Vevnit website workflow already accepts.

## Setup
1. Create a Cloudflare Worker named `vevnit-sanity-publish-relay` and deploy this directory.
2. Add Worker secrets `SANITY_WEBHOOK_SECRET` (the same secret configured on the Sanity webhook) and `GITHUB_TOKEN` (fine-grained token for the Vevnit repo, with the minimum repository Contents permission needed for repository dispatch).
3. In Sanity project settings → API → Webhooks, create a webhook pointing to the Worker URL. Choose article create/update/delete events in the production dataset. Set the secret to the Worker secret and ensure Sanity sends `x-sanity-webhook-signature`.
4. Test with a published article and confirm a GitHub Actions run with event `repository_dispatch` and action `sanity-publish`.

**Security:** Never place the GitHub token in the Sanity webhook, Studio, website, or repository. Rotate the token if exposed. The Worker validates Sanity's HMAC signature before dispatching.
