const schema = {
  name: 'job',
  title: 'Jobs',
  type: 'document',
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  }),
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'utl',
      title: 'URL',
      type: 'string'
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'body',
      title: 'Body',
      description:
        'The excerpt is used in blog feeds and as the subtitle in Newsletters, and also for search results',
      type: 'blockContent'
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
