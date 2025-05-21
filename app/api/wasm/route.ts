import path from "node:path";
import fs from "node:fs";

import type * as addWasmModule from "../../../add.wasm"; // import type definitions at root

const wasmBuffer = fs.readFileSync(path.resolve(process.cwd(), "./add.wasm")); // path from root
const wasmPromise = WebAssembly.instantiate(wasmBuffer);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const num = Number(url.searchParams.get("number") || 10);
  const { add_one: addOne } = (await wasmPromise).instance
    .exports as typeof addWasmModule;

  return new Response(`got: ${addOne(num)}`);
}
