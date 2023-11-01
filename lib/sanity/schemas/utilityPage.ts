import { UsersIcon } from '@sanity/icons';

const schema = {
  name: 'utilityPage',
  title: 'Utility pages',
  type: 'document',
  icon: UsersIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
    {
      title: 'Show subscribe CTA',
      name: 'subscribeCta',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
};

export default schema;
