// /lib/sanity/schemas/index.ts

import authors from './authors';
import author from './author';
import blockContent from './blockContent';
import podcasts from './podcasts';
import utilityPages from './utilityPage';
import podcast from './podcast';
import careers from './careers';
import career from './career';
import subscribe from './newsletters';
import post from './post';
import settings from './settings';
import globalFields from './globalFields';
import home from './home';
import pirateWires from './pirateWires';
import theWhitePill from './whitePill';
import theIndustry from './industry';

export const schemaTypes = [
  post,
  podcasts,
  podcast,
  careers,
  career,
  subscribe,
  authors,
  author,
  settings,
  globalFields,
  home,
  pirateWires,
  theWhitePill,
  theIndustry,
  utilityPages,
  blockContent
];
