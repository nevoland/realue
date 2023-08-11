/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ["lib/main.ts"],
  out: "doc",
  excludeNotDocumented: false,
  excludeInternal: false,
  excludeReferences: false,
  plugin: [
    "typedoc-plugin-missing-exports",
    "typedoc-plugin-markdown",
    "typedoc-github-wiki-theme",
  ],
  theme: "github-wiki",
};
