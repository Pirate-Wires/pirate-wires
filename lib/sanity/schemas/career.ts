import { defineField, defineType } from 'sanity';
import { LuBriefcase } from 'react-icons/lu';

export default defineType({
  name: 'Career',
  type: 'document',
  title: 'Careers',
  icon: LuBriefcase,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'text',
      rows: 1
    }),
    defineField({
      title: 'Date',
      name: 'date',
      type: 'date',
      options: {
        dateFormat: 'MMM DD, YYYY'
      }
    }),
    defineField({
      title: 'Link',
      name: 'link',
      type: 'text',
      rows: 1
    }),
  ],
});
