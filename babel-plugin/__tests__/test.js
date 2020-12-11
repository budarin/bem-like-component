import path from 'path';
import pluginTester from 'babel-plugin-tester';
import BemButtonPlugin from '../bubel-plugin-bem-button';

const fixtures = path.join(__dirname, 'fixtures');
const getFixtures = (fixtureFolder) => ({
    title: fixtureFolder.replace('-', ' '),
    fixture: path.join(fixtures, `${fixtureFolder}/input.js`),
    outputFixture: path.join(fixtures, `${fixtureFolder}/output.js`),
});

pluginTester({
    plugin: BemButtonPlugin,
    pluginName: 'bubel-plugin-bem-button',
    tests: [{ ...getFixtures('simple-usage') }],
});
