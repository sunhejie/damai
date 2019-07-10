const gulp = require('gulp'); //引入gulp
const minihtml = require('gulp-minify-html'); //引入html的压缩插件
const minicss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch'); //引入监听的gulp插件
const babel = require('gulp-babel');
const es2015 = require('babel-preset-es2015');
//压缩html
gulp.task('uglifyhtml', () => {
    return gulp.src('src/*.html') //引入文件
        .pipe(minihtml()) //执行压缩插件
        .pipe(gulp.dest('dist/')); //输出
});
//css
gulp.task('uglifycss', () => {
    return gulp.src('src/css/*.css') //引入文件
        .pipe(minihtml()) //执行压缩插件
        .pipe(gulp.dest('dist/css')); //输出
});
//es6转es5
gulp.task('babeljs', () => {
    return gulp.src('src/script/js/*.js') //引入文件
        .pipe(babel({
            presets: ['es2015']
        })) //执行压缩插件
        .pipe(uglify())
        .pipe(gulp.dest('dist/script/js')); //输出
});
//压缩js
gulp.task('uglifyjs', () => {
    return gulp.src('src/script/js/*.js') //引入文件
        .pipe(uglify()) //执行压缩插件
        .pipe(gulp.dest('dist/script/js')); //输出
});

//压缩png图片
gulp.task('uglifypng', () => {
    return gulp.src('src/img1/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('dist/img1'));
});
//监听

gulp.task('default', function() { //default:默认名称，编译时可以省略
    watch(['src/*.html', 'src/css/*.css', 'src/img1/*.png', 'src/script/js/*.js'], gulp.parallel('uglifyhtml', 'uglifycss', 'uglifypng', 'babeljs'));
});