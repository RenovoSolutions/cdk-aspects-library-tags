import {
  aws_s3 as s3,
  aws_kms as kms,
  Aspects,
  App,
  Stack,
} from 'aws-cdk-lib';
import {
  Match,
  Template,
} from 'aws-cdk-lib/assertions';
import {
  ApplyTags,
  ApplyKmsTags,
} from '../src/index';

/**
 * Test suite for the tagging aspects.
 */
describe('Tagging Aspects', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
    new kms.Key(stack, 'TestKey');
    new s3.Bucket(stack, 'TestBucket');
  });

  test('ApplyTags aspect applies tags to taggable resources', () => {
    const tags = { Environment: 'Test', Project: 'CDK' };
    Aspects.of(stack).add(new ApplyTags(tags));

    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();

    // Bucket should have the tags applied
    template.hasResourceProperties('AWS::S3::Bucket', {
      Tags: Match.arrayWith([
        { Key: 'Environment', Value: 'Test' },
      ]),
    });
    template.hasResourceProperties('AWS::S3::Bucket', {
      Tags: Match.arrayWith([
        { Key: 'Project', Value: 'CDK' },
      ]),
    });

    // KMS Key should have the tags applied
    template.hasResourceProperties('AWS::KMS::Key', {
      Tags: Match.arrayWith([
        { Key: 'Environment', Value: 'Test' },
      ]),
    });
    template.hasResourceProperties('AWS::KMS::Key', {
      Tags: Match.arrayWith([
        { Key: 'Project', Value: 'CDK' },
      ]),
    });
  });

  test('ApplyKmsTags aspect applies KMS-specific tags', () => {
    Aspects.of(stack).add(new ApplyKmsTags());

    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();

    // Bucket should not be tagged
    template.hasResourceProperties('AWS::S3::Bucket', {
      Tags: Match.absent(),
    });

    // KMS Key should have the KMS tags applied
    template.hasResourceProperties('AWS::KMS::Key', {
      Tags: Match.arrayWith([
        { Key: 'cfn:stack-name', Value: 'TestStack' },
      ]),
    });
    template.hasResourceProperties('AWS::KMS::Key', {
      Tags: Match.arrayWith([
        { Key: 'cfn:logical-id', Value: Match.stringLikeRegexp('TestKey') },
      ]),
    });
  });

  test('Use both aspects together', () => {
    const tags = { Environment: 'Test', Project: 'CDK' };
    Aspects.of(stack).add(new ApplyTags(tags));
    Aspects.of(stack).add(new ApplyKmsTags());

    const template = Template.fromStack(stack);
    expect(template).toMatchSnapshot();

    // Bucket should have the generic tags applied
    template.hasResourceProperties('AWS::S3::Bucket', {
      Tags: Match.arrayWith([
        { Key: 'Environment', Value: 'Test' },
      ]),
    });
    template.hasResourceProperties('AWS::S3::Bucket', {
      Tags: Match.arrayWith([
        { Key: 'Project', Value: 'CDK' },
      ]),
    });

    // Bucket should not have the KMS tags applied
    template.hasResourceProperties('AWS::S3::Bucket', {
      Tags: Match.not(
        Match.arrayWith([
          { Key: 'cfn:stack-name', Value: 'TestStack' },
        ]),
      ),
    });
    template.hasResourceProperties('AWS::S3::Bucket', {
      Tags: Match.not(
        Match.arrayWith([
          { Key: 'cfn:logical-id', Value: Match.stringLikeRegexp('TestKey') },
        ]),
      ),
    });

    // KMS Key should have the generic tags applied
    template.hasResourceProperties('AWS::KMS::Key', {
      Tags: Match.arrayWith([
        { Key: 'Environment', Value: 'Test' },
      ]),
    });
    template.hasResourceProperties('AWS::KMS::Key', {
      Tags: Match.arrayWith([
        { Key: 'Project', Value: 'CDK' },
      ]),
    });

    // KMS Key should have the KMS tags applied
    template.hasResourceProperties('AWS::KMS::Key', {
      Tags: Match.arrayWith([
        { Key: 'cfn:stack-name', Value: 'TestStack' },
      ]),
    });
    template.hasResourceProperties('AWS::KMS::Key', {
      Tags: Match.arrayWith([
        { Key: 'cfn:logical-id', Value: Match.stringLikeRegexp('TestKey') },
      ]),
    });
  });
});