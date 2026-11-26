import {defineType, defineField} from 'sanity'
export default defineType({
  name:'service',title:'Service',type:'document',
  fields:[
    defineField({name:'title',type:'string',validation:r=>r.required()}),
    defineField({name:'slug',type:'slug',options:{source:'title'}}),
    defineField({name:'summary',type:'text',rows:3}),
    defineField({name:'description',type:'array',of:[{type:'block'}]}),
    defineField({name:'problemsSolved',type:'array',of:[{type:'string'}]}),
    defineField({name:'deliverables',type:'array',of:[{type:'string'}]}),
    defineField({name:'process',type:'array',of:[{type:'block'}]}),
    defineField({name:'ctaLabel',type:'string'}),
    defineField({name:'ctaUrl',type:'url'}),
    defineField({name:'sortOrder',type:'number'})
  ]
})
