import {BlockElementIcon, HomeIcon} from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'singleHome',
  type: 'document',
  title: 'Home',
  icon: HomeIcon,
  fields: [
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug'
    }),
    defineField({
      title: 'The Wire Featured Posts',
      description: 'Six posts from The Wire, the first position here gets the featured spot',
      name: 'featured_posts',
      type: 'array',
      of: [{
        title: 'Post',
        name: 'featured_post',
        type: 'reference',
        to: [{type: 'post'}],
        options: {
          filter: 'section == $section',
          filterParams: {section: 'the-wire'}
        }
      }]
    }),
    defineField({
      title: 'White Pill Featured Posts',
      description: 'Six posts from The White Pill, the first position here gets the featured spot',
      name: 'featured_posts_white_pill',
      type: 'array',
      of: [{
        title: 'Post',
        name: 'featured_post_white_pill',
        type: 'reference',
        to: [{type: 'post'}],
        options: {
          filter: 'section == $section',
          filterParams: {section: 'the-white-pill'}
        }
      }]
    }),
    defineField({
      title: 'Industry Featured Posts',
      description: 'Six posts from The Industry, the first position here gets the featured spot',
      name: 'featured_posts_industry',
      type: 'array',
      of: [{
        title: 'Post',
        name: 'featured_post_industry',
        type: 'reference',
        to: [{type: 'post'}],
        options: {
          filter: 'section == $section',
          filterParams: {section: 'the-industry'}
        }
      }]
    }),
    defineField({
      name: 'podcastCalloutVid',
      type: 'file',
      title: 'Podcast callout video',
      description: 'A 500px wide mp4, with a landscape AR of ~.56'
    })
  ]
});
