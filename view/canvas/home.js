	(function(){
	var clientHeight=document.documentElement.scrollHeight;
	var clientWidth=document.documentElement.scrollWidth;
	var canvas=document.getElementById("mycan");
	canvas.setAttribute("width",clientWidth-10);
	canvas.setAttribute("height",clientHeight-10);
	var ctx=canvas.getContext("2d");
	ctx.fillStyle="yellowgreen";
	ctx.fillRect(0,0,clientWidth,clientHeight);
	ctx.lineWidth=10;
	ctx.strokeStyle='black';
	ctx.lineCap='round';
	ctx.lineJoin='round';
	ctx.shadowBlur=1;
	ctx.shadowColor='black';
 
	const point={};

	const paint=(signal)=>{
		switch(signal){
			case 1:
				ctx.beginPath();
				ctx.moveTo(point.x,point.y);
			case 2:
				ctx.lineTo(point.x,point.y);
				ctx.stroke();
				break;
		}
	};

	const isMobile=/(phone|pad|pod|iPhone|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fenenc|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent);

	let pressed=false;
	const create=signal=>(e)=>{
		if(signal===1){
			pressed=true;
		}
		if(signal===1 || pressed){
			e=isMobile ?e.touches[0]:e;
			point.x=e.clientX-left+0.5;
			point.y=e.clientY-top+0.5;
			paint(signal);
		}
	}

	const {left ,top} =canvas.getBoundingClientRect();
	const start=create(1);
	const move=create(2);

	const requestAnimationFrame=window.requestAnimationFrame;
	const optimizedMove=requestAnimationFrame ? (e) =>{
		requestAnimationFrame(()=>{
			move(e);
		});
	}:move;

	if(isMobile){
		mycan.addEventListener('touchstart',start);
		mycan.addEventListener('touchmove',optimizedMove);
	}else{
		mycan.addEventListener('mousedown',start);
		mycan.addEventListener('mousemove',optimizedMove);
		['mouseup','mouseleave'].forEach((event)=>{
			mycan.addEventListener(event,()=>{
				pressed=false;
			});
		});
	}
	let i=0;
	const nameArr=["刻舟求剑","掩耳盗铃","农夫与蛇","我是傻逼"];
	document.querySelector(".name").onclick=(ev)=>{
		document.querySelector(".name").innerText=nameArr[i];		
		i++;
		i>3 ? i=0 : "";
	} 



})();