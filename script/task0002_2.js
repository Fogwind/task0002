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

function date() {
	var reg = /^\d{4}\-\d{2}\-\d{2}$/;
	var date1_text = $('#date').value;
	if(reg.test(date1_text) == false) {
		alert("请填写正确的日期格式。");
		return;
	}
	var arr = date1_text.split('-');
	var date1 = new Date(arr[0],arr[1]-1,arr[2]).valueOf();
	var date2 = new Date().valueOf();
	var t = date1 - date2;
	//关键是Math对象的floor（）方法
    var d = Math.floor(t/1000/60/60/24);
	var h = Math.floor((t-d*24*60*60*1000)/1000/60/60);
	var m = Math.floor((t-d*24*60*60*1000-h*60*60*1000)/1000/60);
	var s = Math.floor((t-d*24*60*60*1000-h*60*60*1000-m*60*1000)/1000);
	var str = "距离"+arr[0]+"年"+arr[1]+"月"+arr[2]+"日还有"+d+"天"+h+"小时"+m+"分钟"+s+"秒";
	$('#outputdate').innerHTML = str;
	if(d==0&&h==0&&m==0&&s==0){
	   return;
	} else {
		timecount = setTimeout('date()',1000);//没有设置超时时间，还是间隔1秒。
	}
}
function outPutDate() {
	var butt = $('#datesubmit');
	$.on(butt,'click',date);
}
addLoadEvent(outPutDate);
