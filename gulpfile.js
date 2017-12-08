var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('css', function() {
  return gulp.src('assets/css/*.css')
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('assets/css/'))
});

gulp.task('js', function() {
  return gulp.src('assets/js/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'))
});

gulp.task('default', ['css', 'js']);
