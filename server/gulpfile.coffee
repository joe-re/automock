gulp        = require 'gulp'
babelify    = require 'babelify'
browserify  = require 'browserify'
source      = require 'vinyl-source-stream'
sass        = require 'gulp-sass'
seq         = require 'run-sequence'
babel       = require 'gulp-babel'

gulp.path =
  assetSrc: 'src/assets'
  assetDist: 'dist/assets'
  src: 'src'
  dist: 'dist'

gulp.task 'build', ->
  seq ['build:html', 'build:server', 'build:browserify', 'build:scss']

gulp.task 'build:html', ->
  gulp.src "#{@path.assetSrc}/**/*.html"
    .pipe gulp.dest(@path.assetDist)

gulp.task 'build:server', ->
  gulp.src ["#{@path.src}/**/*.js", "!#{@path.assetSrc}/**/*.js"]
    .pipe babel()
    .pipe gulp.dest(@path.dist)

gulp.task 'build:browserify', ->
  browserify(
    entries: ["#{@path.assetSrc}/javascripts/index.js"]
    extensions: ['.js', '.react.js']
  ).transform(babelify)
   .bundle()
   .pipe source 'bundle.js'
   .pipe gulp.dest(@path.assetDist)

gulp.task 'build:scss', ->
  gulp.src "#{@path.assetSrc}/**/*.scss"
    .pipe sass({ includePaths: [ 'node_modules' ] }).on('error', sass.logError)
    .pipe gulp.dest(@path.assetDist)

gulp.task 'watch', ['build'], ->
  gulp.watch("#{@path.src}/**/*.js", ['build:browserify', 'build:server'])
  gulp.watch("#{@path.src}/**/*.scss", ['build:scss'])
