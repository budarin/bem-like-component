const isTesting = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    comments: true,
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                debug: false,
                modules: isTesting ? 'commonjs' : false,
                corejs: {
                    version: 3,
                    proposals: true,
                },
                useBuiltIns: 'usage',
            },
        ],
        [
            '@babel/preset-react',
            {
                development: isDev,
                useBuiltIns: true,
                runtime: 'automatic',
            },
        ],
        '@babel/typescript',
    ],
    plugins: ['./babel-plugin/bubel-plugin-bem-button.js'],
    env: {
        production: {
            ignore: ['**/*.test.tsx', '**/*.test.ts', '__snapshots__', '__tests__'],
        },
        development: {
            ignore: ['**/*.test.tsx', '**/*.test.ts', '__snapshots__', '__tests__'],
        },
        test: {
            ignore: ['__snapshots__'],
        },
    },
};
