import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export default defineType({
  name: 'singleAuthors',
  type: 'document',
  title: 'Authors parent',
  icon: UsersIcon,
  fields: [
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug'
    }),
    defineField({
      title: 'Page header',
      name: 'title',
      type: 'text',
      rows: 1
    }),

    defineField({
      title: 'Author list',
      name: 'author_list',
      type: 'array',
      of: [{
        title: 'Author',
        name: 'Author',
        type: 'reference',
        to: [{type: 'author'}]
      }]
    }),

    defineField({
      title: 'Meta Title',
      name: 'meta_title',
      type: 'text',
      rows: 1
    }),

    defineField({
      title: 'Meta Description',
      name: 'meta_description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.min(20).max(200)
    }),

    defineField({
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.'
    })
  ]
});
