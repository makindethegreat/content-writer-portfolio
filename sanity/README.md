# Vevnit Content Studio

This is the separate Sanity Studio for Vevnit. It is kept in the `sanity/` directory so the existing Eleventy website remains the public frontend and its build configuration is not disturbed.

## Project

- Sanity project ID: `ae69pj79`
- Dataset: `production`
- Studio title: Vevnit Content Studio

## Run locally

From this directory:

```bash
cd sanity
npm install
npm run dev
```

Copy `.env.example` to `.env` if you want to override the Studio project or dataset configuration. Do not commit credentials or tokens.

## Build

```bash
npm run build
```

## Deploy the Studio

After authenticating with Sanity CLI:

```bash
npm run deploy
```

Choose a Studio hostname when prompted. Studio deployment is separate from the Vevnit website deployment.

## Content types

- Articles: editorial and SEO content, linked to research and case studies
- Case studies: client/project challenge, approach, outcomes and evidence
- Research: experiments, questions, methods, findings, limitations and sources
- Services: service descriptions, problems addressed, deliverables and process
- Resources: tools, guides, books and curated references
- Site settings: homepage messaging, about text and contact/social URLs

## Website integration status

This commit adds the Studio scaffold and schemas. The Eleventy frontend still needs to be connected to the Sanity Content API, existing content migrated, and publishing webhooks configured. Those steps are intentionally separate so the current website build and design are not changed before they can be verified.


## Legacy Markdown export

To prepare existing published Markdown articles for a non-destructive Sanity import, run:

```bash
cd sanity
npm install
npm run export:markdown
```

This creates an ignored NDJSON export in `sanity/import/`. Review the export and import it into the `production` dataset only after confirming the dataset is public and Studio access is set up. Existing Markdown files remain in the repository until imported content is reviewed and URLs are verified.
