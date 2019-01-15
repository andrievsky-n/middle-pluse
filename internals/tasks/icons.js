/* Dependencies */

// utils
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const path = require('path');
// svg
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
// paths
const paths = require('../../paths');

/* Tasks */

// icons minification and build svg-sprite
gulp.task('icons', () => (
    gulp.src(`${paths.srcImages}/svg/*.svg`)
        .pipe(imagemin([
            imagemin.svgo()
        ]))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: 'sprite.svg',
                    render: {
                        scss: {
                            dest: '../icons-sizes.scss',
                            template: path.join(__dirname, 'svg-templates/icons-sizes.scss')
                        }
                    }
                },
            }
        }))
        .pipe(gulpIf(/\.scss$/, gulp.dest(`${paths.srcStyles}/icons`)))
        .pipe(gulpIf(/\.svg$/, rename('icons.svg')))
        .pipe(gulpIf(/\.svg$/, gulp.dest(paths.devImages)))
));
