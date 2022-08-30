import { expect as expectCDK, haveResource, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { Stack } from '@aws-cdk/core';
import * as ExampleGithubActionsWebhook from '../lib/example-github-actions-webhook-stack';

// test('CDK Metadata Created', () => {
//   const app = new cdk.App();
//   // WHEN
//   const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
//   // THEN
//   expectCDK(stack).to(haveResource("AWS::CDK::Metadata"));
// });

test('Lambda Function Role Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
    // THEN
    expectCDK(stack).to(haveResource("AWS::IAM::Role"));
});

test('Lambda Function Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::Lambda::Function"));
});

test('API Gateway RestAPI Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::RestApi"));
});

test('API Gateway API KEY Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::ApiKey"));
});

test('API Gateway API KEY Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::ApiKey"));
});

test('API Gateway API KEY Usage Plan Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::UsagePlan"));
});

test('API Gateway Usage Plan KEY Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::UsagePlanKey"));
});

test('API Gateway Permission For Invoking Lambda Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::Lambda::Permission"));
});

test('API Gateway Deployment Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::Deployment"));
});

test('API Gateway Stage Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::Stage"));
});

// test('API Gateway Resource of Type POST Created', () => {
//   const app = new cdk.App();
//   // WHEN
//   const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
//   // THEN
//   expectCDK(stack).to(haveResource("AWS::ApiGateway::Resource"));
// });

test('API Gateway Method of Type POST Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ExampleGithubActionsWebhook.ExampleGithubActionsWebhookStack(app, 'MyWebhookStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::Method"));
});