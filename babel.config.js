module.exports = api => {
  api.cache.never()
  switch (process.env.BABEL_MODE) {
    case 'module':
      return {
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              forceAllTransforms: true,
            },
          ],
        ],
      }
    default:
      return {
        presets: [
          [
            '@babel/preset-env',
            {
              forceAllTransforms: true,
            },
          ],
        ],
      }
  }
}
