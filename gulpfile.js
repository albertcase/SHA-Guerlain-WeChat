var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync').create();

//Define the app path
var path = {
    all:['./app/template/index.html','./app/template/qrcode.html','./app/css/*.css','./app/js/*.js'],
    template:['./app/template/index.html'],
    css:['./app/css/*.css'],
    js:['./app/js/*.js','!app/js/widget.js'],
    index_include_js:['./app/js/lib/zepto.min.js','./app/js/lib/pre-loader.js','./app/js/lib/shake.js','./app/js/rem.js','./app/js/common.js','./app/js/api.js','./app/js/controller.js'],
};

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
gulp.task('css',function () {
    // 1. 找到文件
    gulp.src(path.css)
        //.pipe(concat('style.css'))
        // 2. 压缩文件
        .pipe(minify())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('./app/css'));
});

//concat and uglify indexjs
gulp.task('indexjs', function () {
    // 1. 找到文件
    gulp.src(path.index_include_js)
        .pipe(concat('widget_index.js'))
        // 2. 压缩文件
        .pipe(uglify())
        .pipe(rename('widget_index.js'))
        // 3. 另存为压缩文件
        .pipe(gulp.dest('./app/js/widget'));
});


//generate index.tpl.php
gulp.task('generate_index',['css','indexjs'], function () {
    var target = gulp.src('./app/template/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./app/js/widget/widget_index.js', './app/css/style.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(rename('index.tpl.php'))
        .pipe(gulp.dest('./template'));
});

//watch the template
gulp.task('watch',function(){
    gulp.watch(path.all,['generate_index']);
});

//gulp default
gulp.task('default',['browser-sync']);


