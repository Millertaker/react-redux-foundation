//////////////////////////////////////////////////////////////////////////////////////////////
// Required files
//////////////////////////////////////////////////////////////////////////////////////////////


var gulp = require('gulp');
var shell = require('gulp-shell');
var rimraf = require('rimraf');

var concat = require('gulp-concat');
var run = require('run-sequence');
var watch = require('gulp-watch');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var webserver = require('gulp-webserver');
var exec = require('gulp-exec');

//////////////////////////////////////////////////////////////////////////////////////////////
// FE task
//////////////////////////////////////////////////////////////////////////////////////////////
var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

gulp.task('clean-prod', function(cb){
  rimraf('./build', cb);
});

gulp.task('copy-html', function() {
  return gulp.src('./devsrv/index.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('copy-assets', function() {
  return gulp.src('./devsrv/images/*.{jpg,png,jpeg,gif,svg,mp3}')
    .pipe(gulp.dest('./build/images/'));
});

gulp.task('copy-scripts', function(){
  return gulp.src('./devsrv/sw.js')
    .pipe(gulp.dest('./build/'));
})

gulp.task('copy-fonts', function() {
  return gulp.src('./devsrv/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('./build/fonts/'));
});


gulp.task('sass-prod', function(){
  gulp.src('./sass/app.scss')
    .pipe(sass({
      includePaths: sassPaths,
      outputStyle: ('compressed'),
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('production', function(cb){
  run('clean-prod', 'sass-prod', 'copy-fonts', 'copy-assets', 'copy-scripts', 'copy-html',cb);
});
