const core = require('@babel/core');
const t = require('@babel/types');
const template = require('@babel/template');

const PluginObj = core.PluginObj;

module.exports = () => ({
    visitor: {
        CallExpression({ node }) {
            if (!t.isIdentifier(node.callee) || node.callee.name !== 'lazyComponentBabel') {
                return;
            }

            const arrow = node.arguments[0];

            if (!t.isArrowFunctionExpression(arrow)) {
                return;
            }
            const body = arrow.body;

            if (!t.isCallExpression(body) || !t.isImport(body.callee)) {
                return;
            }

            const server = '__SERVER__';
            const client = '__CLIENT__';

            const options =
                process.env.NODE_ENV === 'test'
                    ? template.expression`{
                    asyncLoader() {
                        if (${client}) {
                            return IMPORT;
                        }
                    },
                    syncLoader() {
                        if (${server}) {
                            return require(PATH);
                        }
                    },
                }`
                    : template.expression`{
                    id: require.resolveWeak(PATH),
                    asyncLoader() {
                        if (${client}) {
                            return IMPORT;
                        }
                    },
                    syncLoader() {
                        if (${server}) {
                            return require(PATH);
                        }
                    },
                }`;

            // remove comment /* webpackChunkName: "PageN" */ from path
            const prePath = { ...body.arguments[0] };
            prePath.leadingComments = null;

            const newNode = options({
                IMPORT: body,
                PATH: prePath,
            });

            node.arguments[0] = newNode;
        },
    },
});

module.exports.LAZY_COMPONENT_PLUGIN = require.resolve(__filename);
