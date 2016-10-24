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

	
var dragBox = {
	config: {
		dragele: null,
		drag: $('#drag'),
		box1: $('#box1'),
		box2: $('#box2'),
		distx: 0,//用于存放拖放元素相对于视口的初始位置与事件发生位置之间的差值
		disty: 0,
		oldposition: {}//用于保存拖放元素相对于视口的初始位置
	},
	
	//初始化拖拽元素的top值
	innerboxOriginalPosirion: function() {
		var innerbox1 = dragBox.config.box1.getElementsByTagName('div');
		var innerbox2 = dragBox.config.box2.getElementsByTagName('div');
		for(var i=0;i<innerbox1.length;i++) {
			innerbox1[i].style.top = i*70+'px';
		}
		for(var j=0;j<innerbox2.length;j++) {
			innerbox2[j].style.top = j*70+'px';
		}
	},
	
	//事件处理程序
    handle: function(event) {
		event = event || window.event;
		var target = event.target || event.srcElement;
		
		switch(event.type) {//判断事件类型，执行相应的代码
			case "mousedown": 
			if(target.className.indexOf('innerbox') > -1) {
				dragBox.config.dragele = target;
				dragBox.config.dragele.style.borderTop = 'solid black 1px';
				dragBox.config.dragele.style.borderLeft = 'solid black 1px';
				dragBox.config.dragele.style.borderRight = 'solid black 1px';
				dragBox.config.oldposition = getPosition(target);
				dragBox.config.distx = event.clientX -  dragBox.config.oldposition.x;
				dragBox.config.disty = event.clientY -  dragBox.config.oldposition.y;
				//alert(dragBox.config.distx);
				//console.log(dragBox.config.dragele.style.top);
			}
			break;
			
			case "mousemove": 
			if(dragBox.config.dragele!=null) {
				var left = parseInt(dragBox.config.dragele.style.left);
				var top = parseInt(dragBox.config.dragele.style.top);
				dragBox.config.dragele.style.left = (event.clientX - dragBox.config.distx - dragBox.config.oldposition.x) +'px';
				dragBox.config.dragele.style.top = (event.clientY - dragBox.config.disty - 130)+'px';//130等于header高度加section的margintop
				//alert(event.clientX);
				//console.log(dragBox.config.dragele.style.top);
				if(dragBox.config.dragele.parentNode.id.indexOf('box1') != -1) {
					if(left<-150||left>544||top<-69||top>420){
		                dragBox.config.dragele.innerHTML = '咦~我跑出去了，我要回去。';//超出范围添加提示信息
	                } else {
					    dragBox.config.dragele.innerHTML = '';//清空添加的提示信息
				    }
				}
	            if(dragBox.config.dragele.parentNode.id.indexOf('box2') != -1) {
		            if(left>150||left<-544||top<-69||top>420){
		                dragBox.config.dragele.innerHTML = '咦~我跑出去了，我要回去。';//超出范围添加提示信息
	                } else {
					    dragBox.config.dragele.innerHTML = '';//清空添加的提示信息
				    }
	            }
			}	
			break;
			
			case "mouseup": //添加判断条件，走到什么位置添加到另外的盒子中
			if(dragBox.config.dragele==null) return;
			var a = dragBox.config.dragele.cloneNode(true);
			if(parseInt(dragBox.config.dragele.style.left)>292||parseInt(dragBox.config.dragele.style.left)<-292){
			    if(dragBox.config.dragele.parentNode.id.indexOf('box1') != -1) {
		            dragBox.config.box2.appendChild(a);
	            }
	            if(dragBox.config.dragele.parentNode.id.indexOf('box2') != -1) {
		            dragBox.config.box1.appendChild(a);
	            }
			    var b = a.parentNode.getElementsByTagName('div').length-1;
			    a.style.top = b*70 + 'px';
			    a.style.left = '0px';
			    a.style.borderTop = '0';
			    a.style.borderLeft = '0';
			    a.style.borderRight = '0';
				a.innerHTML = '';//清空添加的提示信息
			    dragBox.config.dragele.parentNode.removeChild(dragBox.config.dragele);
			    dragBox.config.dragele = null;
			    dragBox.innerboxOriginalPosirion();			
		    } else {
				a = null;
				dragBox.config.dragele.innerHTML = '';//清空添加的提示信息
				dragBox.config.dragele.style.left = '0px';
				dragBox.config.dragele.style.borderTop = '0';
				dragBox.config.dragele.style.borderLeft = '0';
				dragBox.config.dragele.style.borderRight = '0';
				dragBox.config.dragele = null;
			    dragBox.innerboxOriginalPosirion();
			}

			break;
			
		}
	},
	
	//给文档添加事件
	enable: function() {
		$.on(document,'mousedown',dragBox.handle);
		$.on(document,'mousemove',dragBox.handle);
		$.on(document,'mouseup',dragBox.handle);
	}

}
addLoadEvent(dragBox.innerboxOriginalPosirion());
addLoadEvent(dragBox.enable());