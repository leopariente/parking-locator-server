const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const webpack = require('webpack-stream');
const sass = require('gulp-sass')(require('sass'));
const { exec } = require('child_process');

const webpackConfig = require('./webpack.config.js');

// Removes previous dist
gulp.task('clean', () => {
  return gulp.src('./dist', { allowEmpty: true })
    .pipe(clean());
});

// Initial ts compile
gulp.task('tsc', cb => {
  exec('tsc', () => cb());
});

// Watch ts files and recompile
gulp.task('tsc-w', () => {
  const tsc = exec('tsc -w --preserveWatchOutput --pretty');

  tsc.stdout.on('data', data => console.log(data));
  tsc.stderr.on('data', data => console.error(data));

  tsc.on('close', code => console.log(`tsc exited with code ${code}`));
});

// Start express
gulp.task('express', () => {
  const tsc = exec('nodemon --watch ./src/server ./src/server.ts');
  tsc.stdout.on('data', data => console.log(data));
  tsc.stderr.on('data', data => console.error(data));
});

// Build all
gulp.task('build', gulp.series(
  'clean',
  'tsc',
));

// Run all together
gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'tsc-w',
    'express',
  ),
));
