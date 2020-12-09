const core = require('@babel/core');
const t = require('@babel/types');
const template = require('@babel/template');

const props = {};
const buttonImports = [];

const bemCoreImport = template.statement`import { compose } from '@bem-react/core';`;
const getButtonImport = template.statement`import { IMPORTS } from '@yandex/ui/Button/desktop';`;

const argumentShouldBeAnObject = (path) => {
    if (path.node.arguments[0].type !== 'ObjectExpression') {
        throw path.buildCodeFrameError('Params should be an object');
    }
};

module.exports = () => ({
    name: 'bubel-plugin-bem-button',
    visitor: {
        ImportDeclaration: {
            enter(path) {
                if (
                    path &&
                    path.node.specifiers[0].imported &&
                    path.node.specifiers[0].imported.name === 'createButton'
                ) {
                    path.replaceWith(bemCoreImport());
                }
            },
        },

        CallExpression: {
            enter(path) {
                if (path.node.callee && path.node.callee.name === 'createButton') {
                    argumentShouldBeAnObject(path);

                    // получаем параметры функции
                    const args = path.node.arguments[0].properties;

                    // получаем объект props
                    args.forEach((node) => {
                        props[node.key.name] = node.value.value;
                    });

                    const { size, view, width } = props;

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
                        buttonImports.push('withViewDefault');
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

                    // вставить button импорт
                    const uttonImport = getButtonImport({
                        IMPORTS: ['Button'].concat(buttonImports).join(','),
                    });

                    const firstImport = path.find((path) => path.isProgram()).get('body.0');

                    firstImport.insertBefore(uttonImport);

                    // формируем новое выражение
                    // заменяем текущий path этим выражением
                    console.log(`compose(${buttonImports.join(', ')})(Button)`);
                    path.replaceWithSourceString(`compose(${buttonImports.join(',')})(Button)`);
                }
            },
        },
    },
});
