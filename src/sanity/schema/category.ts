import { defineField, defineType } from 'sanity'
import { CATEGORY_SLUGS } from '../../lib/posts'
// import { TagIcon } from '@sanity/icons'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  // icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required().min(2).max(50).error('Title is required and must be between 2–50 characters'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Use a category slug from the journal: general-tech-and-digital-innovation, modern-full-stack-development, data-analytics-and-engineering, tech-and-software-insights, rant, or uncategorised.',
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
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (
            typeof value !== 'object' ||
            value === null ||
            !('current' in value) ||
            typeof value.current !== 'string'
          ) {
            return 'Slug is required'
          }

          return CATEGORY_SLUGS.some((slug) => slug === value.current)
            ? true
            : 'Choose a slug defined in src/lib/posts.ts'
        }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})