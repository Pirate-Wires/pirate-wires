import {TagsIcon} from "@sanity/icons";
import Link from "next/link";

export default function CategoryLabel({categories, nomargin = false}) {
  return (
    <div className="flex gap-3">
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link
            href={`/${category.slug.current}`}
            key={index}
            className="text-xs border border-gray-500 rounded-xs px-2 py-1 hover:bg-gray-300 hover:text-gray-800 transition duration-300 ease-in-out">
            <TagsIcon className="inline-block mr-1" />
            {category.title}
          </Link>
        ))}
    </div>
  );
}
