import { defineBuildConfig } from 'unbuild'
import { resolve } from 'path'

const mocksFile = resolve(__dirname, 'src/mocks.ts')

export default defineBuildConfig({
  declaration: false,
  rollup: {
    inlineDependencies: true,
    emitCJS: true,
    replace: {
      preventAssignment: false,
      delimiters: ['', ''],
      values: {
        'const isBrowser = ': 'const isBrowser = true ||',
        'window': '({})',
        "require('path')": '{}',
        "require('fs')": '{}',
        "let CDN_ROOT = ''": "let CDN_ROOT = 'https://unpkg.com/shiki/'"
      }
    }
  },
  // TODO: use unenv
  alias: {
    fs: mocksFile,
    path: mocksFile
  },
  entries: [
    './src/shiki'
  ],
  hooks: {
    'build:prepare'(ctx) {
      // Disable node built-ins
      ctx.options.externals = []
    }
  }
})
