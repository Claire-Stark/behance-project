'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass'); /* this will compile your SCSS to CSS */
var sourcemaps = require('gulp-sourcemaps'); /* this will tell you where in your SCSS your styling is coming from making it easier to edit */
var autoprefixer = require('gulp-autoprefixer'); /* this will check to see if the browser is up to date enough to run your code */
var browserSync = require('browser-sync').create(); /* this will make your browser update as you update you code*/
 
gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});
 
gulp.task('sass:watch', function () {

	browserSync.init({
        server: "."
    });

  	gulp.watch('./scss/**/*.scss', ['sass']);

  	gulp.watch("./*.htm").on('change', browserSync.reload);
});