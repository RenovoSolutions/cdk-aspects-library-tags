import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Renovo Solutions',
  authorAddress: 'webmaster+cdk@renovo1.com',
  cdkVersion: '2.208.0',
  defaultReleaseBranch: 'master',
  jsiiVersion: '~5.8.0',
  name: '@renovosolutions/cdk-aspects-library-tags',
  description: 'A library of CDK aspects for tagging AWS resources',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/RenovoSolutions/cdk-aspects-library-tags.git',
  keywords: [
    'aws-cdk',
    'aws-cdk-aspects',
    'aspects',
    'tags',
    'kms',
    'projen',
  ],
  depsUpgrade: true,
  depsUpgradeOptions: {
    workflow: false,
    exclude: ['projen'],
  },
  githubOptions: {
    mergify: false,
    pullRequestLintOptions: {
      semanticTitle: false,
    },
  },
  stale: false,
  releaseToNpm: true,
  release: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  docgen: true,
  eslint: true,
  publishToPypi: {
    distName: 'renovosolutions.aws-cdk-aspects-tags',
    module: 'renovosolutions_aspects_tags',
  },
  publishToNuget: {
    dotNetNamespace: 'renovosolutions',
    packageId: 'Renovo.AWSCDK.AspectsTags',
  },
});

new javascript.UpgradeDependencies(project, {
  include: ['projen'],
  taskName: 'upgrade-projen',
  workflow: true,
  workflowOptions: {
    schedule: javascript.UpgradeDependenciesSchedule.WEEKLY,
  },
});

project.synth();