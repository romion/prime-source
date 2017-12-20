var gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  browsersync = require('browser-sync').create(),
  minifycss = require('gulp-clean-css'),
  minifyhtml = require('gulp-minify-html'),
  minifyjs = require('gulp-uglify'),
  postcss = require('gulp-postcss'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  smartgrid = require('smart-grid');

gulp.task('default', function() {
  console.log("Hello");
});

gulp.task('build',['minify-html','minify-css','minify-js','fonts','img'],function(){
  console.log("Building...");
});

gulp.task('watch',['browser-sync','pug','sass','autoprefixer'],function(){
  gulp.watch('./src/sass/**/*.+(sass|scss)', ['sass']);
  gulp.watch('./src/css/**/*.css', ['autoprefixer']);
  gulp.watch('./src/pug/**/*.+(jade|pug)', ['pug']);
  gulp.watch('./src/js/**/*.js', browsersync.reload);
  gulp.watch('./src/img/*', browsersync.reload);
  gulp.watch('./src/fonts/*', browsersync.reload);
});

gulp.task('live', function(){
  browsersync.init({
    server: {
      baseDir: './dist/'
    },
    ui: false,
    online: false
  });
  gulp.watch('./dist/**/*', browsersync.reload);
});

gulp.task('browser-sync', function() {
  browsersync.init({
    server: {
      baseDir: './src/'
    },
    ui: false,
    online: false
  });
});

gulp.task('pug', function(){
  gulp.src('./src/pug/**/*.+(jade|pug)')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./src/'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

gulp.task('sass', function(){
  gulp.src('./src/sass/*.+(sass|scss)')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

gulp.task('autoprefixer', function () {
  return gulp.src('./src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src/css/'));
});

gulp.task('minify-css', function() {
  gulp.src('./src/css/**/*.css')
    .pipe(minifycss({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-html', function() {
  gulp.src('./src/**/*.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-js', function () {
  gulp.src('./src/js/**/*.js')
    .pipe(minifyjs())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**/*')
  .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('img', function() {
  return gulp.src('./src/img/**/*')
  .pipe(gulp.dest('./dist/img'));
});

var settings = {
    outputStyle: 'sass', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '0px', /* gutter width px || % */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        }
      /*
       We can create any quantity of break points.

       some_name: {
       width: 'Npx',
       fields: 'N(px|%|rem)',
       offset: 'N(px|%|rem)'
       }
       */
    }
};

smartgrid('./src/sass/includes', settings);