'use strict'

var gulp = require('gulp');

let env = process.env.NODE_ENV || 'development';

require('require-dir')('./gulp')

gulp.task('default',  (cb) => {
  gulp.start(env);
});

gulp.task('bundle', ['clean-prod'], (cb) => {
  gulp.start('production');
});

gulp.task('test', (cb) => {
  gulp.start('test-frontend');
});
