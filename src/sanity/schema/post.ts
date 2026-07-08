    import { defineField, defineType } from 'sanity'

    export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
        }),
        defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'title', maxLength: 96 },
        validation: (Rule) => Rule.required(),
        }),
        defineField({
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        rows: 3,
        validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }],
        validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
            // validation line 
            validation: (Rule) => Rule.required().error('A cover image is required to publish this post.'),
            fields: [
                defineField({
                name: 'alt',
                title: 'Alt Text',
                type: 'string',
                }),
            ],
            }),
        defineField({
        name: 'coverImage',
        title: 'Cover Image',
        type: 'image',
        options: { hotspot: true },
        fields: [
            defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            }),
        ],
        }),
        defineField({
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
        initialValue: () => new Date().toISOString(),
        validation: (Rule) => Rule.required(),
        }),
        defineField({
        name: 'readTime',
        title: 'Read Time',
        type: 'string',
        placeholder: 'e.g. 5 min read',
        }),
        defineField({
        name: 'featured',
        title: 'Featured Post',
        type: 'boolean',
        description: 'Mark this post as the featured hero on the blog homepage.',
        initialValue: false,
        }),
        defineField({
        name: 'body',
        title: 'Body',
        type: 'array',
        of: [
            {
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'Heading 2', value: 'h2' },
                { title: 'Heading 3', value: 'h3' },
            ],
            marks: {
                decorators: [
                { title: 'Bold', value: 'strong' },
                { title: 'Italic', value: 'em' },
                ],
            },
            },
            {
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({
                name: 'alt',
                title: 'Alt Text',
                type: 'string',
                }),
                defineField({
                name: 'caption',
                title: 'Caption',
                type: 'string',
                }),
            ],
            },
            {
            type: 'object',
            name: 'callout',
            title: 'Callout / Quote',
            fields: [
                defineField({
                name: 'text',
                title: 'Text',
                type: 'text',
                rows: 3,
                }),
            ],
            preview: {
                select: { title: 'text' },
                prepare({ title }: Record<string, any>) {
                return { title: `" ${title}"` }
                },
            },
            },
        ],
        }),
    ],
    preview: {
        select: {
        title: 'title',
        author: 'author.name',
        media: 'coverImage',
        featured: 'featured',
        },
        prepare({ title, author, media, featured }: Record<string, any>) {
        return {
            title: featured ? `⭐ ${title}` : title,
            subtitle: author,
            media,
        }
        },
    },
    })