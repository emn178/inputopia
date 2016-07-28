var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssToJs = require('gulp-css-to-js');
var minifyCss = require('gulp-minify-css');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var watch = require('gulp-watch');

gulp.task('default', function () {
  return gulp.src('src/**/*.css')
    .pipe(watch('src/**/*.css', convertCss));
});

gulp.task('build', ['convert-css'], function () {
  return merge(gulp.src('src/formosa.js'), gulp.src('build/formosa.css.js'), gulp.src('src/plugins/*.js'))
    .pipe(concat('formosa.js'))
    .pipe(gulp.dest('build'))
    .pipe(concat('formosa.min.js'))
    .pipe(uglify({ preserveComments: 'license' }))
    .pipe(gulp.dest('build'));
});

gulp.task('convert-css', convertCss);

function convertCss() {
  return gulp.src('src/**/*.css')
    .pipe(concat('formosa.css.js'))
    .pipe(minifyCss({ compatibility: 'ie8' }))
    .pipe(cssToJs({ variable: 'formosa.css' }))
    .pipe(concat('formosa.css.js'))
    .pipe(gulp.dest('build'));
}

function getFiles(folder) {
  return fs.readdirSync(folder).filter(function(file) {
    return fs.statSync(path.join(folder, file)).isFile();
  });
}
