const gulp = require('gulp');

const FwdRef = require('undertaker-forward-reference');

gulp.registry(FwdRef());

const requireDir = require('require-dir');

const tasks = requireDir('./internals/tasks');

gulp.task('default', gulp.series('dev'));
