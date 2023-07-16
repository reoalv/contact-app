module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(victory|@react-native|@react-navigation|@react-native-firebase|react-native|react-native-splash-screen|react-native-date-picker|react-native-maps|react-native-camera|react-native-flash-message|react-native-google-places-autocomplete|react-native-geocoding|react-native-iphone-x-helper|react-native-config|react-native-linear-gradient|react-native-base64|rn-fetch-blob|@ptomasroos/react-native-multi-slider|react-native-snap-carousel|react-i18next|react-native-reanimated|react-native-document-picker|react-native-responsive-screen|react-native-pdf|react-native-image-resizer|react-native-webview|react-native-dash|react-native-shadow-2))',
  ],
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '**/storybook/**',
    '!**/node_modules/**',
    '!**/scripts/**',
    '!**/coverage/**',
    '!**/.husky/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/styles/**',
    '!**/types/**',
    '!**/*.styles.ts',
    '!App.tsx',
    '!**/testUtils.ts',
    '!**/*.stories.tsx',
  ],
  rootDir: './',
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    global: {
      // TODO: Increase thresholds as we increase coverage
      branches: 50,
      functions: 50,
      lines: 60,
      statements: 60,
    },
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
