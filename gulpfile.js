var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var watchify = require('watchify');

/** ビルド時に差分があるかをチェックするためのオブジェクト*/
var bundler = watchify(browserify({
    entries: ['./src/app.jsx'],
    debug: true,
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}));

/** bundlerの更新イベント時にrebundleを実行*/
bundler.on('update', rebundle);
bundler.on('log', $.util.log);

/** watchifyで更新を確認したら実行するイベント*/
function rebundle() {
    return bundler
        .transform(babelify, {presets:["react"]})
        .bundle()
        .on('error', $.util.log.bind($.util, 'Browserify Error'))
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist'))
        .on('end', function() {
            reload();
        });
}

/** スクリプトのビルドタスク*/
gulp.task('scripts', rebundle);

/** 最初のビルド*/
gulp.task('buildScripts', function(){
  return browserify('./src/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('plugins', function() {
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap*.min.css')
        .pipe(gulp.dest('dist/css'));
    gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('dist/plugins'));
    gulp.src('./node_modules/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
    gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/plugins'));
});

gulp.task('buildBundle', ['plugins','buildScripts'], function(){

});

// 監視タスクを作成
gulp.task('watch', ['plugins', 'scripts'], function() {
    browserSync({
        notify: false,
        logPrefix: 'BS',
        server: ['./dist/']
    });
    gulp.watch('./dist/index.html', reload);
});


gulp.task('default', ['buildBundle']);
