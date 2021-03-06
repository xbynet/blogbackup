var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
/** //压缩 public 目录 css
gulp.task('minify-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});
// 压缩 public 目录 html
gulp.task('minify-html', function() {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
         removeComments: true,
         minifyJS: true,
         minifyCSS: true,
         minifyURLs: true,
    }))
    .pipe(gulp.dest('./public'))
});
// 压缩 public/js 目录 js
gulp.task('minify-js', function() {
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});
*/

//压缩图片
gulp.task('imgmin', () =>{
    return gulp.src(['./public/**/*.{png,jpg,jpeg,gif,bmp,ico}'])
		.pipe(
			//cache(
			imagemin({
			optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
			svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
			use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
		})
		//)
		)
        .pipe(gulp.dest('./public'));
	}
);
// 执行 gulp 命令时执行的任务 'minify-html','minify-css','minify-js',
gulp.task('default', [
    'imgmin'
]);