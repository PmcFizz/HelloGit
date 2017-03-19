//mingyuan

// $("li").click(function(){
// 	alert($(this).index());
// })

// var list=document.querySelectorAll("li");
// var len=list.length;
// var index=0;
// var retuIndex;
// for(var i=0;i<len;i++){
// 	list[i].onclick=function(){
// 		this.classList="active";
// 		// console.log(i);
// 		return function(k){
// 			console.log(k)
// 		}(i);
// 		// return function(now){
// 		// 	getIndex(now);
// 		// }(this);		
// 	}
// }

// function getIndex(init){	
// 	if(init.previousElementSibling!==null){
// 		index++;
// 		getIndex(init.previousElementSibling);
// 	}else{
// 		alert(index);
// 		index=0;
// 	}
// }

//edit javascript thread
// function LazyMen(str){
// 	console.log("Hello "+str);
// 	this.eat=eat;
// 	this.sleep=sleep;
// 	this.shopping=this.shoping;
// 	return this;
// };

// function eat(str){
// 	console.log("Eat "+str);
// 	return this;
// };

// function sleep(num){
// 	var slef=this;
// 	var waitFun=function(){
// 		console.log("wait up after ");	
// 		//return slef	
// 	};
// 	// waitFun();
// 	setTimeout(waitFun(),num)
// };

// function shopping(){
// 	console.log("shopping");
// 	return this;
// };

// LazyMen("Fizz").eat("Dinner").shopping().sleep(10);
// LazyMen("Fizz").sleep(10000);


// 二叉树
// 二分搜索法

// 栈 数组 集合 数据结构的特点  链


// var i=56;//need find in a big data;
// var index=1;
// function twofen(start,end){
// 	var mid=start;
// 	if(start===i){
// 		console.log("return start;");
// 		return start;
// 	}
// 	if(end===i){
// 		console.log("return end;");
// 		return end
// 	}
// 	if(start<i && end>i){
// 		mid=Math.floor((end-start)/2)+start;
// 		index++;
// 		if(mid>=i){
// 			twofen(start,mid);
// 		}else{
// 			twofen(mid,end);
// 		}
// 	}else{
// 		return -1;
// 	}
// }
// twofen(0,10000);

//我准备写一个二叉树 包括查找 添加 删除
//
// //二叉树的节点
// function Node(data,left,right){
//     this.data=data;
//     this.right=right;
//     this.left=left;
//     this.show=show;
// }
//
// function  show() {
//     return this.data;
// }
//
// //二叉树的实现类
// function BST(){
//     this.root=null;
//     this.insert=insert;
//     this.inOrder=inOrder;
// }
//
// //二叉树的插入
// function insert(data) {
//     var insertItem=new Node(data,null,null);
//     if(this.root==null){
//         this.root=insertItem;
//     }else{
//         var current=this.root;
//         var parent;
//         while(true){
//             parent=current;
//             if(data<current.data){
//                 current=current.left;
//                 if(current==null){
//                     parent.left=insertItem;
//                     break;
//                 }
//             }else{
//                 current=current.right;
//                 if(current==null){
//                     parent.right=insertItem;
//                     break;
//                 }
//             }
//         }
//     }
// }
//
// //二叉树的排序
// function inOrder(node) {
//     if(!(node==null)){
//         inOrder(node.left);
//         console.log(node.show()+"  ");
//         inOrder(node.right);
//     }
// }

//求一个固定数组的动态索引区间之和
// var str = '123456789123456789123456789123456789123456789123456789123456789123456789'
// var arr = str.split("");
// console.log(arr);
// var sumArr = [];
// var sum = 0;
// for (var i = 0; i < arr.length; i++) {
//     sum += parseInt(arr[i], 10);
//     sumArr.push(sum);
// }
// console.log(sumArr);
//
// function sumRang(i, j) {
//     var finSum = sumArr[j] - sumArr[i-1]
//     console.log(i + "-" + j + " 之和为 " + finSum);
//     return finSum
// }
// sumRang(10, 11);


