import {LuNewspaper} from "react-icons/lu";
import {defineField, defineType} from "sanity";

export default defineType({
  name: "singleNewsletters",
  type: "document",
  title: "Newsletters",
  icon: LuNewspaper,
  fields: [
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
    }),
    defineField({
      name: "pirate_wires_frequency",
      type: "text",
      title: "PW frequency",
      rows: 1,
    }),
    defineField({
      name: "industry_frequency",
      type: "text",
      title: "Industry frequency",
      rows: 1,
    }),
    defineField({
      name: "white_pill_frequency",
      type: "text",
      title: "White Pill frequency",
      rows: 1,
    }),
    defineField({
      name: "doloresPark_frequency",
      type: "text",
      title: "Dolores Park frequency",
      rows: 1,
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
