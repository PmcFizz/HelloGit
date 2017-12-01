var  gulp =require("gulp");
var watch =require("gulp-watch");
var browserSync=require("browser-sync");

gulp.task("default",function(){
	browserSync.init({
		server:{
			baseDir:"./"
		},
        port:8050
	});

	// gulp.watch("view/**/**").on("create",browserSync.reload);
	// gulp.watch("index.html").on("change",browserSync.reload);
	gulp.watch("view/cssstudy/**/**").on("change",browserSync.reload);
	// gulp.watch("public/**/**").on("change",browserSync.reload);
})