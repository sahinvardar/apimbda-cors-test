import { createFetchClient } from "@apimda/client";
import { testController } from "shared-domain";
import { env } from "$env/dynamic/public";

const { PUBLIC_API_URL } = env;
export const apiUrl = PUBLIC_API_URL.replace(/\/$/, "");

export const api = {
  testService: createFetchClient(testController, apiUrl),
};
