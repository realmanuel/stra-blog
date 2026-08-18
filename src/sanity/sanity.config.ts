import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'Ark-blog',
  title: 'Ark Blog',
  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Ark Journal')
          .items([
            S.listItem()
              .title('📝 Posts')
              .child(
                S.documentTypeList('post')
                  .title('All Posts')
.defaultOrdering([
  {
    field: 'publishedAt',
    direction: 'desc',
  },
])
              ),
            S.divider(),
            S.listItem()
              .title('🏷️ Categories')
              .child(S.documentTypeList('category').title('Categories')),
            S.listItem()
              .title('👤 Authors')
              .child(S.documentTypeList('author').title('Authors')),
          ]),
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})
