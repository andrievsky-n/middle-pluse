const gulp = require('gulp');

gulp.task('compile',
    gulp.series(
        'clean', 'copy',
        gulp.parallel('icons', 'styles', 'scripts', 'data', 'images', 'theme')
    )
);
