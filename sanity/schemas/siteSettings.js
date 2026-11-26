import {defineType, defineField} from 'sanity'
export default defineType({
  name:'siteSettings',title:'Site settings',type:'document',
  fields:[
    defineField({name:'siteName',type:'string'}),
    defineField({name:'siteDescription',type:'text',rows:3}),
    defineField({name:'homepageHeadline',type:'string'}),
    defineField({name:'homepageSubheadline',type:'text',rows:4}),
    defineField({name:'profileName',type:'string'}),
    defineField({name:'profileBio',type:'array',of:[{type:'block'}]}),
    defineField({name:'profileImage',type:'image',options:{hotspot:true}}),
    defineField({name:'email',type:'string'}),
    defineField({name:'linkedin',type:'url'}),
    defineField({name:'x',type:'url'}),
    defineField({name:'ctaLabel',type:'string'}),
    defineField({name:'ctaUrl',type:'url'}),
    defineField({name:'seoTitle',type:'string'}),
    defineField({name:'seoDescription',type:'text',rows:2})
  ]
})
