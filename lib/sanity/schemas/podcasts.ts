import { defineArrayMember, defineField, defineType } from 'sanity';
import { LuFileAudio } from 'react-icons/lu';

export default defineType({
  name: 'singlePodcast',
  type: 'document',
  title: 'Podcasts parent',
  icon: LuFileAudio,
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
      title: 'Podcast list',
      name: 'podcast_list',
      type: 'array',
      of: [{
        title: 'Podcast',
        name: 'podcast',
        type: 'reference',
        to: [{type: 'Podcasts'}]
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
