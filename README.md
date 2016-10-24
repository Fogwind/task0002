# task0002
2015百度前端学院的小练习。
在线演示：https://fogwind.github.io/task0002/task0002_1.html
####其他一些项目的在线演示：

- 五子棋：https://fogwind.github.io/wuziqi.html
- 弹幕墙：https://codepen.io/fogwind/pen/EgpAdJ
- Bootstrap基础练习：https://codepen.io/fogwind/pen/xEmLqb
- Bootstrap实战：https://fogwind.github.io/BootstrapPractice/bootstrappractice.html （缺点：图片过多，加载时间长。后需改进：使用图片懒加载技术改进）

###util.js
util.js中实现以下方法：
####Javascript基础
```javascript
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
}
```

```javascript
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
}
```
```javascript
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
}
```

```javascript
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn) {
    // your implement
}


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {}
```
####正则表达式练习
```
// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
}
```

```javascript
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
}
```
####简单的$对象
```javascript
// 实现一个简单的Query
function $(selector) {
    
}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
```
####事件
```javascript
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
}

把上面几个函数变成$对象的一些方法
```

####BOM
```
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
}

```


####Ajax
```javascript
//封装一个Ajax方法。实现如下方法：
function ajax(url, options) {
    // your implement
}
```
options是一个对象，里面可以包括的参数为：

- type: `post`或者`get`，可以有一个默认值
- data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
- onsuccess: 成功时的调用函数
- onfail: 失败时的调用函数

###task0002_1
**第一阶段**

在页面中，有一个单行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用半角逗号来作为不同爱好的分隔。

当点击按钮时，把用户输入的兴趣爱好，按照上面所说的分隔符分开后保存到一个数组，过滤掉空的、重复的爱好，在按钮下方创建一个段落显示处理后的爱好。

**第二阶段**

单行变成多行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号来作为不同爱好的分隔。

当点击按钮时的行为同上

**第三阶段**

用户输入的爱好数量不能超过10个，也不能什么都不输入。当发生异常时，在按钮上方显示一段红色的错误提示文字，并且不继续执行后面的行为；当输入正确时，提示文字消失。

同时，当点击按钮时，不再是输出到一个段落，而是每一个爱好输出成为一个checkbox，爱好内容作为checkbox的label。

###task0002_2

实现一个倒计时功能。

- 界面首先有一个文本输入框，允许按照特定的格式`YYYY-MM-DD`输入年月日；
- 输入框旁有一个按钮，点击按钮后，计算当前距离输入的日期的00:00:00有多少时间差
- 在页面中显示，距离YYYY年MM月DD日还有XX天XX小时XX分XX秒
- 每一秒钟更新倒计时上显示的数
- 如果时差为0，则倒计时停止

###task0002_3 轮播图

实现一个轮播图的功能。

- 图片数量及URL均在HTML中写好
- 图片切换的动画要流畅
- 在轮播图下方自动生成对应图片的小点，点击小点，轮播图自动动画切换到对应的图片

### task0002_4 输入提示框

实现一个类似百度搜索框的输入提示的功能。

要求如下：

- 允许使用鼠标点击选中提示栏中的某个选项
- 允许使用键盘上下键来选中提示栏中的某个选项，回车确认选中
- 选中后，提示内容变更到输入框中

## task0002_5：拖拽

实现一个可拖拽交互的界面

- 如示例图，左右两侧各有一个容器，里面的选项可以通过拖拽来左右移动
- 被选择拖拽的容器在拖拽过程后，在原容器中消失，跟随鼠标移动
- 注意拖拽释放后，要添加到准确的位置
- 拖拽到什么位置认为是可以添加到新容器的规则自己定
- 注意交互中良好的用户体验和使用引导
