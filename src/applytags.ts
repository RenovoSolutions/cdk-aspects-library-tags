import { IAspect, TagManager } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

/**
 * An aspect that applies a set of tags to all taggable resources in the given scope.
 *
 * This aspect can be used to enforce consistent tagging across resources,
 * which is useful for cost allocation, resource management, and compliance purposes.
 */
export class ApplyTags implements IAspect {
  /**
   * A record of key-value pairs to apply as tags to taggable resources in the CDK app.
   */
  tags: Record<string, string>;

  /**
   * Creates an instance of the ApplyTags aspect.
   *
   * @param tags - a record of key-value pairs to apply as tags to taggable resources in the CDK app.
   */
  constructor(tags: Record<string, string>) {
    this.tags = tags;
  }

  /**
   * Visits each construct in the scope and applies the tags if the construct is taggable.
   *
   * @param node - the construct to visit.
   */
  visit(node: IConstruct) {
    if (TagManager.isTaggable(node)) {
      Object.entries(this.tags).forEach(([key, value]) => {
        node.tags.setTag(key, value);
      });
    }
  }
}
