// @ts-nocheck
import fetch, { Response } from 'node-fetch'
globalThis.fetch = globalThis.fetch || fetch
globalThis.Response = globalThis.Response || Response

export {
  BUNDLED_LANGUAGES,
  BUNDLED_THEMES,
  FontStyle,
  getHighlighter,
  loadTheme,
  renderToHtml,
  setCDN,
  setOnigasmWASM,
  setWasm,
  toShikiTheme
} from 'shiki'
