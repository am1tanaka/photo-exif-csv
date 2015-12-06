var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('browserify', function(){
    return browserify('./src/app.jsx', { debug: true})
        .transform(babelify, {presets:["react"]})
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist'))
        .on('end', function() {
            reload();
    });
});

// 監視タスクを作成
gulp.task('watch', function() {
    browserSync({
        notify: false,
        logPrefix: 'BS',
        server: ['./dist/']
    });
    gulp.watch('./src/*.jsx', ['browserify']);
    gulp.watch('./dist/index.html', ['browserify']);
});


gulp.task('default', ['browserify']);
