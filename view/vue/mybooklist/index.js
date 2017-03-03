var bookList=new Vue({
	el:"#example",
	data:{
		addreadybook:'',
		searchbookname:'',
		readyed:['解忧杂货店','嫌疑人X的献身','分身','恶意'],
		readying:[],
		willready:[]
	},
	methods:{
		removebook:function(obj){
			var i=this.readyed.indexOf(obj);
			if(i>-1){
				this.readyed.splice(i,1);
			}
		},
		addonebook:function(){
			if (this.addreadybook) {
				this.readyed.push(this.addreadybook);
				this.addreadybook="";
			}else{
				alert("请先填写要添加的书名")
			}		
		},
		searchbook:function(){
			if (this.searchbookname) {
				var i=this.readyed.indexOf(this.searchbookname);
				if(i>-1){
					alert("第"+(i+1)+"个是你要查询的数据");
					//TODO 需要高亮显示
					
				}else{
					console.log("没有搜索到你要查询的书籍:"+this.searchbookname);
				}
				this.searchbookname="";
			}
		}
	},
	filters:{

	},
	created:function(){
		console.log("已经出发created 函数")

	},
	watch:function(){

	}

})
