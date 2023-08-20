// /lib/sanity/schemas/index.ts

import author from './author';
import blockContent from './blockContent';
import category from './category';
import podcast from './podcast';
import post from './post';
import sendButtonInput from './sendButtonInput';
import settings from './settings';

export const schemaTypes = [
  post,
  podcast,
  author,
  category,
  settings,
  blockContent,
  sendButtonInput
];
