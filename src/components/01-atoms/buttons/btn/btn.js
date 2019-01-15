const classes = {
    base: 'btn',
    primary: 'btn_primary',
    success: 'btn_success',
    danger: 'btn_danger',
};

export default {
    init() {
        const variants = ['primary', 'success', 'danger'];
        const $btns = $(`.${classes.base}`);

        $btns.on('click', function (e) {
            const $this = $(this);
            const click = $this.data('click') || 0;

            e.preventDefault();

            $this
                .attr('class', `${classes.base} ${classes[variants[click]]}`)
                .data('click', click === variants.length - 1 ? 0 : click + 1);
        });
    },
};
