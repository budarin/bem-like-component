Получаем аатрибуты компонента кнопки которая импортируется из конкретного модуля

-   определяем что это нужный импорт - берем имя кнопки Button
-   смотрим уго bindings -> есть ли binding.Button?
-   если есть смотрим path.scope.binding.Button.referencePaths[0].container.type === "JSXOpeningElement"
-   если да - получаем параметры кнопки
    ```
    ImportDeclaration (path) {
        const attrs = path.scope.binding.Button.referencePaths[0].container.attributes[];
    }
    ```
-   биндим параметры на имена модификаторов и добавляем в этот же импорт
