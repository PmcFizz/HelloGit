;(function(){
	var apiURL="https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha="

	var demo=new Vue({
		el:"#demo",
		data:{
			branches:['master','dev'],
			currentBranch:'master',
			commits:null
		},
		created:function(){
			this.fetchData()
		},
		watch:{
			currentBranch:'fetchData'
		},
		filters:{
			truncate:function(v){
				var newline=v.indexOf('\n');
				return newline>0 ?v.slice(0,newline) : v
			},
			formatData:function(v){
				return v.replace(/T|Z/g,' ')
			}
		}
	})

})();