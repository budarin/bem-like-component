import path from 'path';
import pluginTester from 'babel-plugin-tester';
import BemButtonPlugin from '../bubel-plugin-bem-button';

const getFixtures = (fixtureFolder) => ({
    title: fixtureFolder.replace('-', ' '),
    fixture: path.join(__dirname, `fixtures/${fixtureFolder}/input.js`),
    outputFixture: path.join(__dirname, `/fixtures${fixtureFolder}/output.js`),
});

pluginTester({
    plugin: BemButtonPlugin,
    pluginName: 'bubel-plugin-bem-button',
    tests: [{ ...getFixtures('simple-usage') }],
});
