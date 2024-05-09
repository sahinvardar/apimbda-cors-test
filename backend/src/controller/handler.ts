import { createAwsLambdaHandler } from "@apimda/server";
import { createTestController } from "./index.js";

export const handler = createAwsLambdaHandler(createTestController());