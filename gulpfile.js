// Include gulp
var gulp = require('gulp');

// Include plugins
const concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      run = require('gulp-run'),
      del = require('del');

const composePath = (basePath, newPath) => `${basePath}/${newPath}`;
const nodeModulesPath = path => composePath('node_modules', path);

const libsPaths = [
  'jquery/dist/jquery.js',
  'jquery-ui-dist/jquery-ui.js',
  /* TODO: replace: */
  // 'jquery-ui/ui/core.js',
  // 'jquery-ui/ui/widget.js',
  // 'jquery-ui/ui/position.js',
  // 'jquery-ui/ui/widgets/menu.js',
  // 'jquery-ui/ui/widgets/autocomplete.js',
  'foundation-sites/dist/foundation.js',
  'motion-ui/dist/motion-ui.js',
  'handlebars/dist/handlebars.js',
  'raphael/raphael.js'
].map(nodeModulesPath);

// Concatenate & Minify JS
gulp.task('scripts-libs', function() {
    return gulp.src(libsPaths)
      .pipe(concat('libs.js'))
      .pipe(rename({suffix: '.min'}))
      // .pipe(uglify())
      .pipe(gulp.dest('assets/js'));
});

gulp.task('scripts-site', function() {
    return gulp.src(['_includes/js/*'])
      .pipe(concat('site.js'))
      .pipe(rename({suffix: '.min'}))
      // .pipe(uglify())
      .pipe(gulp.dest('assets/js'));
});

gulp.task('scripts', ['scripts-libs', 'scripts-site']);

// Deploy css
gulp.task('styles-foundation', function() {
    return gulp.src([nodeModulesPath('foundation-sites/scss/**/*')])
      .pipe(gulp.dest('_sass/vendor/foundation'));
});

gulp.task('styles-jquery-ui', function() {
    return gulp.src([nodeModulesPath('jquery-ui-dist/jquery-ui.css')])
      .pipe(rename({extname: '.scss'}))
      .pipe(gulp.dest('_sass/vendor'));
});

gulp.task('styles-font-awesome-css', function() {
    return gulp.src([nodeModulesPath('font-awesome/scss/*')])
      .pipe(gulp.dest('_sass/vendor/font-awesome'));
});

gulp.task('styles-font-awesome-font', function() {
    return gulp.src([nodeModulesPath('/font-awesome/fonts/*')])
      .pipe(gulp.dest('assets/fonts'));
});

gulp.task('styles', ['styles-font-awesome-font', 'styles-font-awesome-css', 'styles-foundation', 'styles-jquery-ui']);

gulp.task('cleancache', function () {
  return del(['.jekyll-cache']);
});

// Runs Jekyll build
gulp.task('build', ['scripts', 'styles', 'cleancache'], function() {
  var shellCommand = 'bundle exec jekyll build';

  return gulp.src('.')
    .pipe(run(shellCommand));
});

// Runs Jekyll dev server
gulp.task('dev', ['scripts', 'styles', 'cleancache'], function() {
  const shellCommand = 'bundle exec jekyll serve --livereload';

  return run(shellCommand, {verbosity: 3}).exec();
});

// Runs Jekyll dev server with incremental builds
gulp.task('dev:incremental', ['scripts', 'styles', 'cleancache'], function() {
  const shellCommand = 'bundle exec jekyll serve --incremental --livereload';

  return run(shellCommand, {verbosity: 3}).exec();
});

// Default Task
gulp.task('default', ['scripts', 'styles', 'cleancache']);
