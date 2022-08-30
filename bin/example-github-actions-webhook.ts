#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { ExampleGithubActionsWebhookStack } from '../lib/example-github-actions-webhook-stack';

const app = new cdk.App();
new ExampleGithubActionsWebhookStack(app, 'example-github-actions-webhook');
