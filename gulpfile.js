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
	style: "webcontent/style/**/*.css",
	js: "webcontent/lib/**/*.js",
	images: "webcontent/images/",
	audio: "webcontent/audio/",
	video: "webcontent/video/"
};

var types = {
    js: "*.js",
    html: "*.html",
    css: "*.css",
};

var libs = {
	//angular: "lib/**/angular.min.js",
	//jQuery: "lib/**/jquery.min.js",
	//angularRoute: "lib/**/angular-route.min.js"
	angular: "lib/**/angular.js",
	jQuery: "lib/**/jquery.js",
	angularRoute: "lib/**/angular-route.js",
	angularResource: "lib/**/angular-resource.js"
};

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

gulp.task('bowerRemoveSources', function() {
	return gulp.src(propsToArray(libs))
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest('webcontent/lib/'));
});

gulp.task('js', function() {
	return gulp.src(["webcontent/lib/angular.js","webcontent/lib/angular-route.js","webcontent/lib/jquery.min.js","webcontent/lib/angular-resource.js"])
		.pipe(concat("amigo.js"))
		.pipe(addStream.obj(gulp.src(path.sourceJs)))
		.pipe(addStream.obj(prepareTemplates()))
		.pipe(concat("app.js"))
		//.pipe(uglify())
		.pipe(gulp.dest('nginx/app/'));
});
gulp.task('css', function() {
	return gulp.src([path.style])
		.pipe(concat("style.css"))
		.pipe(minifyCss())
		.pipe(gulp.dest('nginx/app/'));
});
gulp.task('default', ['bowerRemoveSources','js','css'], function() {
     gulp.watch(propsToArray(path), ['js','css']);
});