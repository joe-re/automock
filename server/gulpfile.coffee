gulp        = require 'gulp'
babelify    = require 'babelify'
browserify  = require 'browserify'
source      = require 'vinyl-source-stream'
sass        = require 'gulp-sass'
seq         = require 'run-sequence'

gulp.path =
  src: 'assets'
  dist: 'app/assets'

gulp.task 'build', ->
  seq ['build:html', 'build:browserify', 'build:scss']

gulp.task 'build:html', ->
  gulp.src "#{@path.src}/**/*.html"
    .pipe gulp.dest(@path.dist)

gulp.task 'build:browserify', ->
  browserify(
    entries: ["#{@path.src}/javascripts/index.js"]
    extensions: ['.js', '.react.js']
  ).transform(babelify)
   .bundle()
   .pipe source 'bundle.js'
   .pipe gulp.dest(@path.dist)

gulp.task 'build:scss', ->
  gulp.src "#{@path.src}/**/*.scss"
    .pipe sass({ includePaths: [ 'node_modules' ] }).on('error', sass.logError)
    .pipe gulp.dest(@path.dist)

gulp.task 'watch', ['build'], ->
  gulp.watch("#{@path.src}/**/*", ['build:browserify'])
