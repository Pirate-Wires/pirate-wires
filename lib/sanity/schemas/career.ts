import { defineField, defineType } from "sanity";
import { LuBriefcase } from "react-icons/lu";

export default defineType({
  name: "Career",
  type: "document",
  title: "Careers",
  icon: LuBriefcase,
  fields: [
    {
      title: "Title",
      name: "title",
      type: "text",
      rows: 1,
    },
    {
      title: "Date",
      name: "date",
      type: "date",
      options: {
        dateFormat: "MMM DD, YYYY",
      },
    },
    {
      title: "Link",
      name: "link",
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
      title: "title",
    },
  },
});
