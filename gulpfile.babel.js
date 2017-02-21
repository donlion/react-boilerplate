import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import connect from 'gulp-connect';
import importCss from 'gulp-import-css';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
import runSequence from 'run-sequence';
import eslint from 'gulp-eslint';
import merge from 'merge-stream';
import renderReact from 'gulp-render-react';
import uglify from 'gulp-uglify';
import insert from 'gulp-insert';

/**
 * @name PROJECT
 * @type {string}
 */
const PROJECT = 'React boilerplate';

/**
 * @name PATHS
 */
const PATHS = {
    root: path.join(__dirname, '/'),
    src: path.join(__dirname, '/src/'),
    dist: path.join(__dirname, '/dist/')
};

/**
 * @name SCRIPTS
 * @type {{src, dist}}
 */
const SCRIPTS = {
    src: path.join(PATHS.src, 'scripts/index.js'),
    dist: path.join(PATHS.dist, 'js')
};

/**
 * @name SERVER
 * @type {{src, dist: *}}
 */
const SERVER = {
    src: path.join(PATHS.src, 'server/*.js'),
    dist: PATHS.dist
};

/**
 * @name STYLES
 * @type {{src, dist}}
 */
const STYLES = {
    src: path.join(PATHS.src, 'styles/*.css'),
    watch: path.join(PATHS.src, 'styles/**/*.css'),
    dist: path.join(PATHS.dist, 'css')
};

/**
 * @name STATIC
 * @type {{src, dist}}
 */
const STATIC = {
    src: path.join(PATHS.src, 'static/*.*'),
    dist: path.join(PATHS.dist, 'static')
};

/**
 * @name compileScripts
 * @param develop
 */
const compileScripts = (develop=false) => {
    let bundler = browserify(SCRIPTS.src, {
            debug: develop
        })
        .transform('babelify');
    let bundle;

    if (develop) {
        bundler = watchify(bundler);

        bundle = () => {
            return bundler.bundle()
                .on('error', function(err) { console.error(err); this.emit('end'); })
                .pipe(source('app.js'))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                //.pipe(uglify())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(SCRIPTS.dist))
                .pipe(connect.reload());
        };

        bundler.on('update', files => {
            let linting = gulp.src(files)
                .pipe(eslint('eslint.json'))
                .pipe(eslint.format());

            gutil.log('Browserify bundling...');

            return merge(linting, bundle());
        });

        bundler.on('time', time => {
            gutil.log(`Bundling done after ${time}ms`);
        });

    } else {

        bundle = () => {
            connect.reload();

            return bundler.bundle()
                .on('error', function(err) { console.error(err); this.emit('end'); })
                .pipe(source('app.js'))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(SCRIPTS.dist))
                .pipe(connect.reload());
        };
    }

    return bundle();
};

/**
 * @name clean
 */
gulp.task('clean', cb => del(PATHS.dist, { force: true }, cb));

/**
 * @name scripts
 */
gulp.task('scripts', () => {
    return compileScripts();
});

/**
 * @name scripts:watch
 */
gulp.task('scripts:watch', () => {
    return compileScripts(true);
});

/**
 * @name markup
 */
gulp.task('markup', () => {
    return gulp.src(SERVER.src, {read:false})
        .pipe(renderReact({
            type: 'string'
        }))
        .pipe(insert.prepend('<!doctype html>'))
        .pipe(gulp.dest(SERVER.dist))
        .pipe(connect.reload());
});

/**
 * @name static
 */
gulp.task('static', () => {
    return gulp.src(STATIC.src)
        .pipe(gulp.dest(STATIC.dist))
        .pipe(connect.reload());
});

/**
 * @name styles
 */
gulp.task('styles', function () {
    return gulp.src(STYLES.src)
        .pipe(importCss())
        .pipe(sass({ outputStyle: 'nested', errLogToConsole: true}).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 4 versions'], cascade: true, remove: true }))
        .pipe(gulp.dest(STYLES.dist))
        .pipe(connect.reload());
});

/**
 * @name server
 */
gulp.task('server', () => {
    return connect.server({
        name: PROJECT,
        root: PATHS.dist,
        port: 8080,
        livereload: true
    });
});

/**
 * @name watch
 */
gulp.task('watch', ['_build'], cb => {
    runSequence(['server', 'scripts:watch'], cb);
    gulp.watch(SERVER.src, ['markup']);
    gulp.watch(STYLES.watch, ['styles']);
    gulp.watch(STATIC.src, ['static']);
});

/**
 * @name _build
 */
gulp.task('_build', cb => runSequence('clean', ['markup', 'styles', 'static'], cb));

/**
 * @name build
 */
gulp.task('build', cb => runSequence('_build', 'scripts', cb));
