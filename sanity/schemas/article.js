import {defineType, defineField} from 'sanity'

const linkAnnotation = {
  type: 'object',
  name: 'link',
  title: 'External link',
  fields: [{name: 'href', type: 'url', title: 'URL', validation: rule => rule.required()}]
}
const internalLinkAnnotation = {
  type: 'object',
  name: 'internalArticleLink',
  title: 'Link to Vevnit article',
  fields: [{name: 'article', type: 'reference', title: 'Article', to: [{type: 'article'}], validation: rule => rule.required()}]
}
const textBlock = {
  type: 'block',
  styles: [
    {title: 'Normal', value: 'normal'},
    {title: 'Heading 2', value: 'h2'},
    {title: 'Heading 3', value: 'h3'},
    {title: 'Heading 4', value: 'h4'},
    {title: 'Quote', value: 'blockquote'}
  ],
  marks: {decorators: [{title: 'Bold', value: 'strong'}, {title: 'Italic', value: 'em'}, {title: 'Inline code', value: 'code'}], annotations: [linkAnnotation, internalLinkAnnotation]},
  lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}]
}

export default defineType({
  name: 'article', title: 'Article', type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO & Publishing'},
    {name: 'review', title: 'Editorial checklist'}
  ],
  fields: [
    defineField({name:'title',type:'string',group:'content',validation:r=>r.required().min(10)}),
    defineField({name:'slug',type:'slug',group:'content',options:{source:'title',maxLength:96},validation:r=>r.required()}),
    defineField({name:'excerpt',type:'text',group:'content',rows:3,validation:r=>r.max(240)}),
    defineField({name:'coverImage',type:'image',group:'content',options:{hotspot:true},fields:[{name:'alt',type:'string',title:'Alternative text',validation:r=>r.required()}]}),
    defineField({name:'featuredImageUrl',type:'string',title:'Legacy featured image URL',group:'content'}),
    defineField({name:'markdownBody',type:'text',title:'Markdown body (legacy import)',group:'content',rows:20,description:'Used for migrated Markdown posts. Portable Text body takes precedence.'}),
    defineField({name:'category',type:'string',group:'content',options:{list:['Content Strategy','SEO','AI Search','B2B SaaS','Research','Opinion']},validation:r=>r.required()}),
    defineField({name:'tags',type:'array',group:'content',of:[{type:'string'}]}),
    defineField({name:'publishedAt',type:'datetime',group:'seo'}),
    defineField({name:'author',type:'string',group:'content',initialValue:'Makinde'}),
    defineField({name:'body',title:'Article body',group:'content',type:'array',of:[
      textBlock,
      {type:'image',options:{hotspot:true},fields:[{name:'alt',type:'string',title:'Alternative text',validation:r=>r.required()},{name:'caption',type:'string',title:'Caption'}]},
      {type:'object',name:'callout',title:'Callout / Note',fields:[{name:'tone',type:'string',options:{list:[{title:'Note',value:'note'},{title:'Important',value:'important'},{title:'Warning',value:'warning'}]},initialValue:'note'},{name:'title',type:'string'},{name:'text',type:'text',rows:4,validation:r=>r.required()}]},
      {type:'object',name:'tableBlock',title:'Table',fields:[{name:'caption',type:'string'},{name:'rows',type:'array',of:[{type:'object',name:'tableRow',fields:[{name:'cells',type:'array',of:[{type:'string'}]}]}],validation:r=>r.required().min(1)}]},
      {type:'object',name:'embed',title:'Embed (YouTube / Vimeo)',fields:[{name:'url',type:'url',validation:r=>r.required()},{name:'caption',type:'string'}]},
      {type:'object',name:'ctaBlock',title:'Call to action',fields:[{name:'eyebrow',type:'string'},{name:'title',type:'string',validation:r=>r.required()},{name:'text',type:'text',rows:3},{name:'buttonLabel',type:'string',validation:r=>r.required()},{name:'buttonUrl',type:'url',validation:r=>r.required()}]},
      {type:'object',name:'codeBlock',title:'Code block',fields:[{name:'language',type:'string'},{name:'code',type:'text',rows:12,validation:r=>r.required()}]}
    ]}),
    defineField({name:'relatedCaseStudies',type:'array',group:'content',of:[{type:'reference',to:[{type:'caseStudy'}]}]}),
    defineField({name:'relatedResearch',type:'array',group:'content',of:[{type:'reference',to:[{type:'research'}]}]}),
    defineField({name:'seoTitle',type:'string',group:'seo',validation:r=>r.max(70)}),
    defineField({name:'seoDescription',type:'text',rows:2,group:'seo',validation:r=>r.max(160)}),
    defineField({name:'canonicalUrl',type:'url',group:'seo'}),
    defineField({name:'draft',type:'boolean',group:'seo',initialValue:false}),
    defineField({name:'editorialChecklist',title:'Editorial checklist',group:'review',type:'object',fields:[
      {name:'factChecked',type:'boolean',title:'Claims, sources and facts checked'},
      {name:'linksChecked',type:'boolean',title:'Links tested'},
      {name:'imageAltChecked',type:'boolean',title:'Image alt text checked'},
      {name:'seoChecked',type:'boolean',title:'SEO title and description reviewed'},
      {name:'proofread',type:'boolean',title:'Proofread and formatted'},
      {name:'finalReview',type:'boolean',title:'Final editorial review completed'}
    ]})
  ]
})
