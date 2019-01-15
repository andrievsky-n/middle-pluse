module.exports = {
    title: 'Базовая кнопка',
    status: 'wip',
    context: {
        text: 'Нажми меня. Ну нажми!',
        class: '',
    },
    variants: [
        {
            name: 'index',
            status: 'ready',
            context: {
                text: 'Кнопка на главной',
                tag: 'a',
                class: 'btn_link',
                attr: 'href="javascript:void(0);"'
            },
        }
    ]
};
