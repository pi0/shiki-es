
# shiki-es

[![bundle size](https://flat.badgen.net/bundlephobia/minzip/shiki-es)](https://bundlephobia.com/package/shiki-es)

Standalone build of [shiki](https://github.com/shikijs/shiki) fully compatible with all ESM environments.

## Usage

Install:

```sh
# npm
npm i shiki-es

# yarn
yarn add shiki-es
```

```js
import { getHighlighter } from 'shiki-es'

const highlighter = await getHighlighter({ theme: 'nord' })

console.log(highlighter.codeToHtml(`console.log('shiki');`, { lang: 'js' }))
```

## License

MIT
