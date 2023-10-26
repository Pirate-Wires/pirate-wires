import { defineField, defineType } from 'sanity';
import { LuBriefcase } from 'react-icons/lu';

export default defineType({
  name: 'Career',
  type: 'document',
  title: 'Careers',
  icon: LuBriefcase,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'text',
      rows: 1
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
      options: {
        dateFormat: 'MMM DD, YYYY'
      }
    },
    {
      title: 'Link',
      name: 'link',
      type: 'text',
      rows: 1
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
});
