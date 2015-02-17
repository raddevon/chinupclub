var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.{scss,sass}')
      .pipe(plugins.sass({indentedSyntax: true}))
      .pipe(gulp.dest('./css'));
});

gulp.task('sass:dist', function() {
  return gulp.src('./sass/**/*.{scss,sass}')
      .pipe(plugins.sass({indentedSyntax: true, outputStyle: 'compressed'}))
      .pipe(gulp.dest('./dist/css'));
});

gulp.task('prefix', ['sass'], function () {
    return gulp.src('./css/**/*.css')
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['sass', 'server', 'watch']);

gulp.task('server', function() {
    plugins.connect.server({
        root: '.',
        port: 8000,
        livereload: true
    });
});

gulp.task('watch', function() {
  gulp.watch('**/*.{js,css,html}', function() {
    gulp.src('**/*.{js,css,html}')
        .pipe(plugins.connect.reload());
  });
  gulp.watch('**/*.{sass,scss}', ['sass']);
});
