// ==UserScript==
// @name         Pivot_menu
// @namespace    https://pmcfizz.github.io/
// @version      0.1
// @description  Allow add magic menu to some website
// @author       Pmc
// @match        *://*.net/*
// @match        *://*.com/*
// @match        *://*.dev/*
// @match        *://*.cn/*
// @match        *://*.org/*
// @match        http://localhost:3000/

// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    // Your code here...
    // @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
    var drawColor=false;
    var opacity=false;
    includeOutStyle();
    includeMyStyle();
    createRotateDiv();

    //引入外部样式文件
    function includeOutStyle(){
        var linkEle=document.createElement("link");
        linkEle.type="text/css";
        linkEle.rel="stylesheet";
        linkEle.href="https://apps.bdimg.com/libs/animate.css/3.1.0/animate.min.css";
        window.top.document.head.appendChild(linkEle);
    }

    //引入自己的样式文件
    function includeMyStyle(){
        var style=document.createElement("style");
        var styleArr=[];
        style.type="text/css";
        styleArr.push('#myCanvas{position:fixed;z-index:999999;height:80px;width:80px;border-radius:50%;bottom:20px;right:20px;background-color:#000033;}');
        styleArr.push('#myCanvas:hover{cursor:move}');
        styleArr.push(".bigwall{position:fixed;z-index:999998;height:400px;width:400px;bottom:-200px;right:-200px;border-radius:50%;display:none}");
        style.innerHTML=styleArr.join('');
        window.top.document.head.appendChild(style);
    }
    //设置旋转div
    function createRotateDiv(){
        var circleCan=document.createElement("canvas");
        var deg=0;
        var interval;
        circleCan.id="myCanvas";
        circleCan.setAttribute("height",80);
        circleCan.setAttribute("width",80);
        circleCan.setAttribute("draggable",true);
        window.top.document.body.appendChild(circleCan);
        var bigwall=document.createElement("div");
        bigwall.setAttribute("class","bigwall animated rotateInDownRight");
        window.top.document.body.appendChild(bigwall);
        outerShow();
        function outerShow(){
            createCanvas();
            setInterval(function(){
                circleCan.style.transform="rotate("+deg+"deg)";
                if(deg==360){
                    deg=deg-360;
                }
                deg+=5;
            },100);
        }

        circleCan.addEventListener("mouseover",function(){
            bigwall.style.backgroundColor=handleColor();
            bigwall.style.display="block";
            if(!drawColor){
                drawColor=true;
                createCanvas();
            }

            //设置wrapDiv 旋转
            interval=setInterval(function(){
                circleCan.style.transform="rotate("+deg+"deg)";
                if(deg==360){
                    deg=deg-360;
                }
                deg+=5;
            },100);
        },false);

        circleCan.addEventListener("click",function(){
            if(opacity){
                circleCan.style.opacity=0.1;
            }else{
                circleCan.style.opacity=1;
            }
            opacity=!opacity;
        });
        circleCan.addEventListener("mouseout",function(){
            bigwall.style.display="none";
            clearInterval(interval);
        },false);
        
        var clientHeight=document.documentElement.clientHeight,
            clientWidth=document.documentElement.clientWidth;
        var originX=clientWidth-20,originY=clientHeight-20;
		var distanceY=0,distanceX=0;

        circleCan.addEventListener("dragstart",function(e){
            distanceY=e.clientY-originY;
            distanceX=e.clientX-originX;
        });

        circleCan.addEventListener("drag",function(even){
            if (even.clientX===0 || even.clientY===0) {
                return;
            }
            originX=even.clientX-distanceX;
            originY=even.clientY-distanceY;
            circleCan.style.right=(clientWidth-originX)+"px";
            circleCan.style.bottom=(clientHeight-originY)+"px";
        });
    }

    CanvasRenderingContext2D.prototype.sector=function(x,y,r,sDeg,eDeg){
        this.save();
        this.translate(x,y);
        this.beginPath();
        this.arc(0,0,r,sDeg*Math.PI/180,eDeg*Math.PI/180);
        this.save();
        this.rotate(sDeg*Math.PI/180);
        this.moveTo(r,0);
        this.lineTo(0,0);
        this.restore();
        this.rotate(eDeg*Math.PI/180);
        this.lineTo(r,0);
        this.restore();
        return this;
    };

    //创建扇形Canvas区域
    function createCanvas(){
        var mycan=document.getElementById("myCanvas");
        var ctx=mycan.getContext("2d");
        var i=1;
        var drawInter=setInterval(function(){
            drawLine();
        },100);

        function drawLine(){
            if(i>=13){
                clearInterval(drawInter);
                return;
            }
            ctx.sector(40,40,40,45*i,45*(i+1)).stroke();
            var colorValue=handleColor(i);
            ctx.fillStyle=colorValue;
            ctx.fill();
            i++;
        }
    }

    //处理颜色
    function handleColor(i){
        var colorValue="";
        return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);  //随机生成16位颜色值
   }

})();