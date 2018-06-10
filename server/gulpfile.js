const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', () => {
    return gulp.src('index.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./lib'))
});

gulp.task('routes', () => {
  return gulp.src('routes/*')
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(gulp.dest('./lib/routes'));
})

gulp.task('db', () => {
  return gulp.src('db/*')
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(gulp.dest('./lib/db'));
})

gulp.task('default', ['js', 'routes', 'db'],() => {
    gulp.watch(['index.js', 'routes/*', 'db/*'], ['js', 'routes']);
});

