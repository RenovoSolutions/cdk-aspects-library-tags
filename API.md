# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### ApplyKmsTags <a name="ApplyKmsTags" id="@renovosolutions/cdk-aspects-library-tags.ApplyKmsTags"></a>

- *Implements:* aws-cdk-lib.IAspect

An aspect that applies CloudFormation tags to all KMS keys in the given scope.

This is useful because KMS keys are not automatically tagged by CloudFormation,
which makes them hard to track and manage.

#### Initializers <a name="Initializers" id="@renovosolutions/cdk-aspects-library-tags.ApplyKmsTags.Initializer"></a>

```typescript
import { ApplyKmsTags } from '@renovosolutions/cdk-aspects-library-tags'

new ApplyKmsTags()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@renovosolutions/cdk-aspects-library-tags.ApplyKmsTags.visit">visit</a></code> | Visits each construct in the scope and applies the tags if the construct is a KMS key. |

---

##### `visit` <a name="visit" id="@renovosolutions/cdk-aspects-library-tags.ApplyKmsTags.visit"></a>

```typescript
public visit(node: IConstruct): void
```

Visits each construct in the scope and applies the tags if the construct is a KMS key.

###### `node`<sup>Required</sup> <a name="node" id="@renovosolutions/cdk-aspects-library-tags.ApplyKmsTags.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---




### ApplyTags <a name="ApplyTags" id="@renovosolutions/cdk-aspects-library-tags.ApplyTags"></a>

- *Implements:* aws-cdk-lib.IAspect

An aspect that applies a set of tags to all taggable resources in the given scope.

This aspect can be used to enforce consistent tagging across resources,
which is useful for cost allocation, resource management, and compliance purposes.

#### Initializers <a name="Initializers" id="@renovosolutions/cdk-aspects-library-tags.ApplyTags.Initializer"></a>

```typescript
import { ApplyTags } from '@renovosolutions/cdk-aspects-library-tags'

new ApplyTags(tags: {[ key: string ]: string})
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@renovosolutions/cdk-aspects-library-tags.ApplyTags.Initializer.parameter.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | - a record of key-value pairs to apply as tags to taggable resources in the CDK app. |

---

##### `tags`<sup>Required</sup> <a name="tags" id="@renovosolutions/cdk-aspects-library-tags.ApplyTags.Initializer.parameter.tags"></a>

- *Type:* {[ key: string ]: string}

a record of key-value pairs to apply as tags to taggable resources in the CDK app.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@renovosolutions/cdk-aspects-library-tags.ApplyTags.visit">visit</a></code> | Visits each construct in the scope and applies the tags if the construct is taggable. |

---

##### `visit` <a name="visit" id="@renovosolutions/cdk-aspects-library-tags.ApplyTags.visit"></a>

```typescript
public visit(node: IConstruct): void
```

Visits each construct in the scope and applies the tags if the construct is taggable.

###### `node`<sup>Required</sup> <a name="node" id="@renovosolutions/cdk-aspects-library-tags.ApplyTags.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

the construct to visit.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@renovosolutions/cdk-aspects-library-tags.ApplyTags.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | A record of key-value pairs to apply as tags to taggable resources in the CDK app. |

---

##### `tags`<sup>Required</sup> <a name="tags" id="@renovosolutions/cdk-aspects-library-tags.ApplyTags.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

A record of key-value pairs to apply as tags to taggable resources in the CDK app.

---



