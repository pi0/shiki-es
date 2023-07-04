import { setCDN } from "shiki";
import { version } from "../package.json";

setCDN(`https://cdn.jsdelivr.net/npm/shiki-es@${version}/dist/assets/`);

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
  toShikiTheme,
} from "shiki";
