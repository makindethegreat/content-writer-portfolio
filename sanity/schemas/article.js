import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'article', title: 'Article', type: 'document',
  fields: [
    defineField({name:'title',type:'string',validation:r=>r.required()}),
    defineField({name:'slug',type:'slug',options:{source:'title',maxLength:96},validation:r=>r.required()}),
    defineField({name:'excerpt',type:'text',rows:3}),
    defineField({name:'coverImage',type:'image',options:{hotspot:true},fields:[{name:'alt',type:'string',title:'Alternative text'}]}),
    defineField({name:'featuredImageUrl',type:'string',title:'Legacy featured image URL'}),
    defineField({name:'markdownBody',type:'text',title:'Markdown body (legacy import)',rows:20,description:'Used for safely migrated Markdown posts. Portable Text body takes precedence when present.'}),
    defineField({name:'category',type:'string',options:{list:['Content Strategy','SEO','AI Search','B2B SaaS','Research','Opinion']}}),
    defineField({name:'tags',type:'array',of:[{type:'string'}]}),
    defineField({name:'publishedAt',type:'datetime'}),
    defineField({name:'author',type:'string',initialValue:'Makinde'}),
    defineField({name:'body',type:'array',of:[{type:'block',marks:{annotations:[{type:'object',name:'link',title:'Link',fields:[{name:'href',type:'url',title:'URL'}]}]}},{type:'image',options:{hotspot:true},fields:[{name:'alt',type:'string',title:'Alternative text'}]}]}),
    defineField({name:'relatedCaseStudies',type:'array',of:[{type:'reference',to:[{type:'caseStudy'}]}]}),
    defineField({name:'relatedResearch',type:'array',of:[{type:'reference',to:[{type:'research'}]}]}),
    defineField({name:'seoTitle',type:'string'}),
    defineField({name:'seoDescription',type:'text',rows:2}),
    defineField({name:'canonicalUrl',type:'url'}),
    defineField({name:'draft',type:'boolean',initialValue:false})
  ]
})
