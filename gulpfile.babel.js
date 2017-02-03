import gulp from 'gulp';
import path from 'path';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import watchify from 'watchify';
import babel from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import connect from 'gulp-connect';
import importCss from 'gulp-import-css';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
import runSequence from 'run-sequence';
import eslint from 'gulp-eslint';
import merge from 'merge-stream';

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
    src: path.join(PATHS.src, 'server/*.html'),
    dist: PATHS.dist
};

/**
 * @name STYLES
 * @type {{src, dist}}
 */
const STYLES = {
    src: path.join(PATHS.src, 'styles/*.css'),
    dist: path.join(PATHS.dist, 'css')
};

/**
 * @name compileScripts
 * @param watch
 */
const compileScripts = (watch=false) => {
    let bundler = browserify(SCRIPTS.src, {debug: watch}).transform(babel);

    if (watch) {
        bundler = watchify(bundler);
    }

    let bundle = () => {
        connect.reload();

        return bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(SCRIPTS.dist))
            .pipe(connect.reload());
    };

    if (watch) {
        bundler.on('update', files => {
            let linting = gulp.src(files)
                .pipe(eslint('eslint.json'))
                .pipe(eslint.format());

            console.log('... bundling');

            return merge(linting, bundle());
        });
    }

    bundle();
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
    return gulp.src(SERVER.src)
        .pipe(gulp.dest(SERVER.dist))
        .pipe(connect.reload());
});

/**
 * @name styles
 */
gulp.task('styles', function () {
    return gulp.src(STYLES.src)
        .pipe(sass({ outputStyle: 'nested', errLogToConsole: true}).on('error', sass.logError))
        .pipe(importCss())
        .pipe(autoprefixer({ browsers: ['last 4 versions'], cascade: true, remove: true }))
        .pipe(gulp.dest(STYLES.dist))
        .pipe(connect.reload());
});

/**
 * @name server
 */
gulp.task('server', () => {
    return connect.server({
        name: 'Future Finance',
        root: PATHS.dist,
        port: 8080,
        livereload: true
    });
});

/**
 * @name watch
 */
gulp.task('watch', ['build'], () => {
    runSequence(['server', 'scripts:watch']);
    gulp.watch(SERVER.src, ['markup']);
    gulp.watch(STYLES.src, ['styles']);
});

/**
 * @name build
 */
gulp.task('build', ['clean'], () => {
    runSequence(['markup', 'styles']);
});
