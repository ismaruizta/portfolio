var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  del = require('del'),
  jade = require('gulp-jade'),
  i18nCompile = require("gulp-i18n-compile");


// TAREAS PRINCIPALES
gulp.task('dist', ['clean'], function(){
  gulp.start(
    'templates' , 
    'styles' , 
    'scripts' , 
    'images');
});


gulp.task('server', [
  'develop'
]);


// TAREA DE SERVIDOR
gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
  gulp.start('watch');
});


// TAREAS DE DISTRIBUCION
gulp.task('templates_Index', function() {
  return gulp.src(['src/app/*.jade', 'src/app/assets/templates/*.jade'])
    .pipe(jade())
    .pipe(gulp.dest('public'))
    .pipe(notify({ message: 'templates_Index task complete' }));
});


gulp.task('templates', ['templates_Index'], function() {
  return gulp.src(['src/app/components/**/*.jade'])
    .pipe(jade())
    .pipe(gulp.dest('public/components'))
    .pipe(notify({ message: 'templates task complete' }));
});


gulp.task('scripts', function() {
  return gulp.src([
      'src/app/*.js', 
      //'app/scripts/**.js',
      'src/app/components/**/scripts/*.js', 
      'src/app/components/**/*.js',
      //'app/scripts/blocks/**/*.js'
      ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'))
    //.pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    //.pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

/*
gulp.task('scripts_Index', function() {
  return gulp.src(['app/*.js', 'app/scripts/**.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'scripts_Index task complete' }));
});*/


gulp.task('styles', ['styles_Index'], function() {
  return sass('src/app/components/**/styles/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/components'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('public/components'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('styles_Index', function() {
  return sass('src/app/assets/styles/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('public/assets/css'))
    .pipe(notify({ message: 'styles_Index task complete' }));
});


gulp.task('images',['images_Index'], function() {
  return gulp.src(['src/app/components/**/images/*'])
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/components'))
    .pipe(notify({ message: 'Images task complete' }));
});


gulp.task('images_Index', function() {
  return gulp.src(['src/app/assets/img/*'])
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/assets/img'))
    .pipe(notify({ message: 'images_Index task complete' }));
});


//TRADUCCIONES
//gulp.task("i18n", function() {
  //gulp.src("app/components/**/i18n/*.json")
    /*.pipe(i18nCompile("[locale].json", {localePlaceholder: "[locale]"}))
    .pipe(gulp.dest("public/assets/i18n"))
    .pipe(notify({ message: 'i18n compile task complete' }));
});*/


gulp.task('clean', function() {
    return del(['public/assets', 'public/components', 'public/js', 'public/*.html']);
});


//WATCHERS
gulp.task('watch', function() {

  gulp.watch('src/app/components/**/styles/*.scss', ['styles']); //SCSS
  gulp.watch('src/app/assets/styles/*.scss', ['styles_Index']); //SCSS
  
  gulp.watch(['src/app/components/**/scripts/*.js', 'src/app/components/**/*.js'], ['scripts']); //JS
  gulp.watch(['src/app/app.js', 'app/scripts/**.js' , 'src/app/scripts/bloks/**/*.js', 'src/app/*.controller.js'], ['scripts']); //INDEX.JS
  
  gulp.watch('src/app/components/**/images/*', ['images']); //IMAGES
  gulp.watch(['src/app/assets/img/*'], ['images_Index']); //IMAGES
  
  gulp.watch(['src/app/*.jade', 'src/app/assets/templates/*.jade'], ['templates_Index']); //INDEX.JADE
  gulp.watch('src/app/components/**/*.jade', ['templates']); //JADES

  livereload.listen();
  gulp.watch('public/**').on('change', livereload.changed);

});

