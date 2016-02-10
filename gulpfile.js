var gulp = require('gulp'),
	concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    templateCache = require('gulp-angular-templatecache'),
    addStream = require('add-stream'),
    rename = require('gulp-rename');

var path = {
	sourceJs: "source/**/*.js",
	sourceHtml: "source/**/*.html",
	style: "content/style/css/*.css",
	styleJs: "content/lib/**/*.js"
};

var libs = {
	jQuery: "lib/**/jquery.min.js",
	angular: "lib/**/angular.min.js",
	angularRoute: "lib/**/angular-route.min.js",
	angularResource: "lib/**/angular-resource.min.js"
};

gulp.task('bowerRemoveSources', function() {
	return gulp.src(propsToArray(libs))
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest('content/lib/'));
});

gulp.task('js', function() {
	return gulp.src(propsToArray(libs))
		.pipe(concat("amigo.js"))
		.pipe(addStream.obj(gulp.src(path.sourceJs)))
		.pipe(addStream.obj(prepareTemplates()))
		.pipe(concat("app.js"))
		.pipe(gulp.dest('nginx/app/'));
});
gulp.task('css', function() {
	return gulp.src([path.style])
		.pipe(concat("style.css"))
		.pipe(gulp.dest('nginx/app/'));
});

gulp.task('default', ['bowerRemoveSources','js','css'], function() {
     gulp.watch(propsToArray(path), ['js','css']);
});

function transformUrl(url){
	return url.replace(/.*[\\]{1}/, '');
};

function prepareTemplates() {
  return gulp.src(path.sourceHtml)
    .pipe(templateCache({standalone:true, transformUrl: transformUrl}));
};

function propsToArray(object) {
	var result = [];
	for(var propertyName in object) {
		result.push(object[propertyName]);
	}
	return result;
};