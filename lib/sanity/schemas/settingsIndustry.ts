import { LuBuilding2 } from 'react-icons/lu';

import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'settingsIndustry',
  type: 'document',
  title: 'The Industry',
  icon: LuBuilding2,
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: 'Social Media',
      name: 'social'
    },
    {
      title: 'Section Logo',
      name: 'logos',
      options: {
        collapsible: true,
        collapsed: false
      }
    }
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section title'
    }),
    defineField({
      title: 'Main logo',
      description: 'Upload your main logo here. SVG preferred. ',
      name: 'logo',
      type: 'image',
      fieldset: 'logos',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.'
        }
      ]
    }),

    defineField({
      title: 'Alternate logo (optional)',
      description:
        'Upload alternate logo here. it can be light / dark variation ',
      name: 'logoalt',
      type: 'image',
      fieldset: 'logos',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.'
        }
      ]
    }),

    defineField({
      name: 'social',
      type: 'array',
      title: 'Social Links',
      description: 'Enter your Social Media URLs',
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'media',
              title: 'Choose Social Media',
              options: {
                list: [
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Linkedin', value: 'linkedin' },
                  { title: 'Youtube', value: 'youtube' }
                ]
              }
            },
            {
              type: 'url',
              name: 'url',
              title: 'Full Profile URL'
            }
          ],
          preview: {
            select: {
              title: 'media',
              subtitle: 'url'
            }
          }
        }
      ]
    }),

    defineField({
      title: 'Meta Description',
      name: 'description',
      fieldset: 'metadata',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.min(20).max(200),
      description: 'Enter SEO Meta Description'
    }),

    defineField({
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      fieldset: 'metadata'
    })
  ]
});
