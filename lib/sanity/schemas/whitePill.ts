import { LuPill } from "react-icons/lu";

import { defineField, defineType } from "sanity";

export default defineType({
  name: "whitePill",
  type: "document",
  title: "The White Pill",
  icon: LuPill,
  fields: [
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
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
