var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');

gulp.task('scripts', function() {
	return gulp.src(['app/bower_components/angular/angular.js',
					'app/bower_components/angular-route/angular-route.js', 
					'app/bower_components/angular-resource/angular-resource.js',
					'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
					'app/bower_components/angular-ui-utils/modules/event/event.js',
					'app/bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
					'app/bower_components/angular-ui-map/ui-map.js',
					'app/app.js',
					'app/bower_components/angular-ui-map/src/map.js',
					'app/home/home.js',
					'app/services/services.js',
					'app/sidebar/sidebar.js',
					'app/location/location.js',
					'app/auth/auth.js',
					'app/user/user.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

gulp.task('html', function() {
	return gulp.src('app/**/*.html')
		.pipe(minifyHTML({empty:true, quotes:true}))
		.pipe(gulp.dest('build/html'));
});

gulp.task('css', function() {
	return gulp.src(['app/bower_components/html5-boilerplate/css/normalize.css',
					'app/bower_components/html5-boilerplate/css/main.css',
					'app/app.css',
					'app/dist/css/bootstrap.css'])
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('build/css'));
});

gulp.task('default', ['scripts']);