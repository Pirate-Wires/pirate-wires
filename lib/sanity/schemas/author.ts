import { UsersIcon } from "@sanity/icons";
import { defineField } from "sanity";

const schema = {
  name: "author",
  title: "Authors",
  type: "document",
  icon: UsersIcon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      title: "Position",
      name: "position",
      type: "string",
      initialValue: "core",
      options: {
        list: [
          { title: "Core Writer", value: "core" },
          { title: "Contributor", value: "contributor" },
        ],
      },
    },
    {
      title: "Title",
      name: "title",
      type: "text",
      rows: 1,
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
    {
      name: "twitter_link",
      title: "Twitter",
      type: "text",
      rows: 1,
    },
    {
      name: "social_text_two",
      title: "Social text two",
      type: "text",
      rows: 1,
    },
    {
      name: "social_link_two",
      title: "Social link two",
      type: "text",
      rows: 1,
    },
    {
      name: "social_text_three",
      title: "Social text three",
      type: "text",
      rows: 1,
    },
    {
      name: "social_link_three",
      title: "Social link three",
      type: "text",
      rows: 1,
    },
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
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};

export default schema;
