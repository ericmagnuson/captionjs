var gulp         = require('gulp'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    clean        = require('gulp-clean-css');

gulp.task('css', function () {
    return gulp
        .src('src/main.css')
        .pipe(autoprefixer())
        .pipe(clean({
            compatibility: 'ie8',
            processImport: true,
            keepBreaks: true
            // level: 0,
            // format: {
            //     breaks: {
            //         afterAtRule: false, // controls if a line break comes after an at-rule; e.g. `@charset`; defaults to `false`
            //         afterBlockBegins: true, // controls if a line break comes after a block begins; e.g. `@media`; defaults to `false`
            //         afterBlockEnds: true, // controls if a line break comes after a block ends, defaults to `false`
            //         afterComment: true, // controls if a line break comes after a comment; defaults to `false`
            //         afterProperty: true, // controls if a line break comes after a property; defaults to `false`
            //         afterRuleBegins: false, // controls if a line break comes after a rule begins; defaults to `false`
            //         afterRuleEnds: true, // controls if a line break comes after a rule ends; defaults to `false`
            //         beforeBlockEnds: true, // controls if a line break comes before a block ends; defaults to `false`
            //         betweenSelectors: true // controls if a line break comes between selectors; defaults to `false`
            //     },
            //     indentBy: 4,
            //     spaces: {
            //         aroundSelectorRelation: true,
            //         beforeBlockBegins: true,
            //         beforeValue: true
            //     }
            // }
        }))
        .pipe(concat('captionjs.css'))
        .pipe(gulp.dest('dist/'))
        .pipe(clean({
            compatibility: 'ie8',
            processImport: true,
            keepBreaks: false
         }))
        .pipe(concat('captionjs.min.css'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js', ['jshint'], function () {
    return gulp
        .src('src/main.js')
        .pipe(concat('jquery.caption.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify({preserveComments: 'license'}))
        .pipe(concat('jquery.caption.min.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('jshint', function () {
    return gulp
        .src('src/main.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', ['css', 'js'], function () {
    gulp.watch('src/main.css', ['css']);
    gulp.watch('src/main.js', ['js']);
});

gulp.task('default', ['css', 'js']);
