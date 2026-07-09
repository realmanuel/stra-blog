import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Meta & SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // ── Content group ──
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required().min(10).max(120).error('Title must be between 10–120 characters'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short summary shown on cards and in search results. Max 300 characters.',
      validation: (Rule) =>
        Rule.required().max(300).error('Excerpt is required, max 300 characters'),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
                  }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
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
          title: 'Pull Quote / Callout',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required().max(300),
            }),
          ],
          preview: {
            select: { title: 'text' },
            prepare({ title }: { title: string }) {
              return { title: `❝ ${title?.slice(0, 60)}…` }
            },
          },
        },
      ],
    }),

    // ── Meta group ──
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'meta',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'meta',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required().error('Alt text is required'),
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('Published date is required'),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      group: 'meta',
      placeholder: 'e.g. 5 min read',
      validation: (Rule) => Rule.max(20),
    }),

    // ── Settings group ──
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'settings',
      validation: (Rule) => Rule.required().error('Category is required'),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'settings',
      validation: (Rule) => Rule.required().error('Author is required'),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      group: 'settings',
      description: 'Only one post should be featured at a time. It becomes the hero on the blog homepage.',
      initialValue: false,
    }),
  ],

  // Orderings for the Studio list view
  orderings: [
    {
      title: 'Published Date (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date (oldest first)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      category: 'category.title',
      media: 'coverImage',
      featured: 'featured',
      publishedAt: 'publishedAt',
    },
    prepare({
      title,
      author,
      category,
      media,
      featured,
      publishedAt,
    }: {
      title: string
      author: string
      category: string
      media: unknown
      featured: boolean
      publishedAt: string
    }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : 'No date'
      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: `${category ?? 'No category'} · ${author ?? 'No author'} · ${date}`,
        media,
      }
    },
  },
})