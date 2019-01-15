/* Dependencies */

// utils
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const errorHandler = require('gulp-plumber-error-handler');
const changedInPlace = require('gulp-changed-in-place');
// data
const toJSON = require('gulp-js-to-json');

/* Tasks */

// parse data from js to json
gulp.task('data', () => (
    gulp.src('src/components/**/*.conf.js', { read: true })
        .pipe(plumber({
            errorHandler: errorHandler('Error in \'styles\' task')
        }))
        .pipe(changedInPlace({
            firstPass: true
        }))
        .pipe(toJSON({
            stringify: {
                space: '\t'
            }
        }))
        .pipe(rename((path) => {
            path.basename += 'ig';
        }))
        .pipe(gulp.dest(file => file.base))
));
