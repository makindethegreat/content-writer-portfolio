import {defineType, defineField} from 'sanity'
export default defineType({
  name:'research',title:'Research & experiments',type:'document',
  fields:[
    defineField({name:'title',type:'string',validation:r=>r.required()}),
    defineField({name:'slug',type:'slug',options:{source:'title'},validation:r=>r.required()}),
    defineField({name:'summary',type:'text',rows:3}),
    defineField({name:'researchQuestion',type:'text',rows:2}),
    defineField({name:'hypothesis',type:'text',rows:2}),
    defineField({name:'methodology',type:'array',of:[{type:'block'}]}),
    defineField({name:'sample',type:'string'}),
    defineField({name:'findings',type:'array',of:[{type:'block'}]}),
    defineField({name:'limitations',type:'text',rows:3}),
    defineField({name:'charts',type:'array',of:[{type:'image',options:{hotspot:true}}]}),
    defineField({name:'sources',type:'array',of:[{type:'object',name:'source',fields:[{name:'label',type:'string'},{name:'url',type:'url'}]}]}),
    defineField({name:'relatedArticles',type:'array',of:[{type:'reference',to:[{type:'article'}]}]}),
    defineField({name:'publishedAt',type:'datetime'}),
    defineField({name:'featured',type:'boolean',initialValue:false})
  ]
})
