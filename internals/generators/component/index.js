/**
* Component Generator
*/

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/component-exists');
const pathToSrc = require('../utils/path-to-src');

const types = ['atoms', 'molecules', 'organisms', 'templates', 'pages'];

module.exports = {
    description: 'Добавить новый компонент',
    prompts: [{
        type: 'list',
        name: 'type',
        message: 'Выберите тип компонента',
        default: 'atoms',
        choices: () => types,
    }, {
        type: 'input',
        name: 'name',
        message: 'Введите название компонента',
        default: 'atom',
        validate: (value) => {
            if ((/.+/).test(value)) {
                return componentExists(value) ? 'Компонент с таким названием уже существует' : true;
            }

            return 'У компонента должно быть название';
        },
    }, {
        type: 'confirm',
        name: 'wantStyles',
        default: true,
        message: 'Хотите добавить файл стилей?',
    }, {
        type: 'confirm',
        name: 'wantJs',
        default: true,
        message: 'Хотите добавить js файл?',
    }, {
        type: 'confirm',
        name: 'wantReadme',
        default: true,
        message: 'Хотите добавить README файл?',
    }],
    actions: (data) => {
        const index = types.indexOf(data.type) + 1;
        const folder = `components/0${index}-{{type}}/{{dashCase name}}/`;

        const actions = [{
            type: 'add',
            path: pathToSrc(`${folder}{{dashCase name}}.twig`),
            templateFile: './component/component.twig.hbs',
            abortOnFail: true,
        }, {
            type: 'add',
            path: pathToSrc(`${folder}{{dashCase name}}.conf.js`),
            templateFile: './component/conf.js.hbs',
            abortOnFail: true,
        }];

        if (data.wantStyles) {
            actions.push({
                type: 'add',
                path: pathToSrc(`${folder}{{dashCase name}}.scss`),
                templateFile: './component/component.scss.hbs',
                abortOnFail: true,
            });
        }

        if (data.wantJs) {
            actions.push({
                type: 'add',
                path: pathToSrc(`${folder}{{dashCase name}}.js`),
                templateFile: './component/component.js.hbs',
                abortOnFail: true,
            });
        }

        if (data.wantReadme) {
            actions.push({
                type: 'add',
                path: pathToSrc(`${folder}README.md`),
                templateFile: './component/readme.md.hbs',
                abortOnFail: true,
            });
        }

        return actions;
    },
};
