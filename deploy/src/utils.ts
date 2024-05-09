import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const backendCoreDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "/../../backend"
);

export function resolveBackendSrc(path: string) {
  const result = `${backendCoreDir}/src/${path}`;
  if (!fs.existsSync(result)) {
    throw new Error(`Backend source path not found: ${result}`);
  }
  return result;
}
