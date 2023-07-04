import { dirname, resolve } from "node:path";
import { writeFile, mkdir, readFile, cp } from "node:fs/promises";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  failOnWarn: false,
  declaration: false,
  rollup: {
    inlineDependencies: true,
    emitCJS: false,
    replace: {
      preventAssignment: false,
      delimiters: ["", ""],
      values: {
        "const isBrowser = ": "const isBrowser = true ||",
        window: "({})",
        "await fetch(": "await (globalThis.__shiki_fetch__||globalThis.fetch)(",
        "process.env.VSCODE_TEXTMATE_DEBUG": "false",
      },
    },
  },
  entries: ["./src/shiki", "./src/shiki.node"],
  hooks: {
    async "build:before"(ctx) {
      const genDir = resolve(ctx.options.rootDir, "gen");
      await mkdir(genDir, { recursive: true });

      const shiki = await import("shiki");
      const assets = [
        ...shiki.BUNDLED_LANGUAGES.map((lang) => `languages/${lang.path}`),
        ...shiki.BUNDLED_THEMES.map((theme) => `themes/${theme}.json`),
      ];
      const assetsCode = `export default {\n${assets
        .map((asset) => `  '${asset}': () => import('shiki/${asset}')`)
        .join(",\n")}\n}`;
      await writeFile(resolve(genDir, "assets.ts"), assetsCode);

      const buff = await readFile("./node_modules/shiki/dist/onig.wasm");
      await writeFile(
        resolve(genDir, "onig.ts"),
        `export default () => "${buff.toString("base64")}"`
      );
    },
    async "rollup:done"(ctx) {
      // eslint-disable-next-line unicorn/prefer-module
      const shikiDir = dirname(require.resolve("shiki/package.json"));
      const assetsDir = resolve(ctx.options.outDir, "assets");
      for (const item of ["languages", "themes", "dist/onig.wasm"]) {
        await cp(resolve(shikiDir, item), resolve(assetsDir, item), {
          recursive: true,
        });
      }
      await cp(
        resolve(shikiDir, "dist/index.d.ts"),
        resolve(ctx.options.outDir, "shiki.d.ts")
      );
    },
  },
});
