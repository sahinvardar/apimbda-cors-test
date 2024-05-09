import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigatewayv2";
import * as apigwInt from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import { resolveBackendSrc } from "./utils.js";
import { testController } from "shared-domain";
import { ControllerDef } from "@apimda/core";
import { SvelteApp } from "@vardario/cdk-svelte-app";
import path from "node:path";
import { fileURLToPath } from "node:url";

export class Stack extends cdk.Stack {
  public apiUrl: cdk.CfnOutput;
  public frontendUrl: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = this.createApiLambda();
    const frontendApp = this.createFrontend(api);

    this.apiUrl = new cdk.CfnOutput(this, "apiUrl", { value: api.url! });
    this.frontendUrl = new cdk.CfnOutput(this, "frontendUrl", {
      value: frontendApp.appUrl!,
    });
  }

  createApiLambda() {
    const api = new apigw.HttpApi(this, "ApiGateway", {
      corsPreflight: {
        allowOrigins: ["*"],
        allowMethods: [apigw.CorsHttpMethod.ANY],
        allowHeaders: ["*"],
      },
    });

    const apiLambda = new lambdaNode.NodejsFunction(this, "ApiLambda", {
      entry: resolveBackendSrc("controller/handler.ts"),
      bundling: {
        externalModules: ["aws-sdk"],
      },
    });

    const patchLambda = new lambdaNode.NodejsFunction(this, "ApiPatchLambda", {
      entry: resolveBackendSrc("lambda/patch-handler.ts"),
      bundling: {
        externalModules: ["aws-sdk"],
      },
    });

    const apiLambdaIntegration = new apigwInt.HttpLambdaIntegration(
      `ApiLambdaIntegration`,
      apiLambda
    );

    const apiPatchLambdaIntegration = new apigwInt.HttpLambdaIntegration(
      `ApiPatchLambdaIntegration`,
      patchLambda
    );

    for (const opName in testController) {
      const op = (testController as ControllerDef)[opName];
      api.addRoutes({
        path: op.path,
        methods: [op.method.toUpperCase() as apigw.HttpMethod],
        integration: apiLambdaIntegration,
      });
    }

    api.addRoutes({
      path: "/",
      methods: [apigw.HttpMethod.PATCH],
      integration: apiPatchLambdaIntegration,
    });

    return api;
  }

  createFrontend(api: apigw.HttpApi) {
    return new SvelteApp(this, "SvelteApp", {
      svelteAppPath: path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "../../frontend"
      ),
      svelteAppLayerPath: path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "../layer/svelte-app-layer"
      ),
      svelteServerEnvironment: {
        PUBLIC_API_URL: api.url!,
      },
    });
  }
}
