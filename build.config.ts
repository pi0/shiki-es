import { defineBuildConfig } from 'unbuild'
import { dirname, resolve } from 'path'
import fse from 'fs-extra'

const mocksFile = resolve(__dirname, 'src/mocks.ts')

export default defineBuildConfig({
  declaration: false,
  rollup: {
    inlineDependencies: true,
    emitCJS: false,
    replace: {
      preventAssignment: false,
      delimiters: ['', ''],
      values: {
        'const isBrowser = ': 'const isBrowser = true ||',
        'window': '({})',
        "await fetch(": 'await (__shiki_fetch__||fetch)('
      }
    }
  },
  entries: [
    './src/shiki',
    './src/shiki.node'
  ],
  hooks: {
    async 'rollup:done'(ctx) {
      const shikiDir = dirname(require.resolve('shiki/package.json'))
      const distDir = resolve(ctx.options.outDir, 'shiki')
      await fse.copy(resolve(shikiDir, 'languages'), resolve(distDir, 'languages'))
      await fse.copy(resolve(shikiDir, 'themes'), resolve(distDir, 'themes'))
      await fse.copy(resolve(shikiDir, 'dist/onig.wasm'), resolve(distDir, 'onig.wasm'))
      await fse.copy(resolve(shikiDir, 'dist/index.d.ts'), resolve(ctx.options.outDir, 'shiki.d.ts'))
    }
  }
})
