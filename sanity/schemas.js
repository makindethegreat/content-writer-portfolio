import {defineType, defineField} from 'sanity'

const seoFields = [
  defineField({name: 'seoTitle', title: 'SEO title', type: 'string'}),
  defineField({name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3}),
]

const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}, validation: r => r.required()}),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3}),
    defineField({name: 'publishedAt', title: 'Published date', type: 'datetime'}),
    defineField({name: 'category', title: 'Category', type: 'string'}),
    defineField({name: 'tags', title: 'Tags', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'coverImage', title: 'Cover image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'body', title: 'Body', type: 'array', of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}]}),
    defineField({name: 'relatedResearch', title: 'Related research', type: 'array', of: [{type: 'reference', to: [{type: 'research'}]}]}),
    defineField({name: 'relatedCaseStudies', title: 'Related case studies', type: 'array', of: [{type: 'reference', to: [{type: 'caseStudy'}]}]}),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false}),
    ...seoFields,
  ],
})

const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),
    defineField({name: 'client', title: 'Client / brand', type: 'string'}),
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3}),
    defineField({name: 'challenge', title: 'Challenge', type: 'text', rows: 4}),
    defineField({name: 'approach', title: 'Approach', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'outcomes', title: 'Outcomes / results', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'evidence', title: 'Evidence and metrics', type: 'array', of: [{type: 'object', fields: [defineField({name: 'label', title: 'Metric / evidence', type: 'string'}), defineField({name: 'value', title: 'Value', type: 'string'}), defineField({name: 'note', title: 'Context', type: 'text'})]}]}),
    defineField({name: 'coverImage', title: 'Cover image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'relatedArticles', title: 'Related articles', type: 'array', of: [{type: 'reference', to: [{type: 'article'}]}]}),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false}),
    ...seoFields,
  ],
})

const research = defineType({
  name: 'research',
  title: 'Research / experiment',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),
    defineField({name: 'question', title: 'Research question', type: 'text', rows: 3}),
    defineField({name: 'hypothesis', title: 'Hypothesis / premise', type: 'text', rows: 3}),
    defineField({name: 'method', title: 'Method', type: 'text', rows: 4}),
    defineField({name: 'findings', title: 'Findings', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'limitations', title: 'Limitations', type: 'text', rows: 4}),
    defineField({name: 'sources', title: 'Sources', type: 'array', of: [{type: 'object', fields: [defineField({name: 'title', title: 'Source title', type: 'string'}), defineField({name: 'url', title: 'URL', type: 'url'})]}]}),
    defineField({name: 'relatedArticles', title: 'Related articles', type: 'array', of: [{type: 'reference', to: [{type: 'article'}]}]}),
    defineField({name: 'relatedCaseStudies', title: 'Related case studies', type: 'array', of: [{type: 'reference', to: [{type: 'caseStudy'}]}]}),
    defineField({name: 'publishedAt', title: 'Published date', type: 'datetime'}),
    ...seoFields,
  ],
})

const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Service name', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
    defineField({name: 'problems', title: 'Problems addressed', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'deliverables', title: 'Deliverables', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'process', title: 'Process', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'sortOrder', title: 'Sort order', type: 'number'}),
    defineField({name: 'active', title: 'Active', type: 'boolean', initialValue: true}),
  ],
})

const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: r => r.required()}),
    defineField({name: 'url', title: 'URL', type: 'url', validation: r => r.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({name: 'resourceType', title: 'Type', type: 'string', options: {list: ['Tool', 'Guide', 'Article', 'Book', 'Template', 'Other']}}),
    defineField({name: 'topics', title: 'Topics', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false}),
  ],
})

const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Settings document title', type: 'string', initialValue: 'Vevnit site settings'}),
    defineField({name: 'homeHeadline', title: 'Homepage headline', type: 'string'}),
    defineField({name: 'homeSubheadline', title: 'Homepage subheadline', type: 'text', rows: 3}),
    defineField({name: 'aboutText', title: 'About text', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'contactEmail', title: 'Contact email', type: 'string'}),
    defineField({name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url'}),
    defineField({name: 'websiteUrl', title: 'Website URL', type: 'url'}),
  ],
})

export const schemaTypes = [article, caseStudy, research, service, resource, siteSettings]
