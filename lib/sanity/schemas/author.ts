import { UsersIcon } from '@sanity/icons';

const schema = {
  name: 'author',
  title: 'Authors',
  type: 'document',
  icon: UsersIcon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      title: 'Position',
      name: 'position',
      type: 'string',
      initialValue: 'core',
      options: {
        list: [
          { title: 'Core Writer', value: 'core' },
          { title: 'Contributor', value: 'contributor' }
        ]
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: []
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      position: 'position'
    }
  }
};

export default schema;
