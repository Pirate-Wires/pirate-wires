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
  ],
});