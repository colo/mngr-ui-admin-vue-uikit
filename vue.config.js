const path = require('path')

module.exports = {
  pluginOptions: {
    'resolve-alias': {
      alias: {
        '@libs': path.resolve(__dirname, './src/libs'),
        '@etc': path.resolve(__dirname, './src/etc'),
        '@components': path.resolve(__dirname, './src/components'),
        '@mixins': path.resolve(__dirname, './src/components/mixins'),
        '@wrappers': path.resolve(__dirname, './src/components/wrappers'),
        '@apps': path.resolve(__dirname, './src/apps'),
        '@skins': path.resolve(__dirname, './src/skins'),
        'src': path.resolve(__dirname, './src')
      }
    }
  }
}
