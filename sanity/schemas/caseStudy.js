import {defineType, defineField} from 'sanity'
export default defineType({
  name:'caseStudy',title:'Case study / Project',type:'document',
  fields:[
    defineField({name:'title',type:'string',validation:r=>r.required()}),
    defineField({name:'slug',type:'slug',options:{source:'title'},validation:r=>r.required()}),
    defineField({name:'client',type:'string'}),
    defineField({name:'summary',type:'text',rows:3}),
    defineField({name:'coverImage',type:'image',options:{hotspot:true}}),
    defineField({name:'category',type:'string',options:{list:['Content Strategy','SEO','Content','Research','Campaign','Other']}}),
    defineField({name:'challenge',type:'text',rows:4}),
    defineField({name:'objectives',type:'array',of:[{type:'string'}]}),
    defineField({name:'approach',type:'array',of:[{type:'block'},{type:'image',options:{hotspot:true}}]}),
    defineField({name:'results',type:'array',of:[{type:'object',name:'metric',fields:[{name:'value',type:'string'},{name:'label',type:'string'},{name:'context',type:'text'}]}]}),
    defineField({name:'evidence',type:'array',of:[{type:'object',name:'evidenceItem',fields:[{name:'title',type:'string'},{name:'url',type:'url'},{name:'note',type:'text'}]}]}),
    defineField({name:'relatedArticles',type:'array',of:[{type:'reference',to:[{type:'article'}]}]}),
    defineField({name:'featured',type:'boolean',initialValue:false}),
    defineField({name:'publishedAt',type:'datetime'}),
    defineField({name:'seoTitle',type:'string'}),
    defineField({name:'seoDescription',type:'text',rows:2})
  ]
})
