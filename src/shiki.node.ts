import assets from "../gen/assets";
import wasm from "../gen/onig";
import { setCDN, setWasm } from "./shiki";
export * from "./shiki";

setCDN("");
globalThis.__shiki_fetch__ = async (url) => {
  url = url.slice(1);
  const _asset = assets[url];
  if (!_asset) {
    throw new Error(`Unknown asset: ${url}`);
  }
  return {
    text: () => _asset().then((r) => JSON.stringify(r.default || r)),
  };
};

setWasm(toArrayBuffer(wasm()));

function toArrayBuffer(base64) {
  const buf = Buffer.from(base64, "base64");
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (const [i, element] of buf.entries()) {
    view[i] = element;
  }
  return ab;
}
