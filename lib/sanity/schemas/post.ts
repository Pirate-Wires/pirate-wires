// /lib/sanity/schemas/post.ts

import SendEmailCustomerIO from './SendEmailCustomerIO';

// import SendEmailPostmarkApp from './SendEmailPostmarkApp';

const schema = {
  name: 'post',
  title: 'Post',
  type: 'document',
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  }),
  fields: [
    {
      name: 'featured',
      title: 'Mark as Featured',
      type: 'boolean',
      layout: 'radio'
    },
    {
      name: 'title',
      placeholder: 'Enter title here',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Subtitle',
      description:
        'The excerpt is used in blog feeds and as the subtitle in Newsletters, and also for search results',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200)
    },
    {
      name: 'preface',
      title: 'Preface',
      description: 'Optional note from Solana/Editor preceding the article. ',
      type: 'text'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
    {
      name: 'paidContent',
      title: 'Paid Content',
      type: 'blockContent'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' }
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
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    // {
    //   title: '🚧 PostmarkApp',
    //   name: 'SendEmailPostmarkAppComponent',
    //   type: 'SendEmailPostmarkAppComponent',
    //   components: {
    //     input: SendEmailPostmarkApp
    //   },
    //   options: {
    //     title: 'title', // Pass the title field value to the component
    //     body: 'body' // Pass the body field value to the component
    //   }
    // },
    {
      title: 'Newsletter',
      name: 'SendEmailCustomerIOComponent',
      type: 'SendEmailCustomerIOComponent',
      components: {
        input: SendEmailCustomerIO
      },
      options: {
        title: 'title', // Pass the title field value to the component
        body: 'body' // Pass the body field value to the component
      }
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
