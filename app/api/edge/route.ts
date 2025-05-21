import type * as addWasmModule from "../../../add.wasm";
// @ts-ignore
import addWasm from "../../../add.wasm?module";

const module$ = WebAssembly.instantiate(addWasm);

export async function GET(request: Request) {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')
  const num = Number(url.searchParams.get('number') || 10)
  const instance = (await module$) as any;
  const exports = instance.exports as typeof addWasmModule;
  const { add_one: addOne } = exports;
  const number = addOne(num);

  return new Response(`got: ${number}`);
}

export const runtime = "edge";
