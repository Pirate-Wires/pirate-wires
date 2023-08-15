import React from 'react';
import Link from 'next/link';
import TheWireSVG from '../icons/TheWireSVG';
import TheIndustrySVG from '../icons/TheIndustrySVG';
import TheWhitePillSVG from '../icons/TheWhitePillSVG';

const SectionLabel = ({ section }) => {
  let formattedSection = "No Section"; // Default value

  if (section) {
    formattedSection = section.replace(/-/g, ' ');
  }

  let icon = null;

  if (section === 'the-wire') {
    icon = <TheWireSVG className="w-4 h-4 inline-block" />;
  } else if (section === 'the-industry') {
    icon = <TheIndustrySVG className="w-4 h-4 inline-block" />;
  } else if (section === 'the-white-pill') {
    icon = <TheWhitePillSVG className="w-4 h-4 inline-block" />;
  }

  return (
    <div className="flex gap-3 uppercase text-xs text-gray-400 items-center">
      {/* {icon} */}
      <Link href={`/section/${section}`}>
        {formattedSection}
      </Link>
    </div>
  );
};

export default SectionLabel;
