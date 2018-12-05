
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
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var webpack = require('webpack-stream');
var webpackConfigApp = require('./webpack.config.dev.js');
var webserver = require('gulp-webserver');
var exec = require('gulp-exec');

//////////////////////////////////////////////////////////////////////////////////////////////
// FE task
//////////////////////////////////////////////////////////////////////////////////////////////

var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

gulp.task('devsrv-scripts', function(){
  var options = {
    continueOnError: false,
    pipeStdout: false,
    customTemplatingThing: "test"
  };
  var reportOptions = {
  	err: true,
  	stderr: true,
  	stdout: true
  };
  return gulp.src('./src/**/*.js')
    .pipe(plumber())
    .pipe(exec('npm run build:react', options));
});

gulp.task('bundle-devsrv', function(){
  return run('devsrv-scripts');
});

gulp.task('sass', function(){
  gulp.src('./sass/app.scss')
    .pipe(sass({
      includePaths: sassPaths,
      //outputStyle: (isProduction ? 'compressed' : 'nested'),
      outputStyle: ('nested'),
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(gulp.dest('./devsrv/css'));
});

gulp.task('watch-fe', function(){
  //gulp.watch('./src/**/*.js', ['devsrv-scripts'])
  gulp.watch('./sass/**/*.scss', function(){
    gulp.start('sass');
  });
});

gulp.task('webserver', function() {
  gulp.src('./devsrv/')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('development', function(cb){
  run('watch-fe', 'sass', 'webserver', cb);
});
