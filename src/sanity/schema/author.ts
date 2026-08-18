import { defineField, defineType } from 'sanity'
// import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  // icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).error('Author name is required'),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      placeholder: 'e.g. Ark Team, Editorial, Official',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'avatar' },
  },
})