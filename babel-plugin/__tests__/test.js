import path from 'path';
import pluginTester from 'babel-plugin-tester';
import BemButtonPlugin from '../bubel-plugin-bem-button';

pluginTester({
    plugin: BemButtonPlugin,
    pluginName: 'bubel-plugin-bem-button',
    tests: [
        {
            fixture: path.join(__dirname, '__fixtures__/input.js'),
            outputFixture: path.join(__dirname, '__fixtures__/output.js'),
        },
    ],
});
