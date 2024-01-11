module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "/\\.(css|less|scss|sass)$/": "identity-obj-proxy",
    "^react-notifications/lib/notifications.css$": "identity-obj-proxy",
    "^.+\\.css$": "identity-obj-proxy"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.js',
    '!src/serviceWorker.js'
  ],
  fakeTimers: {"advanceTimers": 40},
};