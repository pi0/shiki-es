const noop = () => null

export const fileURLToPath = noop
export const createRequire = noop

export default {
  isatty: () => false,
  dirname: noop,
  resolve: noop,
  join: noop,
  existsSync: noop,
  parse: () => ({}),
  relative: noop
}
