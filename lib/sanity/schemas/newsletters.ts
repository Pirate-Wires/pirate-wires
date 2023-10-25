import { LuNewspaper } from 'react-icons/lu';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'singleNewsletters',
  type: 'document',
  title: 'Newsletters',
  icon: LuNewspaper,
  fields: [
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug'
    }),
    defineField({
      name: 'pirate_wires_frequency',
      type: 'text',
      title: 'PW frequency',
      rows: 1
    }),
    defineField({
      name: 'industry_frequency',
      type: 'text',
      title: 'Industry frequency',
      rows: 1
    }),
    defineField({
      name: 'white_pill_frequency',
      type: 'text',
      title: 'White Pill frequency',
      rows: 1
    }),

  ]
});
