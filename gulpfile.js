var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var child = require('child_process');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();

// Jekyll
gulp.task('jekyll', () => {
  var jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  var jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

// CSS concatenation and minification
gulp.task('css', function() {
  return gulp.src('assets/css/*.css')
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'))
});

// JS concatenation and minification
gulp.task('js', function() {
  return gulp.src('assets/js/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/', {overwrite: true}))
});

// browserSync
var siteRoot = '_site';

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });
  gulp.watch('assets/css/*.css', ['css']);
  gulp.watch('assets/js/*.js', ['js']);
});

gulp.task('default', ['css', 'jekyll', 'js', 'serve']);
