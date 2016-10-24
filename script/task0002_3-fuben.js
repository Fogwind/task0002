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
function picTransTool() {
	var gamecg = $('#gamecg');
	if(!gamecg.style.left) {
		gamecg.style.left = "0px";
	}
	

    var count = 0; 
    function picMove() {
	   var left = parseInt(gamecg.style.left);
	   //正序播放
       if(count === 0) {
		   //if(left===0) {
		      count++;
		      setTimeout(picMove,2000);
		      return;
		   //}
		   
	   }
	   if(count === 1) {
		   //if(left===0) {
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
			//}
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
				  count++;
				  setTimeout(picMove,2000);
				  return;
			    }
		    }
            func4();
            return;			
		}
		//倒序播放
        if(count===5){
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
        if(count===6){
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
        if(count===7){
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
        if(count===8){
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
	picMove();
	return;
	
}

addLoadEvent(picTransTool);