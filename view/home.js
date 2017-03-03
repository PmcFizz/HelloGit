;(function(){
	
	var sourceObj={
		bootstrapmincss:'<link href="${applicationScope.staticFiles}/manager/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">',
		fontawesomemincss:'<link href="http://cdn.bootcss.com/font-awesome/4.5.0/css/font-awesome.min.css?v=4.5.0" rel="stylesheet">',
		dataTablesbootstrapcss:'<link href="${applicationScope.staticFiles}/manager/css/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet">',
		animatemincss:'<link href="${applicationScope.staticFiles}/manager/css/animate.min.css?v=3.4.0" rel="stylesheet">',
		stylemincss:'<link href="${applicationScope.staticFiles}/manager/css/style.min.css?v=1.1.0" rel="stylesheet">',
		sweetalertcss:'<link href="${applicationScope.staticFiles}/manager/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">',

		jquery211minjs:'<script src="${applicationScope.staticFiles}/manager/js/jquery-2.1.1.min.js"></script>',
		sweetalertminjs:'<script src="${applicationScope.staticFiles}/manager/js/plugins/sweetalert/sweetalert.min.js"></script>',
		bootstrapminjs:'<script src="${applicationScope.staticFiles}/manager/js/bootstrap.min.js"></script>',
		commonjs:'<script src="${applicationScope.staticFiles}/manager/js/common.js"></script>',
		jquerydataTablejs:'<script src="${applicationScope.staticFiles}/manager/js/plugins/dataTables/jquery.dataTables.js"></script>',
		dataTablesbootstrapjs:'<script src="${applicationScope.staticFiles}/manager/js/plugins/dataTables/dataTables.bootstrap.js"></script>',
		searchform:"true",

		laydate:'<script src="${applicationScope.staticFiles}/manager/js/plugins/layer/laydate/laydate.js"></script>',
		outlink:{'layerminjs':'<script src="${applicationScope.staticFiles}/manager/js/plugins/layer/layer.min.js"></script>',
				 'contabsminjs':'<script src="${applicationScope.staticFiles}/manager/js/contabs.min.js"></script>'},
		
		icheck:{'icheckcss':'<link href="${applicationScope.staticFiles}/manager/css/plugins/iCheck/flat/red.css" rel="stylesheet">',
		        'icheckjs':'<script src="${applicationScope.staticFiles}/manager/css/plugins/iCheck/icheck.min.js"></script>'},

		model:"false",
		};

		$("#createcodebtn").click(createCode);

		function createCode(){
			var $checkmustList= $("input[name=must]:checked");
			var $checkoptionList=$("input[name=option]:checked");

			var mustList={},optionList={};
	var mLen=$checkmustList.length;
	var oLen=$checkoptionList.length;
	var jspContent=[],jsContent=[];
	if(mLen>0){
		for(var i=0;i<mLen;i++){
			mustList[$checkmustList[i].value]=true;
		}
	}
	if(oLen>0){
		for(var j=0;j<oLen;j++){
			optionList[$checkoptionList[j].value]=true;
		}
	}
var space="                ";
jspContent.push('<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>');
jspContent.push('<%');
jspContent.push('String path = request.getContextPath();');
jspContent.push('String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";');
jspContent.push('%>');
jspContent.push('<!--已发布文章列表  Fizz-->');
jspContent.push('<!DOCTYPE html>');
jspContent.push('<html>');
jspContent.push('');
jspContent.push('	<head>');
jspContent.push('		<meta charset="utf-8">');
jspContent.push('		<meta name="viewport" content="width=device-width, initial-scale=1.0">');
jspContent.push('		<meta name="renderer" content="webkit">');
jspContent.push('		<meta name="keywords" content="新农宝后台管理系统">');
jspContent.push(mustList.bootstrapmincss ? space+sourceObj.bootstrapmincss:"");
jspContent.push(mustList.fontawesomemincss ?  space+sourceObj.fontawesomemincss:"");
jspContent.push(mustList.dataTablesbootstrapcss ? space+sourceObj.dataTablesbootstrapcss:"");
jspContent.push(mustList.animatemincss ?  space+sourceObj.animatemincss:"");
jspContent.push(mustList.stylemincss ?  space+sourceObj.stylemincss:"");
jspContent.push(mustList.sweetalertcss ? space+sourceObj.sweetalertcss:"");
jspContent.push(optionList.icheck ? space+sourceObj.icheck.icheckcss :"");
jspContent.push('		<title>已发布文章列表</title>');
jspContent.push('	</head>');
jspContent.push('');
jspContent.push('	<body basepath="<%=basePath%>">');
jspContent.push('		<div class="wrapper wrapper-content animated fadeInRight">');
jspContent.push('			<div class="row">');
jspContent.push('				<div class="col-sm-12">');
jspContent.push('					<div class="ibox float-e-margins">');
jspContent.push('						<div class="ibox-title">');
jspContent.push('							<h5>已发布文章列表</h5>');
jspContent.push('						</div>');
jspContent.push('						<div class="ibox-content">');
jspContent.push('							<form class="form-horizontal m-t">');
jspcontent.push('								<input type="text" class="form-control input-br15 w15 m-l-sm inp-rounded keyseach" id="keywords" placeholder="关键字" />');
jspContent.push('								<input type="text" class="form-control input-br15 w15 m-l-sm inp-rounded keyseach" id="startdate" placeholder="发布日期(开始)" />');
jspContent.push('								<input type="text" class="form-control input-br15 w15 m-l-sm inp-rounded keyseach" id="enddate" placeholder="发布日期(结束)" />');
jspContent.push('								<select class="form-control m-b input-br15  w15 m-l-sm m-r-sm"  id="newstype" >');
jspContent.push('                                    <option value="">文章类型</option>');
jspContent.push('									<option value="1">企业动态</option>');
jspContent.push('									<option value="2">外部动态</option>');
jspContent.push('								</select>');
jspContent.push('								<button class="btn btn-danger btn-circle btn-outline m-l" type="button" id="seachbtn"  style="border:1px solid #ccc; float:left;">');
jspContent.push('                                 	<i class="fa fa-search"></i>');
jspContent.push('                                </button>');
jspContent.push('								<a class="btn btn-success btn-rounded J_menu m-l" href="<%=basePath %>microwebsite/tocreatenews.do" title="发布文章" id="createbtn">发布文章</a>');
jspContent.push('							</form>');
jspContent.push('							<br>');
jspContent.push('							<table class="table table-bordered table-hover definewidth m10 dataTables-example" width="100%" id="datatable">');
jspContent.push('								<thead>');
jspContent.push('									<tr>');
jspContent.push('										<th width="20%;">第一列</th>');
jspContent.push('										<th width="20%;">第二列/th>');
jspContent.push('										<th width="10%;">第三列</th>');
jspContent.push('										<th width="10%;">第四列</th>');
jspContent.push('										<th width="10%;">第五列</th>');
jspContent.push('										<th width="20%;">第六列</th>');
jspContent.push('									</tr>');
jspContent.push('								</thead>');
jspContent.push('								<tbody id="datalist">');
jspContent.push('									<!-- 列表内容 -->');
jspContent.push('								</tbody>');
jspContent.push('							</table>');
jspContent.push('						</div>');
jspContent.push('					</div>');
jspContent.push('				</div>');
jspContent.push('			</div>');
jspContent.push('		</div>');
jspContent.push('		');
jspContent.push(mustList.jquery211minjs ? space+sourceObj.jquery211minjs:"");
jspContent.push(mustList.sweetalertminjs ? space+sourceObj.sweetalertminjs:"");
jspContent.push(mustList.bootstrapminjs ? space+sourceObj.bootstrapminjs:"");
jspContent.push(mustList.commonjs ? space+sourceObj.commonjs:"");
jspContent.push(mustList.jquerydataTablejs ? space+sourceObj.jquerydataTablejs:"");
jspContent.push(mustList.dataTablesbootstrapjs ? space+sourceObj.dataTablesbootstrapjs:"");
jspContent.push(optionList.laydate ? space+sourceObj.laydate:"");
jspContent.push(optionList.outlink ? space+sourceObj.outlink.layerminjs +"\n"+sourceObj.outlink.contabsminjs:"");
jspContent.push(optionList.icheck ? space+sourceObj.icheck.icheckjs:"");
jspContent.push(space+'<script src="${applicationScope.staticFiles}/manager/feature/news-list.js?v=${applicationScope.systemVersion}"></script>');
jspContent.push('');
jspContent.push('	</body>');
jspContent.push('');
jspContent.push('</html>');
$("#jspcontent").val(jspContent.join('\n'));


//列表页 Fizz
;(function() {
	var basePath = common.getRootPath();

	//使用dataTable分页获取数据
	function getDataByPage() {
		var dataTableConfig = common.getDataTableConfig(basePath);
		dataTableConfig.ajax = {
			//type: "post",
			url: basePath + "datatable.json",
			dataType: "json",
			data: function(d) {
				var searchField = getSearchField();
				for(var k in searchField) {
					d[k] = searchField[k]
				}
			}
		};
		dataTableConfig.initComplete="";
		dataTableConfig.columns = [{
				"data": "id"
			}, {
				"data": "id"
			}, {
				"data": "id"
			}, {
				"data": "id"
			}, {
				"data": "id",
				"fnCreatedCell": function(nTd, sData, oData) {
					$(nTd).html(sData);
				}
			}, {
				"data": "id",
				"fnCreatedCell": function(nTd, sData, oData) {
					var btn = '<a class="btn btn-success J_menu" href="' + basePath + 'microwebsite/toeditenews.do?newsid=' + sData + '&from=online" title="修改文章">修改</a>';
					btn += '<a type="button" class="btn btn-success m-l J_menuItem" title="文章详情"  data-id="' + sData + '" href="' + basePath + 'microwebsite/tolooknews.do?id=' + sData + '">查看</a>';
					btn += '<button type="button" class="btn btn-danger J_delnews m-l" data-id="' + sData + '">删除</button>';
					$(nTd).html(btn);
				}
			}];
		$("#datatable").dataTable(dataTableConfig);
	};

	//TODO 获取搜索条件
	function getSearchField() {
		var obj = {};
		obj.keywords=$("#keywords").val();
		obj.dateStart = $("#startdate").val().trim();
		obj.dateEnd = $("#enddate").val().trim();
		obj.articleType = $("#newstype").val().trim();
		return obj;
	}

	//刷新列表
	function reloadData() {
		$("#datatable").DataTable().page('first').draw(false);
	};

	//注入事件
	function initEven() {
		$(".keyseach").keypress(keySearch);
		$("#seachbtn").click(reloadData);
		$(document).on("click", ".J_menu", n);		
		initDateplugin();
	};

	//日期选择控件
	function initDateplugin() {
		//时间控件初始化
		var start = {
			elem: "#startdate",
			format: "YYYY-MM-DD hh:mm:ss",
			min: "2014-01-01 23:59:59",
			max: laydate.now(),
			istime: true,
			istoday: false,
			choose: function(a) {
				end.min = a;
				end.start = a
			}
		};
		var end = {
			elem: "#enddate",
			format: "YYYY-MM-DD 23:59:59",
			min: "2014-01-01 23:59:59",
			max: laydate.now(),
			istime: true,
			istoday: false,
			choose: function(a) {
				start.max = a
			}
		};
		laydate(start);
		laydate(end);
	}

	//使用Enter键搜索
	function keySearch(evenObj) {
		if(evenObj.keyCode == 13) {
			reloadData();
		}
	};

	//页面准备好执行函数
	$(document).ready(function() {
		initEven();
		getDataByPage();
	});
})();

jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');
jsContent.push('');


}
	




	
})();