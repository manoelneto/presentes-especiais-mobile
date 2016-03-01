var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var compass = require('gulp-compass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var preprocess = require('gulp-preprocess');
var sh = require('shelljs');
var karma = require('karma').server;

var paths = {
  compass: ['./scss/**/*.scss'],
  coffee: ['./www/coffee/**/*.coffee'],
};

gulp.task('default', ['compass']);

gulp.task('test', function(done){
  karma.start({
    configFile: __dirname + '/tests/config.js',
    singleRun: true
  }, function(){
    done();
  });
});

gulp.task('compass', function(done) {
  gulp.src('asdf')
    .pipe(compass({
      config_file: 'config.rb',
      sass: 'scss',
    }))
    // .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});


gulp.task('dev', function() {
  gulp.src('./www/coffee/config/settings.coffee')
    .pipe(preprocess({context: { ENV: 'DEVELOPMENT', DEBUG: true}}))
    .pipe(gulp.dest('./www/coffee'));
});

gulp.task('mobile_dev', function() {
  gulp.src('./www/coffee/config/settings.coffee')
    .pipe(preprocess({context: { ENV: 'MOBILE_DEV', DEBUG: true}}))
    .pipe(gulp.dest('./www/coffee'));
});

gulp.task('real_mobile_dev', function() {
  gulp.src('./www/coffee/config/settings.coffee')
    .pipe(preprocess({context: { ENV: 'REAL_MOBILE_DEV', DEBUG: true}}))
    .pipe(gulp.dest('./www/coffee'));
});

gulp.task('test_env', function() {
  gulp.src('./www/coffee/config/settings.coffee')
    .pipe(preprocess({context: { ENV: 'TEST', DEBUG: true}}))
    .pipe(gulp.dest('./www/coffee'));
});

gulp.task('production', function() {
  gulp.src('./www/coffee/config/settings.coffee')
    .pipe(preprocess({context: { ENV: 'PRODUCTION'}}))
    .pipe(gulp.dest('./www/coffee'));
});

gulp.task('coffee', function(done) {
  gulp.src(paths.coffee)
    .pipe(coffee({bare: true})
    .on('error', gutil.log.bind(gutil, 'Coffee Error')))
    // .pipe(concat('application.js'))
    .pipe(gulp.dest('./www/js'))
    .on('end', done)
});

gulp.task('watch', function() {
  gulp.watch(paths.compass, ['compass']);
  gulp.watch(paths.coffee, ['coffee']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
