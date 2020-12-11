const core = require('@babel/core');
const t = require('@babel/types');
const template = require('@babel/template');

let props = {};
let buttonImports = [];

const bemCoreImport = template.statement`import { compose } from '@bem-react/core';`;
const getButtonImport = template.statement`import { IMPORTS } from '@yandex/ui/Button/desktop';`;

const argumentShouldBeAnObject = (path) => {
    if (path.node.arguments[0].type !== 'ObjectExpression') {
        throw path.buildCodeFrameError('Params should be an object');
    }
};

module.exports = () => ({
    name: 'bubel-plugin-bem-button',
    manipulateOptions: (opts, parserOpts) => {
        parserOpts.plugins.push('jsx', 'typescript');
        console.log('manipulateOptions'.toUpperCase(), parserOpts);
    },
    pre() {
        props = {};
        buttonImports = [];
    },
    visitor: {
        ImportDeclaration: {
            enter(path) {
                if (
                    // replace with in prod `path.node.source.value`
                    path &&
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
                        props[node.key.name] = node.value.value;
                    });

                    const { size, view, width } = props;

                    // получаем список необходимых модификаторов для импорта
                    if (size) {
                        switch (size) {
                            case 'm':
                                buttonImports.push('withSizeM');
                                break;

                            case 's':
                                buttonImports.push('withSizeS');
                                break;

                            case 'l':
                                buttonImports.push('withSizeL');
                                break;

                            default:
                                break;
                        }
                    }

                    if (view) {
                        switch (view) {
                            case 'default':
                                buttonImports.push('withViewDefault');
                                break;

                            case 'action':
                                buttonImports.push('withViewAction');
                                break;

                            default:
                                break;
                        }
                    }

                    if (width) {
                        switch (width) {
                            case 'auto':
                                buttonImports.push('withWidthAuto');
                                break;

                            case 'max':
                                buttonImports.push('withWidthMax');
                                break;

                            default:
                                break;
                        }
                    }

                    // вставиляем импорты
                    const uttonImport = getButtonImport({
                        IMPORTS: ['Button'].concat(buttonImports).join(','),
                    });
                    const firstImport = path.find((path) => path.isProgram()).get('body.0');

                    firstImport.insertBefore(uttonImport);

                    // формируем новое выражение вместо createButton
                    path.replaceWithSourceString(`compose(${buttonImports.join(',')})(Button)`);
                    // path.insertAfter(template.statement`const b = () => <Button></Button>`());
                }
            },
        },
    },
});
