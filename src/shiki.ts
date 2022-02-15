import { setCDN, setWasm } from 'shiki'
import { version } from '../package.json'

setCDN(`https://unpkg.com/shiki-es@${version}/dist/shiki/`)

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
