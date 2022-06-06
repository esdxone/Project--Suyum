const {src, dest, series, watch} = require('gulp')
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'))
const include = require('gulp-file-include')
const del = require('del')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

const concatFiles = true

function html() {
  return src('src/**.html')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(dest('dist'))
}

function scss() {
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(dest('dist/css'))
}

function css() {
  return src('src/css/**.css')
    .pipe(concat('libs.css'))
    .pipe(dest('dist/css'))
}

function js() {
  return src('src/js/**.js')
    .pipe(concat('script.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(dest('dist/js'))
}

function jsLibs() {
  if (concatFiles) {
    return src(['src/js/libs/jquery-3.4.1.min.js', 'src/js/libs/device.min.js', 'src/js/libs/util.js', 'src/js/libs/modal.js', 'src/js/libs/slick.min.js', 'src/js/libs/jquery.fancybox.js', 'src/js/libs/cleave.min.js', 'src/js/libs/jquery.mCustomScrollbar.min.js', 'src/js/libs/progressbar.min.js', 'src/js/libs/jquery.transit.js', 'src/js/libs/jquery.spincrement.min.js', 'src/js/libs/jquery.bootstrap-touchspin.min.js'])
      .pipe(concat('libs.js'))
      .pipe(uglify())
      .pipe(dest('dist/js'))
  }
  else {
    return src('src/js/libs/**.js')
      .pipe(dest('dist/js/libs'))
  }
}

function fonts() {
  return src('src/fonts/**/*')
    .pipe(dest('dist/fonts'))
}

function img() {
  return src('src/img/**/*')
    .pipe(dest('dist/img'))
}

function clear() {
  return del('dist')
}

function serve() {
  sync.init({
    server: './dist'
  })

  watch(['src/**.html', 'src/include/**.html'], series(html)).on('add change', sync.reload)
  watch('src/scss/**.scss', series(scss)).on('add change', sync.reload)
  watch('src/css/**.css', series(css)).on('add change', sync.reload)
  watch('src/js/libs/**.js', series(jsLibs)).on('add change', sync.reload)
  watch('src/js/**.js', series(js)).on('add change', sync.reload)
  watch('src/fonts/**/*', series(fonts)).on('add change', sync.reload)
  watch('src/img/**/*', series(img)).on('add change', sync.reload)
}

exports.build = series(clear, scss, css, js, jsLibs, fonts, img, html)
exports.serve = series(clear, scss, css, js, jsLibs, fonts, img, html, serve)
exports.clear = clear