import {LuPin} from "react-icons/lu";
import {defineField} from "sanity";

const schema = {
  name: "utilityPage",
  title: "Utility pages",
  type: "document",
  icon: LuPin,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      title: "Show subscribe CTA",
      name: "subscribeCta",
      type: "boolean",
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
};

export default schema;
