const schema = {
  name: 'post',
  title: 'Post',
  type: 'document',
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  }),
  fields: [
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' }
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'The Wire', value: 'the-wire' },
          { title: 'The Industry', value: 'the-industry' },
          { title: 'The White Pill', value: 'the-white-pill' }
          // Add more predefined sections as needed
        ]
      }
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO accessiblity.'
        }
      ],
      options: {
        hotspot: true
      }
    },

    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'featured',
      title: 'Mark as Featured',
      type: 'boolean',
      layout: 'radio'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
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
      name: 'excerpt',
      title: 'Excerpt',
      description:
        'The excerpt is used in blog feeds, and also for search results',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200)
    }
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },

    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      });
    }
  }
};

export default schema;
