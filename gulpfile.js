var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var child = require('child_process');
var gutil = require('gulp-util');

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['serve',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});





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

gulp.task('default', ['css', 'jekyll', 'js']);
