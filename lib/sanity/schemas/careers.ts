import { defineField, defineType } from 'sanity';
import { LuBriefcase } from 'react-icons/lu';

export default defineType({
  name: 'singleCareers',
  type: 'document',
  title: 'Careers parent',
  icon: LuBriefcase,
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
      title: 'Career list',
      name: 'career_list',
      type: 'array',
      of: [{
        title: 'Career',
        name: 'career',
        type: 'reference',
        to: [{type: 'Career'}]
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
