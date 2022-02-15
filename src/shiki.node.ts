import { createRequire } from 'module'
import { setCDN, setWasm } from './shiki'
import { readFileSync } from 'fs'
export * from './shiki'

const _require = createRequire(import.meta.url)
globalThis.__shiki_fetch__ = (url) => {
  const r = _require(url)
  return Promise.resolve({
    text: () => JSON.stringify(r.default || r)
  })
}

setCDN('shiki-es/shiki/')

function toArrayBuffer(buf) {
  const ab = new ArrayBuffer(buf.length)
  const view = new Uint8Array(ab)
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i]
  }
  return ab
}

setWasm(toArrayBuffer(readFileSync(_require.resolve('shiki-es/shiki/onig.wasm'))))
