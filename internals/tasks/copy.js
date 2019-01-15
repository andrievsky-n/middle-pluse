/* Dependencies */

const gulp = require('gulp');
const changed = require('gulp-changed');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const path = require('path');
const paths = require('../../paths');

const getParentDir = filePath => filePath.split(path.sep).pop();

/* Tasks */

// copy public folder
gulp.task('copy:public', () => {
    const dir = paths.dev;
    return gulp.src(`${paths.src}/public/**/*`)
        .pipe(changed(dir))
        .pipe(filter(['**', '!**/.gitkeep']))
        .pipe(gulp.dest(dir));
});

// copy images from the components directories
gulp.task('copy:components-img', () => {
    const dir = paths.devImages;
    return gulp.src([
        `${paths.srcComponents}/**/*.gif`,
        `${paths.srcComponents}/**/*.png`,
        `${paths.srcComponents}/**/*.jpg`,
        `${paths.srcComponents}/**/*.svg`,
    ])
        .pipe(rename((filepath) => {
            // eslint-disable-next-line no-param-reassign
            filepath.dirname = getParentDir(filepath.dirname);
        }))
        .pipe(changed(dir))
        .pipe(gulp.dest(dir));
});

// common task
gulp.task('copy', gulp.parallel('copy:public', 'copy:components-img'));

// copy files from dev to build (for backend mode)
gulp.task('copy:dev-fonts', () => (
    gulp.src(`${paths.devAssets}/fonts/**`)
        .pipe(gulp.dest(`${paths.buildAssets}/fonts`))
));

gulp.task('copy:dev-images', () => (
    gulp.src(`${paths.devImages}/**`)
        .pipe(gulp.dest(paths.buildImages))
));

gulp.task('copy:dev-scripts', () => (
    gulp.src(`${paths.devScripts}/**`)
        .pipe(gulp.dest(paths.buildScripts))
));

gulp.task('copy:dev-styles', () => (
    gulp.src(`${paths.devStyles}/**`)
        .pipe(gulp.dest(paths.buildStyles))
));

gulp.task('copy:dev-themes', () => (
    gulp.src(`${paths.devThemes}/**`)
        .pipe(gulp.dest(paths.buildThemes))
));

gulp.task('copy:dev-public', () => (
    gulp.src([`${paths.dev}/**`, `!${paths.devAssets}/**`, `!*${paths.devThemes}/**`])
        .pipe(gulp.dest(paths.build))
));

gulp.task('copy:dev', gulp.parallel(
    'copy:dev-fonts',
    'copy:dev-images',
    'copy:dev-scripts',
    'copy:dev-styles',
    'copy:dev-themes',
    'copy:dev-public'
));
