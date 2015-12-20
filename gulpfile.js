/*
 * 参考: http://2inc.org/blog/2015/05/13/4818/
 */

/*
 * modules load
 */
var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var watchify = require('watchify');
var buffer = require('vinyl-buffer');

/*
 * paths
 */
var jsSrcPath = './src/';
var jsSrcFile = 'app.jsx';
var jsDestPath = './dist/';

/*
 * tasks
 */

/**
 * browserify
 */
gulp.task( 'browserify', function() {
    return jscompile( false );
});

/**
 * watchify
 */
gulp.task( 'watchify', function() {
    return jscompile( true );
});

/**
 * jscompile function
 */
function jscompile( is_watch ) {
    var bundler;
    var props = {
        entries: jsSrcPath + jsSrcFile,
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    };
    if ( is_watch ) {
        bundler = watchify( browserify( props ) );
    } else {
        bundler = browserify( props );
    }

    function rebundle() {
        console.log("rebundle");
        var transTimer = $.duration('transform time');
        var bundleTimer = $.duration('bundle time');
        var outputTimer = $.duration('output time');

        return bundler
            //.once('data', transTimer.start)
            .transform(babelify, {presets:["react"]})
            //.pipe(transTimer)
            .once('data', bundleTimer.start)
            .bundle()
            .pipe(bundleTimer)
            .once('data', outputTimer.start)
            .on('error', $.util.log.bind($.util, 'Browserify Error'))
            .pipe( source('app.js') )
            .pipe($.debug())
            /*
            .pipe( buffer() )
            .pipe( $.uglify() )
            */
            .pipe(gulp.dest( jsDestPath ) )
            .on('end', function() {
                console.log( "reload" );
                reload();
            })
            .pipe(outputTimer);
    }
    bundler.on( 'update', function() {
        rebundle();
    } );
    bundler.on( 'log', function( message ) {
        console.log( message );
    } );
    return rebundle();
}

/*
 * 実行時に必要なファイルをコピー
 */
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

// 監視タスクを作成
gulp.task('watch', ['plugins', 'watchify'], function() {
    browserSync({
        notify: false,
        logPrefix: 'BS',
        server: ['./dist/']
    });
    gulp.watch('./dist/index.html', reload);
});

gulp.task('buildBundle', ['plugins','browserify'], function(){

});

gulp.task('default', ['buildBundle']);
