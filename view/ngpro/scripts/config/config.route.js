//全局路由
CustomRoute={
	add:function (n) {
		var o=this.routes;
		this.routes=o.concat(n);
	},
	routes:[],
	url:{
		root_vendor_angular:'./vendors/angular/vendor/',
		root_vendor_angular_js:'./vendor/angular/js/',
		root_controller:'./scripts/controllers/',
		root_service:'./scripts/services/',
		root_scripts_view:'./scripts/views/',
		root_scripts:'./scripts/',
		root_view:'./views/',
		data:'./'
	},
	'jsVersion':'v1.0.0'
}
