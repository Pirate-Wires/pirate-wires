// /lib/sanity/schemas/post.ts
import {defineArrayMember, defineField} from "sanity";

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
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Subtitle',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200)
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      validation: Rule => Rule.required(),
      to: { type: 'author' }
    },
    {
      name: 'body',
      title: 'Body',
      validation: Rule => Rule.required(),
      type: 'blockContent',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      validation: Rule => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO accessiblity.'
        },
        {
          name: 'caption',
          type: 'text',
          title: 'Optional caption',
          rows: 1
        }
      ],
      options: {
        hotspot: true
      }
    },
    {
      title: 'Wide image top',
      name: 'wide_image_top',
      type: 'boolean'
    },
    {
      title: 'Newsletter',
      name: 'newsletter',
      type: 'boolean'
    },
    {
      title: 'Show newsletter in grid',
      name: 'newsletter_in_grid',
      type: 'boolean'
    },
    {
      name: 'section',
      title: 'Section',
      type: 'string',
      validation: Rule => Rule.required(),
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    // {
    //   name: 'paidContent',
    //   title: 'Paid Content',
    //   type: 'blockContent'
    // },
    defineField({
      title: 'Meta Title',
      name: 'meta_title',
      type: 'text',
      rows: 1
    }),

    defineField({
      title: 'Meta Description',
      name: 'meta_description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.min(20).max(200)
    }),

    defineField({
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.'
    }),
    defineField({
      title: 'Related posts override',
      description: 'Three posts of your choosing to be recirculated with this article',
      name: 'related_posts',
      type: 'array',
      of: [{
        title: 'Post',
        name: 'related_post',
        type: 'reference',
        to: [{type: 'post'}]
      }]
    }),
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    }
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'section',
      media: 'mainImage'
    },
  }
};

export default schema;
