import {BlockElementIcon, HomeIcon} from "@sanity/icons";
import {defineArrayMember, defineField, defineType} from "sanity";

export default defineType({
  name: "singleHome",
  type: "document",
  title: "Home",
  icon: HomeIcon,
  fields: [
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
    }),
    defineField({
      title: "The Wire Featured Posts",
      description:
        "Six posts from The Wire, the first position here gets the featured spot",
      name: "featured_posts",
      type: "array",
      of: [
        {
          title: "Post",
          name: "featured_post",
          type: "reference",
          to: [{type: "post"}],
          options: {
            filter: "section == $section",
            filterParams: {section: "the-wire"},
          },
        },
      ],
    }),
    defineField({
      title: "Latest writers",
      description: "Four exceedingly cool cats",
      name: "latest_writers",
      type: "array",
      of: [
        {
          title: "Writer",
          name: "latest_writer",
          type: "reference",
          to: [{type: "author"}],
        },
      ],
    }),
    defineField({
      title: "White Pill Featured Posts",
      description:
        "Six posts from The White Pill, the first position here gets the featured spot",
      name: "featured_posts_white_pill",
      type: "array",
      of: [
        {
          title: "Post",
          name: "featured_post_white_pill",
          type: "reference",
          to: [{type: "post"}],
          options: {
            filter: "section == $section",
            filterParams: {section: "the-white-pill"},
          },
        },
      ],
    }),
    defineField({
      title: "Industry Featured Posts",
      description:
        "Six posts from The Industry, the first position here gets the featured spot",
      name: "featured_posts_industry",
      type: "array",
      of: [
        {
          title: "Post",
          name: "featured_post_industry",
          type: "reference",
          to: [{type: "post"}],
          options: {
            filter: "section == $section",
            filterParams: {section: "the-industry"},
          },
        },
      ],
    }),
    defineField({
      title: "Dolores Park Featured Posts",
      description:
        "Six posts from Dolores Park, the first position here gets the featured spot",
      name: "featured_posts_dolores_park",
      type: "array",
      of: [
        {
          title: "Post",
          name: "featured_posts_dolores_park",
          type: "reference",
          to: [{type: "post"}],
          options: {
            filter: "section == $section",
            filterParams: {section: "dolores-park"},
          },
        },
      ],
    }),
    defineField({
      name: "podcastCalloutVid",
      type: "file",
      title: "Podcast callout video",
      description: "A 500px wide mp4, with a landscape AR of ~.56",
    }),
    defineField({
      title: "Meta Title",
      name: "meta_title",
      type: "text",
      rows: 1,
    }),

    defineField({
      title: "Meta Description",
      name: "meta_description",
      type: "text",
      rows: 5,
      validation: Rule => Rule.min(20).max(200),
    }),

    defineField({
      name: "openGraphImage",
      type: "image",
      title: "Open Graph Image",
      description: "Image for sharing previews on Facebook, Twitter etc.",
    }),
  ],
});
