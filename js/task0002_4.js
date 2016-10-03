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

var searchBar = {
	arr: ['a','ab','animal','back','b','car','cat','black','cash'],
	searchbox: $('#searchbox'),
	displayop: $('#displayop'),
	matches: $('#matches'),
	searchframe: $('#searchframe'),
	index: 0,
	
	displayOptions: function() {
		
		
		searchBar.searchframe.onkeyup = function(event) {
			event = event || window.event;
			searchBar.matches.innerHTML = '';
			var txt = searchBar.searchframe.value;
			var num = txt.length;
			var resultarr = [];
			if(txt!='') {
				//匹配输入的文本
			   for(var i=0;i<searchBar.arr.length;i++) {
				   if(searchBar.arr[i].substring(0,num).toLowerCase()==txt.substring(0,num).toLowerCase()) {
					   resultarr[resultarr.length] = searchBar.arr[i];
					   searchBar.matches.style.display = "block";
				    }
			    }
				//输出匹配结果
                for(var j=0;j<resultarr.length;j++) {
				    var li = document.createElement('li');
				    var list = document.createTextNode(resultarr[j]);
				    li.appendChild(list);
				    searchBar.matches.appendChild(li);
			    }
				
				//给匹配结果添加单击事件和onmouseover事件
				var lis = searchBar.matches.getElementsByTagName('li');
			    for(var i=0;i<lis.length;i++) {
					
				    /*lis[i].onmouseover = function() {
						for(var m=0;m<lis.length;m++){
							lis[m].className = '';
						}
					    this.className = 'hover';
				    }*/
				    lis[i].onclick = function() {
					    searchBar.searchframe.value = this.firstChild.nodeValue;
						//全部归零
					    searchBar.matches.style.display = "none";
					    searchBar.matches.innerHTML = '';
						resultarr = [];
				    }
			    }
				//向下选择
				if(event.keyCode === 40){
					searchBar.index++;
					//alert(searchBar.index);
					if(searchBar.index<=lis.length) {
					    lis[searchBar.index-1].className = 'hover';
						//alert(lis[searchBar.index-1].className);
						
				    } else {
						searchBar.index = 0;
					}
				}
				//向上选择
				if(event.keyCode === 38){
					searchBar.index--;
					//alert(searchBar.index);
					if(searchBar.index<=lis.length&&searchBar.index>0) {
					    lis[searchBar.index-1].className = 'hover';
						//alert(lis[searchBar.index-1].className);
				    } else {
						searchBar.index = lis.length;
						lis[searchBar.index-1].className = 'hover';
					}
				}
				//enter确认选择
				if(event.keyCode === 13){
					if(searchBar.index>0) {
						searchBar.searchframe.value = lis[searchBar.index-1].firstChild.nodeValue;
						//全部归零
					    searchBar.matches.style.display = "none";
						searchBar.matches.innerHTML = '';
						searchBar.index=0;
						resultarr = [];
					} else {
						return;
					}
				}
				
		    } else {
				searchBar.matches.style.display = "none";
				return;
			}
		}
	},
	
	focunBlur: function() {//搜索框失去焦点时全部归零
		
		$.on(searchBar.searchframe,"blur",function(){
			//全部归零
			searchBar.matches.style.display = "none";
			searchBar.matches.innerHTML = '';
			searchBar.index=0;	
		});
	}
	
};

addLoadEvent(searchBar.displayOptions);
addLoadEvent(searchBar.focunBlur);
