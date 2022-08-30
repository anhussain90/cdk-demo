import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import { ServicePrincipal } from "@aws-cdk/aws-iam";
import path = require("path");

export class ExampleGithubActionsWebhookStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Role to be assigned to Lambda Function
    const lambdaRole = new iam.Role(
      this,
      `example.github.actions.webhook.role`,
      {
        // roleName: `example.github.actions.webhook.role`,
        description: 'Created by CDK',
        assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      }
    );
    lambdaRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess")
    );

    // Create Lambda Function
    const lambdaFunction = new lambda.Function(
      this,
      `example-github-actions-webhook-lambda`,
      {
        functionName: `example-github-actions-webhook-lambda`,
        description: 'Created by CDK',
        runtime: lambda.Runtime.PYTHON_3_8,
        role: lambdaRole,
        handler: "lambda_function.handler",
        code: lambda.Code.fromAsset(
          path.join(__dirname, "../lambdas/example-github-actions-webhook")
        ),
        timeout: cdk.Duration.seconds(300),
        environment: {
          GITHUB_TOKEN: String(process.env.GITHUB_TOKEN),
        },
      }
    );

    // Lambda grant invoke to APIGateway
    lambdaFunction.grantInvoke(
      new ServicePrincipal("apigateway.amazonaws.com")
    );

    // Create the API construct, integrate with lambda
    const api = new apigw.RestApi(this, "example-github-actions-webhook-api", {
      restApiName: `example-github-actions-webhook-api`,
      description: 'Created by CDK',
      deploy: false,
      endpointTypes: [apigw.EndpointType.REGIONAL],
    });
    const lambdaIntegration = new apigw.LambdaIntegration(lambdaFunction);
    api.root.addMethod("POST", lambdaIntegration, {
      apiKeyRequired: true,
    });

    // Create an explicit Deployment construct
    const deployment = new apigw.Deployment(
      this,
      `example-github-actions-webhook-deployment`,
      { api }
    );

    // Add different stages
    const [devStage, accStage, prodStage] = ["dev", "acc", "prod"].map(
      (item) =>
        new apigw.Stage(this, `${item}`, { deployment, stageName: item })
    );

    api.deploymentStage = devStage;
    api.deploymentStage = accStage;
    api.deploymentStage = prodStage;

    // Add usage plan for stages along with an API Key
    api.addUsagePlan(`dataocms-github-actions-webhook-usage-plane`, {
      name: `example-staging-webhook-api-usage-plan`,
      description: 'Created by CDK',
      apiStages: [
        {
          stage: devStage,
        },
        {
          stage: accStage,
        },
        {
          stage: prodStage,
        },
      ],
      apiKey: api.addApiKey("ApiKey", {
        apiKeyName: `dataocms-github-actions-webhook-api-key`,
        value: String(process.env.API_KEY),
      }),
      throttle: {
        rateLimit: 10,
        burstLimit: 2,
      },
    });

    // Export API URL as an output
    new cdk.CfnOutput(this, "HTTP API URL", {
      value: api.url ?? "Something went wrong with deploy",
    });
  }
}