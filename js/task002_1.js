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
//第一阶段，单行输入
function hobbyListener() {
	var arr = [], str;
	var hobby_text = $('#hobby').value.replace(/\s+/,'');
	var reg = /^\w+$|^[\u4e00-\u9fa5]+$/;//匹配单个爱好，英文或汉字
	if(reg.test(hobby_text)) {
		str = '您输入的兴趣爱好是：' + hobby_text;
	} else {
		if(hobby_text.indexOf(',')===-1&&hobby_text.indexOf('，')===-1) {
		   alert('请在不同爱好之间添加逗号。');
		   return;
	    } 
	
		if(hobby_text.indexOf(',')!==-1&&hobby_text.indexOf('，')!==-1) {
		   alert('请检查逗号格式是否一致。');
		   return;
	    }
	   if(hobby_text.indexOf(',')!==-1&&hobby_text.indexOf('，')===-1) {
		   arr = hobby_text.split(',');
	   }
		if(hobby_text.indexOf('，')!==-1&&hobby_text.indexOf(',')===-1) {
		   arr = hobby_text.split('，');
	   }
	   //数组去重：uniqArray(arr)
	   str = '您输入的兴趣爱好是：' + uniqArray(arr).join(' ');
	}
	$('#outputhobby').innerHTML = str;
}

function outPutHobby() {
	var butt = $('#hobbysubmit');
	$.on(butt,'click',hobbyListener);
}
addLoadEvent(outPutHobby);

//第二阶段
function intrestListener() {
	var reg = /[\w\u4e00-\u9fa5]+/gm;//只匹配字母、数字或汉字
	var arr = [], str;
	var intrest_text = $('#intrest').value;
	var matches;
	while((matches = reg.exec(intrest_text)) != null){  
		  arr.push(matches);
	}
	str = '您输入的兴趣爱好是：'  + uniqArray(arr).join(' ');
	$('#outputintrest').innerHTML = str;
}

function outPutIntrest() {
	var butt = $('#intrestbutt');
	$.on(butt,'click',intrestListener);
}
addLoadEvent(outPutIntrest);

//第三阶段
function fondListener() {
	var p = $('#errortips')
	p.innerHTML = '';
	var reg = /[\w\u4e00-\u9fa5]+/gm;//只匹配字母、数字或汉字
	var fond_text = $('#fond').value;
	var arr = [], str,matches;
	
	if(reg.test(fond_text) == false) {
		var txt1 = "请检查你输入的内容，确保为有效内容。"
		p.innerHTML = txt1;
		alert('1');
		return;
	} else {
		//alert(reg.lastIndex);
		reg.lastIndex = 0;//重置匹配的起始位置(很关键，在这卡了一个多小时才找到问题)
		while((matches = reg.exec(fond_text)) != null){  
		   arr.push(matches);
	    }
		
		if(arr.length > 10) {
			var txt2 = "您输入的兴趣爱好数目过多，请确保其数目不超过10个。";
			p.innerHTML = txt2;
			return;
		} else {
			var arr1 = uniqArray(arr);
			for(var i=0;i<arr1.length;i++) {
				str += "<label for='"+arr1[i]+"'>"+arr1[i]+"</label>"+"<input type='checkbox' name='"+arr1[i]+"' id='"+arr1[i]+"' />"+"\n";
			}
			var str1 = '您输入的兴趣爱好是：'  + str.substring(9,str.length);
			$('#outputfond').innerHTML = str1;
		}
	}	
	
	
}

function outPutFond() {
	var butt = $('#fondbutt');
	$.on(butt,'click',fondListener);
}
addLoadEvent(outPutFond);
