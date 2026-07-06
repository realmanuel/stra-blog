    import { defineConfig } from 'sanity'
    import { structureTool } from 'sanity/structure'
    import { visionTool } from '@sanity/vision'
    import { mediaPlugin } from 'sanity-plugin-media'
    import { schemaTypes } from './schema'

    export default defineConfig({
    name: 'stra-blog',
    title: 'Stra Blog',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    plugins: [
        structureTool({
        structure: (S) =>
            S.list()
            .title('Stra Journal')
            .items([
                S.listItem()
                .title('Posts')
                .child(S.documentTypeList('post').title('All Posts')),
                S.divider(),
                S.listItem()
                .title('Categories')
                .child(S.documentTypeList('category').title('Categories')),
                S.listItem()
                .title('Authors')
                .child(S.documentTypeList('author').title('Authors')),
            ]),
        }),
        visionTool(),
        mediaPlugin(),
    ],
    schema: { types: schemaTypes },
    })