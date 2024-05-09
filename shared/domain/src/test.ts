import { a } from "@apimda/core";
import { z } from "zod";

export const testController = a.controller("/test").define({
  get: a.op.get().output(a.out.schema(z.string())).build(),
  put: a.op.put().output(a.out.schema(z.string())).build(),
  post: a.op.post().output(a.out.schema(z.string())).build(),
  delete: a.op.del().output(a.out.schema(z.string())).build(),
  patch: a.op.patch().output(a.out.schema(z.string())).build(),
});
