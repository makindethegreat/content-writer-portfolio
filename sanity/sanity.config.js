import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'vevnit-studio',
  title: 'Vevnit Content Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ae69pj79',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [deskTool(), visionTool()],
  schema: {types: schemaTypes},
})
