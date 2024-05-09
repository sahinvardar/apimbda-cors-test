import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Stack } from "./stack.js";

const app = new cdk.App();
new Stack(app, "Stack", {
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
  },
});
