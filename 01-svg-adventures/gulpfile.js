const { src, dest, watch, parallel } = require('gulp');

const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');

const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

function css() {
  return (
    src('./src/**/*.css')
      .pipe(postcss([autoprefixer()]))
      .pipe(cleanCSS(require('./bundler/clean-css.config.js')))
      // Output
      .pipe(dest('./dist'))
  );
}

function scripts() {
  return (
    src('./src/**/*.js')
      // Minify the file
      .pipe(uglify())
      .pipe(
        rename({
          suffix: '.min',
        })
      )
      // Output
      .pipe(dest('./dist'))
  );
}

function serve() {
  browserSync.init({
    ui: false,
    server: {
      baseDir: '.',
    },
  });

  watch(['./src/**/*.css', './src/**/*.js', '**/*.html']).on(
    'change',
    browserSync.reload
  );
}

exports.default = function () {
  serve();
  watch(['./src/**/*.css', './src/**/*.js'], parallel(css, scripts));
};
