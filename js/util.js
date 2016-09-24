
function addLoadEvent(func){
	var oldLoad = window.onload;
	if(typeof oldLoad !== "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldLoad();
			func();
		}
	}
	
}
/********************************数据类型及语言基础***********************************/
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(arr) === "[object Function]";
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    if(typeof src === 'number' || typeof src === 'string' || typeof src === 'boolean' || typeof src === 'undefined' || src === null) {
		return src;
	} else if(Object.prototype.toString.call(src) === '[object Object]') {
		var obj = {};
		for (var property in src) {
			var a = src[property];
			if(Object.prototype.toString.call(a) === '[object Object]'){
				obj[property] = arguments.callee(a);//obj[property] = cloneObject(a);
			} else if(Object.prototype.toString.call(a) === '[object Array]'){
				obj[property] = arguments.callee(a);//obj[property] = cloneObject(a);
			} else {
				obj[property] = src[property];
			}
		}
		return obj;
	} else if(Object.prototype.toString.call(src) === '[object Array]') {
		var arr = [];
		for(var i = 0;i<src.length;i++) {
			var b = src[i];
			if(Object.prototype.toString.call(b) === '[object Array]' || Object.prototype.toString.call(a) === '[object Object]') {
				arr[i] = arguments.callee(b);//arr[i] = cloneObject(b);
			} else {
				arr[i] = b;
			}
		}
		return arr;
	} else {
		return src;
	}
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
	for(var i=0;i<arr.length;i++) {
		var b = arr[i];
		for(var j=0;j<arr.length;j++) {
			if(b === arr[j] && i!==j) {
				arr.splice(j,1);
			}
		}
	}
	return arr;
}

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
	var arr = str.split('');
    for(var i=0;i<str.length;i++) {
	    if(arr[0] === ' '|| arr[0] === '	') {
		    arr.splice(0,1);
		} else{
		    break;
		}
	}
	for(var j=0;j<str.length;j++) {
	    if(arr[arr.length-1] === ' '|| arr[arr.length-1] === '	') {
		    arr.splice(arr.length-1,1);
		} else{
		    break;
		}
	}
	str = arr.join('');
	return str;
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.match(/\S.*\S/)[0];
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index

function each(arr, fn) {
    for(var i=0;i<arr.length;i++) {
		fn(arr[i],i);
	}
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var count = 0;
	var arr = [];
	for(var property in obj){
		arr[arr.length] = property;
		count++;
	}
	return arr.length;//return count;
}

// 判断是否为邮箱地址 不完美
function isEmail(emailStr) {
    var reg = /\w+@(?:[a-z]+\.?|[0-9]+\.?)[a-z]{1,}\.{1}[a-z]+/i;
	return reg.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var reg = /^1(?:3[0-9]|5[0-9]|8[0-9])\d{8}$/;
	return reg.test(phone);
}

/********************************DOM操作***********************************/
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(!element.getAttribute('class')){
		element.setAttribute('class',newClassName);
	} else {
		var oldClassName = element.getAttribute('class');
		element.setAttribute('class',oldClassName+' '+newClassName);
	}
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if(!element.getAttribute('class')){
		return;
	} else {
		var classname = element.getAttribute('class');
		if(classname.indexOf(oldClassName) !== -1) {
			var newClassName = classname.replace(oldClassName,'');
			element.setAttribute('class',newClassName);
		} else {
			return;
		}
	}
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var a = element.offsetParent;
	var b = element.offsetLeft;
	var c = element.offsetTop;	
	while(a !== null) {
	    b = b + a.offsetLeft;
	    c = c + a.offsetTop;
		a = a.offsetParent;
	}
	return {x:b,y:c};
}


// 实现一个简单的Query
function $(selector) {
  var selector = selector.replace(/\s+/g,'');
  var eleNodes = document.getElementsByTagName("*");
  var reg1 = /^\#{1}/;
  var reg2 = /^\w+$/;
  var reg3 = /^\.\w+/;
  var reg4 = /^\[.+\]$/;
  if(reg1.test(selector) && document.getElementById(selector.slice(1))) {
	  return document.getElementById(selector.slice(1));
  }
  
  if(reg2.test(selector) && document.getElementsByTagName(selector)) {
	  return document.getElementsByTagName(selector)[0];
  }
  
  if(reg3.test(selector)) {
	  var classname = selector.slice(1);
	  for(var i = 0;i<eleNodes.length;i++) {
		  if(eleNodes[i].getAttribute("class") === classname) {
			  return eleNodes[i];
			  break;
		  }
	  }
  }
  
  if(reg4.test(selector) && selector.indexOf('=') === -1) {
	  var attrName = selector.slice(1,selector.length-1);
	  for(var j = 0;j<eleNodes.length;j++) {
		  if(eleNodes[j].getAttribute(attrName) !== null) {
			  return eleNodes[j];
			  break;
		  }
	  }
  }
  
  if(reg4.test(selector) && selector.indexOf('=') !== -1) {
	  var index = selector.indexOf('=');
	  var attrname = selector.slice(1,index);
	  var attrvalue = selector.slice(index+1,selector.length-1);
	  for(var j = 0;j<eleNodes.length;j++) {
		  if(eleNodes[j].getAttribute(attrname) === attrvalue) {
			  return eleNodes[j];
			  break;
		  }
	  }
  }
  
  if(reg1.test(selector) && selector.indexOf('.') !== -1) {
	  var index = selector.indexOf('.');
	  var idvalue = selector.slice(1,index);
	  var classname = selector.slice(index+1,selector.length);
	  var par = document.getElementById(idvalue);
	  var parChilds = par.getElementsByTagName('*');
	  for(var i=0;i<parChilds.length;i++) {
		  if(parChilds[i].getAttribute('class') === classname) {
			  return parChilds[i];
		  }
	  }
  }
}

// 可以通过id获取DOM对象，通过#标示，例如$("#adom");  返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如$("a"); 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如$(".classa"); 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如$("[data-log]"); 返回第一个包含属性data-log的对象

//$("[data-time=2015]"); 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如$("#adom .classa"); 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

/********************************事件***********************************/

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener) {
		element.addEventListener(event,listener,false);//在冒泡阶段处理
	} else if(element.addEvent) {
		element.addEvent('on'+event,listener);
	} else {
		element['on'+event]=listener;//DPM0级添加事件处理程序
	}
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(element.removeEventListener) {
		element.removeEventListener(event,listener,false);//在冒泡阶段处理
	} else if(element.detachEvent) {
		element.detachEvent('on'+event,listener);
	} else {
		element['on'+event] = null;//DPM0级添加事件处理程序
	}
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
	addEvent(element, 'click', listener);
}


// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
	function testKeycode(event) {
		event = event || window.event;
		if(event.keyCode === 13) {
			listener.call(element);//改变作用域
		} 
	}
	addEvent(element, 'keyup', testKeycode);    
}
/**********接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法**************/
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

//事件委托
// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    $.on(element, eventName, function(event) {
		event = event || window.event;
		var target = event.target || event.srcElement;		
			if(target.nodeName.toLowerCase() === tag.toLowerCase()) {
				listener.call(target);
			}
	});
}

$.delegate = delegateEvent;

//估计有同学已经开始吐槽了，函数里面一堆$看着晕啊，那么接下来把我们的事件函数做如下封装改变(封装之后原来的$.on之类的方法就失效了)：

/*$.on = function(selector, event, listener) {
    //var element = $(selector),不能这么写，这么写相当于给$()传入一个变量参数并调用，而$()只接受字符串参数，从而会抛出错误无法运行
	addEvent($(selector), event, listener);
}
$.click = function(selector, listener) {
	addEvent($(selector), 'click', listener)
}

$.un = function(selector, event, listener) {
	removeEvent($(selector), event, listener);
}

$.delegate = function(selector, tag, event, listener) {
    $.on($(selector), eventName, function(event) {
		event = event || window.event;
		var target = event.target || event.srcElement;		
			if(target.nodeName.toLowerCase() === tag.toLowerCase()) {
				listener.call(target);
			}
	});
	
}*/

/********************************BOM操作***********************************/
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ug = navigator.userAgent;
	if(/MSIE([^\;]+)/.test(ug)) {
		return 'IE: ' + RegExp['$1'];
	} else if(/Trident\/([^\;]+)/.test(ug)) {
		return 'This browser is IE 11+ and Trident: ' + RegExp['$1'] +'.';
	} else {
		return -1;
	}
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookie = encodeURIComponent(cookieName)+'='+encodeURIComponent(cookieValue);
	if(expiredays instanceof Date) {
		cookie += ';expires='+expiredays.toGMTString();
	}
	document.cookie = cookie;
}

// 获取cookie值
function getCookie(cookieName) {
    var a = document.cookie;
	var b = encodeURIComponent(cookieName)+'=';
    var nameStart = a.indexOf(b);
	if(nameStart !== -1) {
		var valueEnd = a.indexOf(';',nameStart);
		if(valueEnd !== -1) {
			return decodeURIComponent(a.substring(nameStart+b.length,valueEnd));
		} else {
			return decodeURIComponent(a.substring(nameStart+b.length,a.length));
		}
	}
}

/********************************Ajax操作***********************************/

function ajax(url, options) {
    var xmlhttp = new XMLHttpRequest();
	var b,c;
	var onfail = options.onfail ? options.onfail : function(){alert("Request is unsuccessful: "+xmlhttp.status);};
	if(options.data && typeof options.data === 'object') {
		for(var a in options.data) {
			//没有进行encodeURIComponent()编码
		    b += "&" + a + "=" + options.data[a];
		}
		c = b.substring(10,b.length);
	} else if(typeof options.data === 'string') {
		c = options.data;
	} else {
		c = null;
	}
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState === 4) {
			if(xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status == 304) {
				options.onsuccess(xmlhttp.responseText, xmlhttp);
			} else {
				options.onfail;
			}
		}
	}
	if(options.type === 'post') {
		xmlhttp.open(options.type,url,true);
		xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlhttp.send(c);
	} 
	if(options.type === 'get'  || typeof options.type === 'undefined') {
		xmlhttp.open(options.type,url+"?"+c,true);
		xmlhttp.send(null);
	}
	
}
