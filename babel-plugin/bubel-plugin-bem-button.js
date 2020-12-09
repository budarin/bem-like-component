const core = require('@babel/core');
const t = require('@babel/types');
const template = require('@babel/template');

module.exports = () => ({
    visitor: {
        CallExpression: {
            enter(path) {
                //
            },
        },
    },
});
