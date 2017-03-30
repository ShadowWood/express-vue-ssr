const gulp = require('gulp');
const webpack = require('gulp-webpack');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const named = require('vinyl-named');
const _ = require('lodash');

const appList = ['main'];

gulp.task('default', function () {
	return gulp.src(_.map(appList, app => `src\/${app}\.js`))
		.pipe(named())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(webpack({
			module: {
				loaders: [
					{
						test: /\.vue$/,
						loader: 'vue'
					}
				]
			},
			watch: true
		}))
		.pipe(gulp.dest('dist/'));
});