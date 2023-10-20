import { TagsIcon } from '@sanity/icons';

const schema = {
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: TagsIcon,
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
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Color of the category',
      options: {
        list: [
          { title: 'Green', value: 'green' },
          { title: 'Blue', value: 'blue' },
          { title: 'Purple', value: 'purple' },
          { title: 'Orange', value: 'orange' }
        ]
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
};

export default schema;
