var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    del = require('del'),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync').create();

//Define the app path
var path = {
    all:['./app/template/*.html','./app/css/*.css','./app/js/*.js'],
    template:['./app/template/index.html'],
    css:['./app/css/*.css'],
    js:['./app/js/*.js','!app/js/widget.js'],
    dev_js:['./app/dev-js/*.js','./app/dev-js/*/*.js'],
};


// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['build']);
});


// Browser-sync
gulp.task('browser-sync', function() {
    browserSync.init(path.all,{
        server: {
            baseDir: "./",
            startPath: ''
        }
    });
});

//压缩css
gulp.task('css',['clean'],function () {
    // 1. 找到文件
    gulp.src(path.css)
        //.pipe(concat('style.css'))
        // 2. 压缩文件
        .pipe(minify())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('./app/css'));
});

//uglify all js
gulp.task('js', ['clean'],function () {
    // 1. 找到文件
    gulp.src(path.dev_js)
        .pipe(uglify())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('./app/js/'));
});

//watch the template
gulp.task('watch',['clean'],function(){
    gulp.watch(path.dev_js,['js']);
    gulp.watch(path.css,['css']);
});

//gulp default
gulp.task('default',['browser-sync','watch']);


