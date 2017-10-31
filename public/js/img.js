(function(){
	var imgArr=document.querySelectorAll("img");
	var fixDiv=document.createElement("div");
	var pHtml=[];
	var index=0;
	fixDiv.setAttribute("id","fix_img_outerdiv");	
	pHtml.push('<div id="fix_wrap_div">');
	pHtml.push('	<span class="btn left"></span>');
	pHtml.push('	<img src="https://avatars2.githubusercontent.com/u/13403284?v=4&s=460" height="100%" width="100%">');
	pHtml.push('	<span class="btn right"></span>');
	pHtml.push('</div>');
	 
	fixDiv.innerHTML=pHtml.join("");
	document.body.appendChild(fixDiv);

	document.querySelector("#fix_wrap_div img").setAttribute("src",imgUrlArr[index].attribute("src"));


})();