import gulp from 'gulp';
import sass from 'gulp-sass';
import sassCompiler from 'sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import svgstore from 'gulp-svgstore';
import cheerio from 'gulp-cheerio';
import browserSync from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import fs from 'fs';
import path from 'path';
import fileInclude from 'gulp-file-include';
import { deleteSync } from 'del'

const browserSyncInstance = browserSync.create();

const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    img: 'src/img/**/*.{webp,svg}',
    video: 'src/video/**/*.{mp4,webm,mov,avi}',
    svg: 'src/img/svg/**/*.svg',
    fonts: 'src/fonts/**/*.woff2',
    html: 'src/*.html',
    dist: 'dist/'
};

const sassCompiled = sass(sassCompiler);

function videos(done) {
    const srcDir = 'src/video/';
    const destDir = 'dist/video/';

    fs.mkdirSync(destDir, { recursive: true });

    fs.readdirSync(srcDir).forEach(file => {
        fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    });

    done();
}

function styles() {
    return gulp.src(paths.scss)
        .pipe(sassCompiled().on('error', sassCompiled.logError)) 
        .pipe(autoprefixer({ cascade: false })) 
        .pipe(cleanCSS({ level: 2 })) 
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(paths.dist + 'css')) 
        .pipe(browserSyncInstance.stream());
}

function scripts() {
    return gulp.src(paths.js)
        .pipe(concat('script.min.js'))
        .pipe(uglify()) 
        .pipe(gulp.dest(paths.dist + 'js'))
        .pipe(browserSyncInstance.stream());
}

function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.statSync(srcPath).isDirectory()) {
            copyRecursiveSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

function images(done) {
    const srcDir = 'src/img/';
    const destDir = 'dist/img/';

    copyRecursiveSync(srcDir, destDir);
    done();
}

function svgSprite() {
    return gulp.src(paths.svg)
        .pipe(cheerio({
            run: function ($) {
                $('[fill], [stroke]').removeAttr('fill stroke');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(gulp.dest(paths.dist + 'img'));
}

function html() {
    return gulp.src(paths.html) // Получаем HTML файлы
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin({ collapseWhitespace: true })) // Минификация HTML (если нужна)
        .pipe(gulp.dest(paths.dist)) // Сохраняем обработанные файлы
        .pipe(browserSync.stream()); // Обновляем браузер
}


function fonts(done) {
    const srcDir = 'src/fonts/';
    const destDir = 'dist/fonts/';

    fs.mkdirSync(destDir, { recursive: true });

    fs.readdirSync(srcDir).forEach(file => {
        fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    });

    done();
}



function clean(done) {
    deleteSync([paths.dist]);
    done(); 
}

function serve() {
    browserSyncInstance.init({
        server: { baseDir: paths.dist }
    });

    gulp.watch(paths.scss, styles);
    gulp.watch(paths.js, scripts);
    gulp.watch(paths.img, images);
    gulp.watch(paths.svg, svgSprite);
    gulp.watch(paths.html, html);
    gulp.watch(paths.html).on('change', browserSyncInstance.reload);
}

export { clean, styles, scripts, images, svgSprite, html, fonts, videos, serve };

export default gulp.series(clean, gulp.parallel(styles, scripts, images, svgSprite, html, fonts, videos), serve);