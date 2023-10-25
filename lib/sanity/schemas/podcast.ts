import { defineArrayMember, defineField, defineType } from 'sanity';
import { LuFileAudio } from 'react-icons/lu';

export default defineType({
  name: 'singlePodcast',
  type: 'document',
  title: 'Podcast',
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
      type: 'text'
    }),
    defineField({
      title: 'Podcast list',
      description: 'Title, excerpt and platform links for each episode',
      name: 'podcast_list',
      type: 'array',
      of: [
        {
          title: 'Title',
          name: 'title',
          type: 'text'
        },
        {
          title: 'Excerpt',
          name: 'excerpt',
          type: 'text'
        },
        {
          title: 'Author list',
          name: 'author_list',
          type: 'text'
        },
        {
          title: 'Youtube link',
          name: 'youtube_link',
          type: 'text'
        },
        {
          title: 'Apple link',
          name: 'apple_link',
          type: 'text'
        },
        {
          title: 'Spotify link',
          name: 'spotify_link',
          type: 'text'
        }
      ]
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
