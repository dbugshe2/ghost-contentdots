/**
 *   Ghost with Gulp and TailwindCSS - A CSS Utility framework
 *   Author : Shittu Maroof
 *   URL : meekroofy.com
 *   Twitter : twitter.com/maroofshittu
 **/

/**
 * Based on Gulp with TailwindCSS by Manjunath G (manjumjn.com) lazymozek.com and ghost starter theme
  Usage:
  1. yarn install //To install all dev dependencies of package
  2. yarn run dev //To start development and server for live preview
  3. yarn run prod //To generate theme zip file in ./dist
*/

// gulp
const { src, dest, task, watch, series, parallel } = require("gulp");

// js libs and plugins
const pump = require("pump");
const del = require("del"); //For Cleaning build/dist for fresh export
const options = require("./config"); //paths and other options from config.js
const browserSync = require("browser-sync").create();
var beeper = require("beeper");
const logSymbols = require("log-symbols"); //For Symbolic Console logs :) :P

// gulp plugins and utils
const postcss = require("gulp-postcss"); //For Compiling tailwind utilities with tailwind config
const concat = require("gulp-concat"); //For Concatinating js,css files
const uglify = require("gulp-terser"); //To Minify JS files
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin"); //To Optimize Images
const cleanCSS = require("gulp-clean-css"); //To Minify CSS files
const purgecss = require("gulp-purgecss"); // Remove Unused CSS from Styles
const livereload = require("gulp-livereload")
var zip = require("gulp-zip"); // to zip final theme files for dist
//Note : Webp still not supported in major browsers including forefox
//const webp = require('gulp-webp'); //For converting images to WebP format
//const replace = require('gulp-replace'); //For Replacing img formats to webp in html
// var uglify = require('gulp-uglify');

// postcss plugins
var autoprefixer = require("autoprefixer");
var colorFunction = require("postcss-color-mod-function");
var cssnano = require("cssnano");
var easyimport = require("postcss-easy-import");

//Load Previews on Browser on dev
function serve(done) {
    livereload.listen();
    done();
}

const handleError = (done) => {
    return function (err) {
        if (err) {
            console.log("\n\t" + logSymbols.error, "Error: ." + err + "\n");
            beeper();
        }
        return done(err);
    };
};

//=====> Development Tasks
function cleanDev() {
    console.log(
        "\n\t" + logSymbols.info,
        "Cleaning assets/built folder for fresh start.\n"
    );
    return del([options.paths.built.base]);
}


function hbs(done) {
    pump([
        src(['*.hbs', '**/**/*.hbs', '!node_modules/**/*.hbs']),
        livereload()
        ],
        handleError(done)
    );
}

function css(done) {
    var tailwindcss = require("tailwindcss");
    var processors = [easyimport(),
        tailwindcss(options.config.tailwindjs),
        colorFunction(),
        autoprefixer(),
        // cssnano(),
    ];

    pump(
        [
            src(`${options.paths.src.css}/style.css`, { sourcemaps: true }),
            postcss(processors),
            dest(options.paths.built.css, { sourcemaps: "." }),
            livereload(),
        ],
        handleError(done)
    );
}

function js(done) {
    pump(
        [
            src(`${options.paths.src.js}/**/*.js`, { allowEmpty: true }),
            sourcemaps.init(),
            // concat({ path: "scripts.js" }),
            uglify(),
            sourcemaps.write('./'),
            dest(options.paths.built.js),
            livereload(),
        ],
        handleError(done)
    );
}

function misc() {
    // for other files that just need to move to dist folder
    return src([
        `${options.paths.src.base}/**/*.ico`,
        `${options.paths.src.base}/**/*.png`,
        `${options.paths.src.base}/**/*.webmanifest`,
        `${options.paths.src.fonts}/**/*.{ttf,otf}`,
    ]).pipe(dest(options.paths.built.base));
}


//=====> Production Tasks (Optimized Build for Live/Production Sites)

function cleanDist() {
    console.log(
        "\n\t" + logSymbols.info,
        "Cleaning build folder for fresh start.\n"
    );
    return del([options.paths.dist.base]);
}

function zipper(done) {
    var targetDir = options.paths.dist.base;
    var themeName = require("./package.json").name;
    var filename = themeName + ".zip";

    pump(
        [
            src([
                "**",
                "!node_modules",
                "!node_modules/**",
                "!dist",
                "!dist/**",
                "!*.config.js",
            ]),
            zip(filename),
            dest(targetDir),
        ],
        handleError(done)
    );
}
// Watchers
const cssWatcher = () => watch([options.config.tailwindjs, `${options.paths.src.css}/**/*.css`], css);
const hbsWatcher = () =>
    watch(["*.hbs", "**/**/*.hbs", "!node_modules/**/*.hbs"], hbs);
const scriptWatcher = () => watch(`${options.paths.src.js}/**/*.js`, js)

// main tasks
const watcher = parallel(cssWatcher, hbsWatcher, scriptWatcher);
const build = series(css, js);
const dev = series(build, serve, watcher);

exports.build = build;
exports.zip = series(cleanDist, cleanDev, build, zipper);
exports.default = dev;
