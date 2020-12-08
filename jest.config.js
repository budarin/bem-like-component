module.exports = {
    displayName: 'ROOT',
    bail: 0,
    rootDir: './',
    cacheDirectory: 'node_modules/.cache/jest',
    globalSetup: '<rootDir>/config/jest/setup.js',
    coverageDirectory: 'coverage',
    notifyMode: 'failure-change',
    projects: ['src/'],
    testPathIgnorePatterns: ['/node_modules/'],
};
