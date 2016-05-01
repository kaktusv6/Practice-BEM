var gulp = require('gulp'),
	prefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade');

gulp.task('connect', function() {
	connect.server({
		root: '',
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('app/index.html')
	.pipe(gulp.dest('app'))
	.pipe(connect.reload());
});

gulp.task('jade', function() {
  gulp.src('dist/jade/*.jade')
  .pipe(jade({
    pretty: true
	}))
  .pipe(gulp.dest('app'))
  .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('dist/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
});

gulp.task('css', function () {
	gulp.src('dist/css/*.css')
	// .pipe(prefixer({ // autoPrefixer for Windows
	// 	browsers: ['last 2 versions'],
	// 	cascade: false
	// }))
	.pipe(gulp.dest('app/css'))
	.pipe(connect.reload());
});

gulp.task('js', function () {
	gulp.src('dist/js/*.js')
	.pipe(gulp.dest('app/js'))
	.pipe(connect.reload());
});

gulp.task('watch',function () {
	gulp.watch('dist/index.html', ['html'])
	gulp.watch('dist/sass/**/*.scss', ['sass'], ['css'])
	gulp.watch('dist/css/*.css', ['css'])
	gulp.watch('dist/js/*.js', ['js'])
	gulp.watch('dist/jade/**/*.jade', ['jade'])
	gulp.watch('dist/jade/*.jade', ['jade'])
});

gulp.task('default', ['connect', 'html', 'jade', 'sass', 'css', 'js', 'watch']);
