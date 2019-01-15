const gulp = require('gulp');

gulp.task('dev', gulp.series('compile', 'watch'));
