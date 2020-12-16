const { declare } = require('@babel/helper-plugin-utils');
import * as t from '@babel/types';

module.exports = declare(({ assertVersion, options, template }) => {
    assertVersion(7);

    let props = {};
    let buttonImports = [];

    const validPropKeys = ['size', 'width', 'view'];
    const validPropKeyValues = {
        size: ['s', 'm', 'l'],
        width: ['auto', 'max'],
        view: ['default', 'action'],
    };
    const sizes = {
        m: 'withSizeM',
        s: 'withSizeS',
        l: 'withSizeL',
    };
    const views = {
        default: 'withViewDefault',
        action: 'withViewAction',
    };
    const widths = {
        auto: 'withWidthAuto',
        max: 'withWidthMax',
    };

    const bemCoreImport = template.statement`import { compose } from '@bem-react/core';`;
    const getButtonImport = template.statement`import { __IMPORTS__ } from '@yandex/ui/Button/desktop';`;

    const getCurrentStatementPath = (path) => path.findParent((parent) => parent.isStatement());
    const argumentShouldBeAnObject = (path) => {
        if (path.node.arguments[0].type !== 'ObjectExpression') {
            throw path.buildCodeFrameError('Params should be an object');
        }
    };

    return {
        name: 'bubel-plugin-bem-button',
        manipulateOptions: (opts, parserOpts) => {
            parserOpts.plugins.push('jsx');
            // console.log('manipulateOptions'.toUpperCase(), parserOpts)
        },
        pre() {
            props = {};
            buttonImports = [];
        },
        visitor: {
            ImportDeclaration: {
                enter(path) {
                    // console.log(path.getSource())
                    if (
                        path.node.specifiers.length > 0 &&
                        path.node.specifiers[0].imported &&
                        path.node.specifiers[0].imported.name === 'createButton'
                    ) {
                        path.replaceWith(bemCoreImport());
                        path.skip();
                    }
                },
            },

            CallExpression: {
                enter(path) {
                    if (path.node.callee && path.node.callee.name === 'createButton') {
                        argumentShouldBeAnObject(path);

                        // получаем параметры функции
                        const args = path.node.arguments[0].properties;

                        // создаем объект props
                        args.forEach((node) => {
                            if (
                                validPropKeys.includes(node.key.name) &&
                                validPropKeyValues[node.key.name].includes(node.value.value)
                            ) {
                                props[node.key.name] = node.value.value;
                            }
                        });

                        const { size, view, width } = props;

                        // получаем список необходимых модификаторов для импорта
                        const sizeMod = sizes[size];
                        if (sizeMod) {
                            buttonImports.push(sizeMod);
                        }

                        const viewMod = views[view];
                        if (viewMod) {
                            buttonImports.push(viewMod);
                        }

                        const widthMod = widths[width];
                        if (widthMod) {
                            buttonImports.push(widthMod);
                        }

                        // вставиляем импорты
                        const buttonImport = getButtonImport({
                            __IMPORTS__: ['Button'].concat(buttonImports).join(', '),
                        });
                        const firstImport = path.find((p) => p.isProgram()).get('body.0');

                        firstImport.insertBefore(buttonImport);

                        const getComponent = template.statement`const Component = compose( ${buttonImports.join(
                            ', ',
                        )} )(Button);`;
                        const component = getComponent();

                        const attributes = [t.jsxSpreadAttribute(t.identifier('rest'))];
                        Object.keys(props).forEach((key) => {
                            attributes.push(t.jsxAttribute(t.jsxIdentifier(key), t.stringLiteral(props[key])));
                        });

                        const result = t.arrowFunctionExpression(
                            [
                                t.objectPattern([
                                    t.objectProperty(t.identifier('children'), t.identifier('children')),
                                    t.restElement(t.identifier('rest')),
                                ]),
                            ],
                            t.jsxElement(
                                t.jsxOpeningElement(t.jsxIdentifier('Component'), attributes),
                                t.jsxClosingElement(t.jsxIdentifier('Component')),
                                [t.jsxExpressionContainer(t.identifier('children'))],
                            ),
                        );

                        const currentStatement = getCurrentStatementPath(path);
                        currentStatement.insertBefore(component);

                        // формируем новое выражение вместо createButton
                        path.replaceWith(result);
                        path.skip();
                    }
                },
            },
        },
    };
});
