module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@components': './src/components/',
          '@assets': './src/assets/',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
