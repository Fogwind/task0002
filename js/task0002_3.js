function hiddenGithub() {
	      var html = document.documentElement;
		  var githublogo = document.getElementById("githublogo");
		  
		  if(html.clientWidth<1050) {
		    githublogo.style.display = "none";
		  } else {
		    githublogo.style.display = "block";
		  }
	   }
window.onresize=function() {hiddenGithub();};
//setTimeout(),第一个参数可以传入函数或函数名，不需要加引号
//图片轮播的关键是条件的判断和函数的递归调用。
//接下来思考怎么把这些代码转化的更通用一些。初步思路，把图片的个数、单个图片的宽度、left的值以及计数器的值联系起来。
//更进一步，添加图片序号，手动控制轮播方向以及是否继续轮播

/********第一种方法，思路是通过判断知道图片滑动了多长的距离，然后执行相应代码*******/
/*function picTransTool() {
	var gamecg = $('#gamecg');
	if(!gamecg.style.left) {
		gamecg.style.left = "0px";
	}
    var count = 0; //计数器，判断播放到哪一张图片
	var order = true;//判断是正序播放，还是倒序播放
    function picMove() {
		var left = parseInt(gamecg.style.left);
		
		if(order === true) {
	        //正序播放
            if(count === 0) {
		      count++;
		      setTimeout(picMove,2000);
		      return;
	        }
	        if(count === 1) {
		       function func1() {
		          if(left<=0&&left>-600) {
			          left=left+Math.ceil(-600/30);
				      gamecg.style.left = left+"px";
				      setTimeout(func1,10);
				      return;
		            }
			       if(left===-600){
				      count++;
			
				      setTimeout(picMove,2000);
				      return;
				  
			        }
		        }
			    func1();
				return;
	        }
	        if(count===2){
		        function func2() {
		            if(left<=-600&&left>-1200) {
			           left=left+Math.ceil(-600/30);
				       gamecg.style.left = left+"px";
				       setTimeout(func2,10);
				       return;
		            }
			        if(left===-1200){
				      count++;
				      setTimeout(picMove,2000);
				      return; 
			        }
		        }
                func2();
                return;			
		    }
		
	        if(count===3){
		        function func3() {
		           if(left<=-1200&&left>-1800) {
			           left=left+Math.ceil(-600/30);
				       gamecg.style.left = left+"px";
				       setTimeout(func3,10);
				       return;
		            }
			       if(left===-1800){
				       count++;
				       setTimeout(picMove,2000);
				       return;
				  
			        }
		        }
                func3();
                return;			
		    }		
	        if(count===4){
		        function func4() {
		            if(left<=-1800&&left>-2400) {
			            left=left+Math.ceil(-600/30);
				        gamecg.style.left = left+"px";
				        setTimeout(func4,10);
				        return;
		            }
			        if(left===-2400){
				        count=0;
				        order = false;
				        setTimeout(picMove,2000);
				        return;
			        }
		        }
                func4();
                return;			
		    }
			
		} else {	
		//倒序播放
            if(count===0){
			
		        if(left===-2400) {
			        function func5() {
				        if(left>=-2400&&left<-1800) {
					        left=left+Math.ceil(600/30);
					        gamecg.style.left = left+"px";
					        setTimeout(func5,10);
					        return;
				        }
				        if(left===-1800) {
					        count++;
					        setTimeout(picMove,2000);
					        return;
				        }
			        }
				    func5();
				    return;
		        }			
		    }
            if(count===1){
		        if(left===-1800) {
			        function func6() {
				        if(left>=-1800&&left<-1200) {
					        left=left+Math.ceil(600/30);
					        gamecg.style.left = left+"px";
					        setTimeout(func6,10);
					        return;
				        }
				        if(left===-1200) {
					        count++;
					        setTimeout(picMove,2000);
					        return;
				        }
			        }
				    func6();
				    return;
		        }			
		    }        		
            if(count===2){
		        if(left===-1200) {
			       function func7() {
				        if(left>=-1200&&left<-600) {
					        left=left+Math.ceil(600/30);
					        gamecg.style.left = left+"px";
					        setTimeout(func7,10);
					        return;
				        }
				        if(left===-600) {
					        count++;
					        setTimeout(picMove,2000);
					        return;
				        }
			        }
				    func7();
				   return;
		        }			
		    } 
            if(count===3){
		        if(left===-600) {
			        function func8() {
				        if(left>=-600&&left<0) {
					        left=left+Math.ceil(600/30);
					        gamecg.style.left = left+"px";
					        setTimeout(func8,10);
					        return;
				        }
				        if(left===0) {
					        count=0;
					        order = true;
					        //setTimeout(picMove,2000);
					        picMove();
					        return;
				        }
			        }
				    func8();
				    return;
		        }			
		    }
	    }		
    }
	picMove();
	return;
	
}
addLoadEvent(picTransTool);
*/
//第二种方法，通过规定每次滑动的时间，控制图片的显示
//将以下代码封装为一个对象
var myTool = {
config:{
	gamecg: $('#gamecg'),
	imgs: $('#gamecg').getElementsByTagName('img'),
	imgbox: $('.imgbox'),
	points: $('#cyclepoint').getElementsByTagName('a'),
	t: 300,
	interval: 10,
	flag: false,//用于判断该次图片滑动是否完成
	staytime: 3000,
	imgwidth: 600
},
picMove: function(distance) {
	if(myTool.config.gamecg.timer) {
		clearInterval(myTool.config.gamecg.timer);
	}
	//var t = 300;//这一句是关键，规定一张图片滑动的时间，从而判断是否滑动到相应位置
	//var interval = 10;
    var starttime = new Date().getTime();//或者new Date().valueOf()
	
	//播放（前进）到放在最后的第一张图片时返回第一张
	if(parseInt(myTool.config.gamecg.style.left)===(-myTool.config.imgs.length+1)*myTool.config.imgwidth) {
		myTool.config.gamecg.style.left="-"+myTool.config.imgwidth+"px";
	}
	//后退到放在最前面的最后一张图片时，返回真正的最后一张
    if(myTool.config.gamecg.style.left==="0px") {
		myTool.config.gamecg.style.left="-"+(myTool.config.imgs.length-2)*myTool.config.imgwidth+"px";
	}

	var newleft = parseInt(myTool.config.gamecg.style.left) + (-distance);
	
	//通过for循环遍历小圆点，添加或删除其class属性值，使其跟随图片滑动而改变颜色
	for(var j=0;j<myTool.config.points.length;j++) {
		 myTool.config.points[j].className = '';
		 //console.log(points[j].index);
         if(newleft===myTool.config.points[j].index*(-myTool.config.imgwidth)||newleft===myTool.config.points[j].index*(myTool.config.imgwidth)) {
			 myTool.config.points[j].className = 'hover';
		 }
		 if(newleft===-(myTool.config.points.length+1)*myTool.config.imgwidth) {
			 myTool.config.points[0].className = 'hover';
		 }
		 if(newleft===0) {
			 myTool.config.points[myTool.config.points.length-1].className = 'hover';
		 }
	}
	myTool.config.gamecg.timer = setInterval(function(){
	    myTool.config.flag = true;
		var nowtime = new Date().getTime();
		var d = nowtime - starttime;//获取两次间歇调用的时间间隔
		var left = parseInt(myTool.config.gamecg.style.left);
		

		var speed = Math.ceil(-distance/(myTool.config.t/myTool.config.interval));
		if(d<myTool.config.t) {
			left=left+speed;
			myTool.config.gamecg.style.left = left+'px';
		} else {
			
			if(d>=myTool.config.t){
				d=myTool.config.t;
			}
			if(d==myTool.config.t){
			   myTool.config.gamecg.style.left = newleft+'px';
			   myTool.config.flag=false;
			   clearInterval(myTool.config.gamecg.timer);
			}
		}  
	},myTool.config.interval);
	
	
},

//自动循环播放,通过传入参数的正负号控制滚动方向
picTransTool: function(imgwidth) {
	//var gamecg = $('#gamecg');
	if(!myTool.config.gamecg.style.left) {
		myTool.config.gamecg.style.left = "-"+myTool.config.imgwidth+"px";
	}
	//给图片添加序号,没有用到
	for(var h=0;h<myTool.config.imgs.length;h++) {
		if(h==0){
			myTool.config.imgs[h].index = myTool.config.imgs.length-2;
		}
		if(h==myTool.config.imgs.length-1){
			myTool.config.imgs[h].index = 1;
		}
		myTool.config.imgs[h].index = h;
	}
	//获取小圆点，并添加序号
	//var points = $('#cyclepoint').getElementsByTagName('a');
	for(var i=0;i<myTool.config.points.length;i++) {
		myTool.config.points[i].index = i+1;
	}
	
	//var imgbox = $('.imgbox');
	if(myTool.config.imgbox.timer) {
		clearInterval(myTool.config.imgbox.timer);
	}
	//自动播放开始
	var rpeeat = "myTool.picMove(" + imgwidth + ")";
	myTool.config.imgbox.timer = setInterval(rpeeat,myTool.config.staytime);
	
	//当鼠标移到轮播图上时停止自动播放，移出时继续自动
	myTool.config.imgbox.onmouseover = function() {
		clearInterval(myTool.config.imgbox.timer);
	}
	myTool.config.imgbox.onmouseout = function() {
		myTool.picTransTool(imgwidth);
	}
},
//点击前进切换,传入正的图片宽度
clickNext: function() {
	
	if(!myTool.config.gamecg.style.left) {
		myTool.config.gamecg.style.left = "-"+myTool.config.imgwidth+"px";
	}
	var anext = $('#next');
	anext.onclick = function() {
 
        if(myTool.config.flag) {//当图片没有滑到正确位置时，点击按钮无效
			return;
		}
    
		myTool.picMove(myTool.config.imgwidth);
	  
    }

    },
//点击后退切换，传入负的图片宽度
clickPre: function() {
	
	if(!myTool.config.gamecg.style.left) {
		myTool.config.gamecg.style.left = "-"+myTool.config.imgwidth+"px";
	}
	var anext = $('#pre');
	anext.onclick = function() {
 
        if(myTool.config.flag) {
			return;
		}
    
		myTool.picMove(-myTool.config.imgwidth);
	  
    }

    },
//给小圆点添加点击事件
pointClick: function() {
	for(var n=0;n<myTool.config.points.length;n++) {
		myTool.config.points[n].onclick = function() {
			//根据点击小圆点的序号，计算图片应该滑动的距离，并传入picMove函数
				if(this.className=='hover'){
					return;
				}
				if(myTool.config.gamecg.timer) {
		            clearInterval(myTool.config.gamecg.timer);
	            }
				if(myTool.config.flag) {
			       return;
		        }

			    var num = this.index;
				//alert(num);
				var nowleft = parseInt(myTool.config.gamecg.style.left);
				var aimleft = -num*myTool.config.imgwidth;
				var dif = aimleft - nowleft;
				myTool.picMove(-dif);
				
				
		}
		
	}
}
}

function positivePlay() {
	var positivebutt = $('#left');
	positivebutt.onclick = function() {
		if(myTool.config.imgbox.timer) {
		   clearInterval(myTool.config.imgbox.timer);
	    }
		myTool.picTransTool(600);
	}
	
}

function negativePlay() {
	var negativebutt = $('#right');
	negativebutt.onclick = function() {
		if(myTool.config.imgbox.timer) {
		   clearInterval(myTool.config.imgbox.timer);
	    }
		myTool.picTransTool(-600);
	}
	
}

function stopPlay() {
	var stopbutt = $('#stop');
	stopbutt.onclick = function() {
		
		clearInterval(myTool.config.imgbox.timer);
	   
	}
	
}


addLoadEvent(myTool.picTransTool(600));
addLoadEvent(myTool.clickNext);
addLoadEvent(myTool.clickPre);
addLoadEvent(myTool.pointClick);
addLoadEvent(positivePlay);
addLoadEvent(negativePlay);
addLoadEvent(stopPlay);
