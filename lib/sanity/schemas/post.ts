// /lib/sanity/schemas/post.ts
import SendEmailCustomerIO from './SendEmailCustomerIO';

const schema = {
  name: 'post',
  title: 'Posts',
  type: 'document',
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  }),
  fields: [
    {
      name: 'title',
      placeholder: 'Enter title here',
      title: 'Title',
      type: 'string'
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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Subtitle',
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
    // {
    //   name: 'paidContent',
    //   title: 'Paid Content',
    //   type: 'blockContent'
    // },

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
