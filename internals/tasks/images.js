/* Dependencies */

// utils
const gulp = require('gulp');
// images
const imagemin = require('gulp-imagemin');
const JpegRecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
// paths
const paths = require('../../paths');

/* Tasks */

// images minification
gulp.task('images:min', () => {
    const dir = paths.devImages;
    return gulp.src(`${dir}/**/*`)
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            JpegRecompress({
                progressive: true,
                max: 95,
                min: 95
            }),
            pngquant({
                quality: '90-95',
                speed: 1,
                floyd: 1
            }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest(dir));
});

// common task
gulp.task('images', gulp.series('images:min'));
