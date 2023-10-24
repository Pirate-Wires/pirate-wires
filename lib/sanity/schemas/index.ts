// /lib/sanity/schemas/index.ts

import SendEmailCustomerIOComponent from './SendEmailCustomerIOComponent';
import author from './author';
import blockContent from './blockContent';
import category from './category';
import podcast from './podcast';
import job from './jobs';
import post from './post';
import settings from './settings';
import globalFields from './globalFields';
import home from './home';
import industry from './industry';
import settingsPirateWires from './settingsPirateWires';
import settingsWhitePill from './settingsWhitePill';

export const schemaTypes = [
  post,
  podcast,
  job,
  author,
  category,
  settings,
  globalFields,
  home,
  settingsPirateWires,
  settingsWhitePill,
  industry,
  blockContent,
  SendEmailCustomerIOComponent
];
