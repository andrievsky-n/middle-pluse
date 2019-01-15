import 'simple-scrollbar';

jQuery(function () {
    var $frame = jQuery('.Frame');
    var $btn = jQuery('.fractal-menu__btn');
    var $menu = jQuery('.fractal-menu');
    var $nav = jQuery('.fractal-menu__nav');

    $btn.click(function () {
        $menu.toggleClass('fractal-menu_open');
    });

    var $tree = jQuery('.fractal-menu__tree');

    SimpleScrollbar.initEl($tree[0]);

    var $ssWrapper = $tree.find('.ss-wrapper');
    var $ssContent = $tree.find('.ss-content');

    function setMenuHeight() {
        $menu.add($frame).css('height', window.innerHeight);
    }

    jQuery(window).resize(function(e) {
        setMenuHeight();
    });

    setMenuHeight();
});
