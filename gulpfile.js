var  gulp =require("gulp");
var watch =require("gulp-watch");
var browserSync=require("browser-sync");

gulp.task("default",function(){
	browserSync.init({
		server:{
			baseDir:"./"
		}
	});

	gulp.watch("index.html").on("change",browserSync.reload);
	gulp.watch("view/**/**").on("change",browserSync.reload);
	gulp.watch("public/**/**").on("change",browserSync.reload);
})