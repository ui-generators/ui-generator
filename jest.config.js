// Small temp fix
export default {
    testEnvironment: 'node',
    transform: {},
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
};

// module.exports = {
//   testEnvironment: 'jest-environment-jsdom',
//   setupFilesAfterEnv: ['./jest.setup.js'],
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform JS and TypeScript files with babel-jest
//   },
//   moduleNameMapper: {
//     // Handle module aliases and static file imports (if used in your project)
//     '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
//     '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
//   },
// };