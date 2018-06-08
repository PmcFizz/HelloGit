var watch =require("gulp-watch");
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    // gulp.watch("view/**/**.*").on("create",browserSync.reload);
	// gulp.watch("index.html").on("change",browserSync.reload);
	// gulp.watch("view/**/**").on("change",browserSync.reload);
	// gulp.watch("public/**/**").on("change",browserSync.reload);
});