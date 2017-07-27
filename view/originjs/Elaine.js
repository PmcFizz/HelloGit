//Elaine
(function(){
	var bookText="";
	var inter="";
	for(var i=0;i<100;i++){
		bookText=bookText+"\n"+i;
	}
	var outer=document.createElement("div");
	var bookContent=document.createElement("p");
	var outer_footer=document.createElement("div");
	var footer=document.createElement("div");

	outer.setAttribute("class","outer");
	outer.setAttribute("draggable",true);
	bookContent.innerText=bookText;
	outer_footer.style.position="relative";
	footer.setAttribute("class","footer");
	outer_footer.appendChild(footer);
	outer.appendChild(bookContent);
	outer.appendChild(outer_footer);
	document.body.appendChild(outer);

	outer.addEventListener("mouseover",function(){
		inter=setInterval(function(){
			outer.scrollTop+=5;
		},100)		
	});

	outer.addEventListener("mouseout",function () {
		clearInterval(inter);
	});

 	var originX=clientHeight=document.documentElement.clientHeight,
 		originY=clientWidth=document.documentElement.clientWidth;
 	var distanceX=distanceY=0;

 	outer.addEventListener("dragstart",function(e){
 		distanceX=distanceY=0;
 		distanceY=e.clientY-originY;
 		distanceX=e.clientX-originX;
 		console.log("distanceX"+distanceX);

 	});

 	outer.addEventListener("drag",function(even){
 		if(even.clientX===0 || even.clientY===0){
 			return;
 		}
 		originX=even.clientX-distanceX;
 		originY=even.clientY-distanceY;
 		outer.style.right=(clientWidth-originX)+"px";
 		outer.style.bottom=(clientHeight-originY)+"px";
 	});




})();