function ColumnDrag(id) {
  this.tbl = document.getElementById(id);
  if (this.tbl && this.tbl.nodeName == 'TABLE') {
  	this.state = null;
  	this.prevX = null;
  	this.cols = this.tbl.getElementsByTagName('col');
  	this.makeDraggable();
  }
}

ColumnDrag.prototype.makeDraggable = function() {
  // 加入影子列，好让 insertBefore 找得到插入位置
  for (var i=0; this.tbl.rows[i]; i++) {
  	var td =document.createElement('td');
  	td.style.display = 'none';
  	this.tbl.rows[i].appendChild(td);   // 在每一行的最后一个单元格后面再加一个td
  }

  // 给标题行的所有单元格创建钩子，这样让 tab 键可用
  var headings = this.tbl.tHead.rows[0].cells;
  for (var i=0; headings[i]; i++) {
  	headings[i].cIdx = i;    // 解决 safari 中 cellIndex 总是返回 0 的问题
  	var a = document.createElement('a');
  	a.href = '#';
  	a.innerHTML = '&larr;' + headings[i].innerHTML + '&rarr;';  // 转义的左右箭头
  	a.onclick = function() {
  	  return false;
  	}
  	headings[i].className += ' draggable';  // 通过添加css列在每个th右上角显示小图表示可拖拽

  	// 为每个标题行的 th 绑定事件，鼠标按下，意味着要开始拖拽
  	headings[i].onmousedown = function(that) {
  	  return function(e) {
  	  	that.mousedown(e);
  	  	return false;
  	  }
  	}(this);
  	// 在文档中鼠标移动的事件（包括是否拽着th）
  	document.onmousemove = function(that) {
  	  return function(e) {
  	  	that.mousemove(e);
  	  	return false;
  	  }
  	}(this);
  	// 如果鼠标离开或弹起时不在任一一个表头th上时，需要移除所有的表头的down类名，意味着这次拖拽没成功
  	document.onmouseup = function(that) {
  	  return function() {
  	  	var e = that.clearAllHeadings();
  	  	if (e)
  	  	  that.mouseup(e);
  	  }
  	}(this);
  	document.onmouseout = function(that) {
  	  return function(e) {
  	  	e = e ? e : window.event;
  	  	related = e.relatedTarget ? e.relatedTarget : e.toElement;
  	  	if (related == null) {
  	  	  var e = that.clearAllHeadings();
  	  	  if (e)
  	  	  	that.mouseup(e);
  	  	}
  	  }
  	}(this);
  	// 给钩子绑定键盘事件，就是为了支持键盘的调动
  	a.onkeyup = function(that) {
  	  return function(e) {
  	  	that.keyup(e);
  	  	return false;
  	  }
  	}(this);
  	// 当鼠标进入或移除表头th时，绑定相应的添加 hover 类的事件处理器
  	headings[i].onmouseover = addHover;
  	headings[i].onmouseout = removeHover;
  	// 把钩子往th中塞
  	headings[i].innerHTML = '';
  	headings[i].appendChild(a);
  }
}

ColumnDrag.prototype.clearAllHeadings = function() {
  var e = false;  // e 作为该函数的返回值，要么返回一个对象表明将插入的节点，要么返回false
  for (var i=0; this.cols[i]; i++) {
  	var th = this.tbl.tHead.rows[0].cells[i];
  	if (th.className.match(/down/)) {
  	  e = {target: th};
  	}
  }
  return e;
}

addHover = function() {
  this.className += ' hover';
}

removeHover = function() {
  this.className = this.className.replace(/ hover/, '');
}

ColumnDrag.prototype.mousedown = function(e) {
  e = e ? e : window.event;
  var elem = e.target ? e.target : e.srcElement;
  elem = elem.nodeName == 'A' ? elem.parentNode : elem;

  // 设置相关状态以及拖拽的发起元素
  this.state = 'drag';
  elem.className += ' down';
  this.cols[elem.cIdx].className = 'drag';
  this.from = elem;
  operaRefresh();  // 因为Opera在类名增删时不会自动刷新，所以得调用这个函数来hack Opera
}

operaRefresh = function() {
  document.body.style.position = 'relative';
  document.body.style.position = 'static';
}

ColumnDrag.prototype.mousemove = function(e) {
  e = e ? e : window.event;
  var x = e.clientX ? e.clientX : e.pageX;
  var elem = e.target ? e.target : e.srcElement;

  if (this.state == 'drag' && elem != this.from) {
  	var from = this.from.cIdx;
  	var to = elem.cIdx;

  	if ((from > to && x < this.prevX) || (from < to && x > this.prevX)) {
  	  // 交换两个列的状态了，因为下一步就是交换位置了
  	  this.cols[from].className = '';
  	  this.cols[to].className = 'drag';

  	  // 由于要使用的是 insertBefore，所以要插入的那个列的 cIdx其实是 to + 1，当然前提是从左往右拖
  	  if (from < to)
  	  	to++;

  	  // “一行一行地”将被拖拽的那列的单元格插入到to所在列的单元格之前，这个是完成转移的关键
  	  var rows = this.tbl.rows;
  	  for (var i=0; rows[i]; i++) {
  	  	rows[i].insertBefore(rows[i].cells[from], rows[i].cells[to]);
  	  }

  	  // 更新各个表头对应的 cIdx 值，以便于下一次的拖拽使用
  	  var headings = this.tbl.tHead.rows[0].cells;
  	  for (var i=0; headings[i]; i++) {
  	  	headings[i].cIdx = i;
  	  }
  	}
  }
  // 在鼠标一移到任一一个th上方时，没有按下，那这一句会在上面的if片段之前就执行了，prevX有值了
  this.prevX = x;
}

ColumnDrag.prototype.mouseup = function(e) {
  e = e ? e : window.event;
  var elem = e.target ? e.target : e.srcElement;
  elem = elem.nodeName == 'A' ? elem.parentNode : elem;

  // 当鼠标抬起时，意味着拖拽状态结束了
  this.state = null;
  var col = this.cols[elem.cIdx];

  // 告诉用户被拖拽的列已经放好了，用不同的css类显示出其不同，但是要在用户知道后恢复
  col.className = 'dropped';
  operaRefresh();
  // 用户发现后，利用setTimeout设置1s之后，所有列的样式恢复相同，删除特殊的dropped类名
  window.setTimeout(function(that) {
  	return function() {
  	  that.from.className = that.from.className.replace(/ down/g, '');
  	  for (var i=0; that.cols[i]; i++) {
  	  	that.cols[i].className = '';
  	  }
  	  operaRefresh();
  	}
  }(this), 1000);
}

ColumnDrag.prototype.keyup = function(e) {
  // 逻辑核心所在：用键盘膜你鼠标及触发的事件，如将左右方向键转换为向左向右拖拽鼠标
  e = e ? e : window.event;
  var elem = e.target ? e.target : e.srcElement;  // 肯定知道这边触发键盘事件的是 <a> 标签
  var a = elem;  // 所以先把 elem 赋值给 a
  elem = elem.parentNode;  // 然后在把 elem 赋为 <a> 的父节点，也就是 <th>
  var headings = this.tbl.tHead.rows[0].cells;

  switch (e.keyCode) {
  	case 37:  // 向左的方向键
  	  this.mousedown({target : elem}); // 调用 mousedown，传入一个对象（模拟的事件对象）
  	  var prevCellIdx = elm.cIdx == 0 ? 0 : elm.cIdx - 1;
  	  this.prevX = 2;
  	  this.mousemove({
  	  	target : headings[prevCellIdx],
  	  	clientX : 1
  	  });
  	  this.mouseup({target : elem});
  	  a.focus();
  	break;
  	case 39:  // 向右的方向键
  	  this.mousedown({target : elem});
  	  var nextCellIdx = elm.cIdx == headings.length-2 ? headings.length-2 : elm.cIdx + 1;
  	  this.prevX = 0;
  	  this.mousemove({
  	  	target : headings[nextCellIdx],
  	  	clientX : 1
  	  });
  	  this.mouseup({target : elem});
  	  a.focus();
  	break;
  }
}
