// module.exports = {
//     testEnvironment: 'jsdom',
//     setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
//     moduleNameMapper: {
//       '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//     },
//     collectCoverage: true,
//     collectCoverageFrom: [
//       'src/**/*.{js,jsx,ts,tsx}',
//       '!src/index.js', // Exclude entry point file
//       '!src/serviceWorker.js', // Exclude service worker (if exists)
//     ],
//   };
  module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    //setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
    moduleNameMapper: {
      "/\\.(css|less|scss|sass)$/": "identity-obj-proxy",
      "^react-notifications/lib/notifications.css$": "identity-obj-proxy"
    },
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/index.js', // Exclude entry point file
      '!src/serviceWorker.js', // Exclude service worker (if exists)
    ],
  };
  