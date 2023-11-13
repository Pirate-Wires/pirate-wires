import { defineField, defineType } from 'sanity';
import { LuFileAudio } from 'react-icons/lu';

export default defineType({
  name: 'Podcasts',
  type: 'document',
  title: 'Podcasts',
  icon: LuFileAudio,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'text',
      rows: 1
    }),
    defineField({
      title: 'Excerpt',
      name: 'excerpt',
      type: 'text',
      rows: 5
    }),
    defineField({
      title: 'Author list',
      name: 'author_list',
      type: 'text',
      rows: 2
    }),
    defineField({
      title: 'Youtube link',
      name: 'youtube_link',
      type: 'text',
      rows: 1
    }),
    defineField({
      title: 'Apple link',
      name: 'apple_link',
      type: 'text',
      rows: 1
    }),
    defineField({
      title: 'Spotify link',
      name: 'spotify_link',
      type: 'text',
      rows: 1
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
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
});