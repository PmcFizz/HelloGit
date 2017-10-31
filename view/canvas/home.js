	(function(){
	const clientHeight=document.documentElement.scrollHeight;
	const clientWidth=document.documentElement.scrollWidth;
	const canvas=document.getElementById("mycan");
	canvas.setAttribute("width",clientWidth-10);
	canvas.setAttribute("height",clientHeight-10);
	const ctx=canvas.getContext("2d");
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
	const nameArr=["刻舟求剑","掩耳盗铃","农夫与蛇","我是傻逼","武松打虎","猴子爬树","手机","电脑","公交"];

	[].forEach.call(document.querySelectorAll(".muen_item"),(el)=>{
		el.addEventListener("click",(even)=>{
			var type=even.currentTarget.dataset.type;
			switch(type){
				case "changetheme":
					changeTheme();
					break;
				case "reset":
					reset();
					break;				
				case "saveimg":
					saveimg();
					break;
				case "changebg":
					changeBG();
					break;
			}
		})
	});

	//改变主题
	const changeTheme=()=>{
		i++;
		document.querySelector("#theme").innerText=nameArr[i];				
		i>parseInt(nameArr.length-1,10) ? i=0 : "";
	};

	//清空函数
	const reset=()=>{
		ctx.clearRect(0,0,clientWidth,clientHeight);
		ctx.fillStyle="yellowgreen";
		ctx.fillRect(0,0,clientWidth,clientHeight);

	};

	//保存图片函数
	const saveimg=()=>{
		var imgdata=mycan.toDataURL("png");
		const fixtype=(type)=>{
			type=type.toLocaleLowerCase().replace(/jpg/i,'jpeg');
			const r=type.match(/png|jpeg|bmp|gif/)[0];
			return 'image/'+r;
		}

		imgdata=imgdata.replace(fixtype("png"),'image/octet-stream');

		//将图片保存本地
		const saveFile=(data,filename)=>{
			const link=document.createElement("a");
			link.href=data;
			link.download=filename;
			const event=document.createEvent('MouseEvents');
			event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
			link.dispatchEvent(event);
		}
		const filename=nameArr[i]+'.png';
		saveFile(imgdata,filename);
	};

	//改变背景
	const changeBG=()=>{
		var randomColor='#'+Math.floor(Math.random()*0xffffff).toString(16);
		ctx.fillStyle=randomColor;
		ctx.fillRect(0,0,clientWidth,clientHeight);
	};
})();