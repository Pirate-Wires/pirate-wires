import { projectId, dataset } from './lib/sanity/config';
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset
  },
  graphql: [
    {
      playground: false,
      tag: 'experiment',
      workspace: 'staging',
      id: 'schema-experiment'
    }
  ]
});
