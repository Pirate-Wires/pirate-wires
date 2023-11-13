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
      type: 'string'
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' }
    },
    {
      title: 'Newsletter',
      name: 'newsletter',
      type: 'boolean'
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
      title: 'Wide image top',
      name: 'wide_image_top',
      type: 'boolean'
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
      type: 'blockContent',
    },
    // {
    //   name: 'paidContent',
    //   title: 'Paid Content',
    //   type: 'blockContent'
    // },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
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
    })
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
