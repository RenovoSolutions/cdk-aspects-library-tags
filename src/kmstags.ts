import { CfnResource, IAspect, Stack, Tags } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

/**
 * An aspect that applies CloudFormation tags to all KMS keys in the given scope.
 *
 * This is useful because KMS keys are not automatically tagged by CloudFormation,
 * which makes them hard to track and manage.
 */
export class ApplyKmsTags implements IAspect {
  constructor() {}

  /**
   * Visits each construct in the scope and applies the tags if the construct is a KMS key.
   */
  visit(node: IConstruct) {
    if (node instanceof CfnResource && node.cfnResourceType === 'AWS::KMS::Key') {
      Tags.of(node).add('cfn:stack-name', Stack.of(node).stackName);
      Tags.of(node).add('cfn:logical-id', node.logicalId);
    }
  }
}
