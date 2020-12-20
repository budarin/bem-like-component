const { declare } = require('@babel/helper-plugin-utils');
const t = require('@babel/types');

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

    const bemCoreImport = template.statement`import { compose } from '@bem-react/core';`();
    const getCurrentStatementPath = (path) => path.findParent((parent) => parent.isStatement());
    const getComponent = (imports) => template.statement`const Component = compose( ${imports.join(', ')} )(Button);`();

    return {
        name: 'bubel-plugin-bem-button',
        manipulateOptions: (opts, parserOpts) => {
            parserOpts.plugins.push('jsx', 'typescript');
            // console.log('manipulateOptions'.toUpperCase(), opts, parserOpts);
        },
        pre() {
            props = {};
            buttonImports = [];
        },
        visitor: {
            ImportDeclaration: {
                enter(path) {
                    // ищем импорт полного бандла кнопки
                    if (path.node.source.value === '@yandex/ui/Button/desktop/bundle') {
                        // получаем локальное имя Button
                        const btnImported = path.node.specifiers.find((spec) => spec.imported.name === 'Button');

                        if (btnImported) {
                            // указываем импорт общего компонента
                            path.node.source.value = '@yandex/ui/Button/desktop';

                            // вставляем импорт compose
                            path.insertBefore(bemCoreImport);

                            // получаем алиас Button
                            const btnImportedName = btnImported.local.name;

                            // запоминаем путь к binding компонету-кнопки
                            const btn = path.scope.bindings[btnImportedName];

                            // удаляем из списка bindings данную ссылку т.к. кнопка будет переименована
                            // и больше напрямую не связана с импортируемым именем
                            path.scope.removeBinding(btnImportedName);

                            // переименуем компонент
                            btn.referencePaths[0].node.name = 'Component';
                            btn.referencePaths[1].node.name = 'Component';

                            // получим все параметры компонента
                            const attributes = btn.referencePaths.find(
                                (node) => node.container.type === 'JSXOpeningElement',
                            ).parent.attributes;

                            attributes.forEach((attribute) => {
                                if (
                                    attribute.name &&
                                    validPropKeys.includes(attribute.name.name) &&
                                    validPropKeyValues[attribute.name.name].includes(attribute.value.value)
                                ) {
                                    props[attribute.name.name] = attribute.value.value;
                                }
                            });

                            // получаем список необходимых модификаторов для импорта
                            const { size, view, width } = props;

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

                            // генерируем компонент для нашей кнопки
                            const component = getComponent(buttonImports);

                            // добавляем Button в bindings импорту
                            // path.scope.registerBinding('', ?);

                            // получаем путь к выражению в котором используется кнопка
                            const btnStatement = getCurrentStatementPath(btn.referencePaths[0].parentPath);

                            // вставим сгенерированный компонент перед кнопкой
                            btnStatement.insertBefore(component);

                            // вставляем в импорт нужные модификаторы
                            buttonImports.forEach((modModule) => {
                                path.node.specifiers.push(
                                    t.importSpecifier(t.identifier(modModule), t.identifier(modModule)),
                                );
                            });
                        }
                    }
                },
            },
        },
    };
});
