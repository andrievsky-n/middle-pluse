/* Dependencies */

// utils
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const errorHandler = require('gulp-plumber-error-handler');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
// css
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const stylelintFormatter = require('stylelint-formatter-pretty');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const nano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
// paths
const paths = require('../../paths');

const isDebug = process.env.NODE_ENV !== 'production';

/* Tasks */

// styles linting
gulp.task('styles:lint', () => (
    gulp.src([`${paths.srcComponents}/**/*.scss`])
        .pipe(stylelint({
            failAfterError: false,
            reporters: [
                { formatter: stylelintFormatter, console: true },
            ]
        }))
));

// styles compilation
gulp.task('styles:compile', () => (
    gulp.src(`${paths.srcStyles}/main.scss`)
        .pipe(plumber({ errorHandler: errorHandler('Error in \'styles\' task') }))
        .pipe(gulpIf(isDebug, sourcemaps.init()))
        .pipe(postcss())
        .pipe(sass({ includePaths: ['node_modules', 'src'] }))
        .pipe(gulpIf(!isDebug, autoprefixer()))
        .pipe(gulpIf(!isDebug, gcmq()))
        .pipe(gulpIf(!isDebug, nano({ zindex: false })))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulpIf(isDebug, sourcemaps.write()))
        .pipe(gulp.dest(paths.devStyles))
));

// common task
gulp.task('styles', gulp.series('styles:lint', 'styles:compile'));
