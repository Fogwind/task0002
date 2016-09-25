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
	   str = '您输入的兴趣爱好是：' + arr.join(' ');
	}
	$('#outputhobby').innerHTML = str;
}

function outPutHobby() {
	var butt = $('#hobbysubmit');
	$.on(butt,'click',hobbyListener);
}
addLoadEvent(outPutHobby);
