/* Dependencies */

// utils
const gulp = require('gulp');
const del = require('del');
const argv = require('yargs').argv;
// paths
const paths = require('../../paths');

const isDebug = process.env.NODE_ENV !== 'production';
const isBackend = argv.b;

const files = [`${paths.dev}/**`];

if (!isDebug || isBackend) {
    files.push(`${paths.build}/**`);
}

gulp.task('clean', () => (
    del(files, {force: true})
));
