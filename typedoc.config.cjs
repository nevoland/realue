/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ["lib/main.ts"],
  out: "doc",
  excludeNotDocumented: false,
  excludeInternal: false,
  excludeReferences: false,
  plugin: ["typedoc-plugin-markdown"],
  excludeExternals: true,
  hideGenerator: true,
  readme: "none",
};
