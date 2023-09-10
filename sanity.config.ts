// the sanity.config.ts is in a pirate-wires folder in the root of the project.
// todo: decide final location of sanity.config.ts

import { projectId, dataset, previewSecretId } from './lib/sanity/config';
import { pageStructure, singletonPlugin } from './lib/sanity/plugins/settings';
import { schemaTypes } from './lib/sanity/schemas';
import settings from './lib/sanity/schemas/settings';
import { codeInput } from '@sanity/code-input';
import { table } from '@sanity/table';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { deskTool } from 'sanity/desk';

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = ['post'];

export default defineConfig({
  name: 'default',
  title: 'Pirate Wires',
  basePath: '/studio',
  projectId: 'cjtc1tnd',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: pageStructure([settings])
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),
    singletonPlugin(['settings']),
    visionTool(),
    unsplashImageAsset(),
    table(),
    codeInput(),
    vercelDeployTool()
  ],

  schema: {
    types: schemaTypes
  }
});
