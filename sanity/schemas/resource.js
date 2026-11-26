import {defineType, defineField} from 'sanity'
export default defineType({
  name:'resource',title:'Resource',type:'document',
  fields:[
    defineField({name:'title',type:'string',validation:r=>r.required()}),
    defineField({name:'url',type:'url'}),
    defineField({name:'description',type:'text',rows:3}),
    defineField({name:'resourceType',type:'string',options:{list:['Article','Tool','Book','Research','Template','Course','Other']}}),
    defineField({name:'topic',type:'string'}),
    defineField({name:'featured',type:'boolean',initialValue:false}),
    defineField({name:'dateAdded',type:'datetime'})
  ]
})
