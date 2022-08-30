# CDK based example webhook for triggering the github actions!

This CDK app with an instance of a stack (`example-github-actions-webhook`) comprises of the following resources:

 * `Lambda Role`
 * `Lambda Function`
 * `API Integration with Lambda Function`
 * `API resource and method`
 * `Deployment with stages: acc and prod`
 * `API Key and its usage plan`

The `cdk.json` file tells the CDK toolkit how to execute the app.

## Useful commands

 * `npm run build` compile typescript to js
 * `npm run watch` watch for changes and compile
 * `npm run test` perform the jest unit tests
 * `bootstrap aws://unknown-account/unknown-region --toolkit-stack-name cdk-toolkit --toolkit-bucket-name cdk.toolkit` creates the stack for assets, so the toolkit stack must be deployed to the environment
 * `cdk diff` compare deployed stack with current state
 * `cdk synth` emits the synthesized CloudFormation template
 * `cdk deploy --toolkit-stack-name cdk-toolkit --require-approval never` deploy this stack to your default AWS account/region with auto-approve option enabled
