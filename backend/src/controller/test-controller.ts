import { a } from "@apimda/core";
import { testController } from "shared-domain";

export function createTestController() {
  return a.implement(testController, {
    delete: async () => {
      return "delete";
    },
    get: async () => {
      return "get";
    },
    patch: async () => {
      return "patch";
    },
    post: async () => {
      return "post";
    },
    put: async () => {
      return "put";
    },
  });
}
