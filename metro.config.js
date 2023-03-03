const nodelibs = require('node-libs-react-native');
nodelibs.crypto = require.resolve('react-native-crypto-js');
const { getDefaultConfig } = require('metro-config');

module.exports = async() => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules: nodelibs,
    }
  }
};
