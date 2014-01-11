function TableSort(id) {
  this.tbl = document.getElementById(id);
  this.lastSortedTh = null;
  if (this.tbl && this.tbl.nodeName == 'TABLE') {
  	var headings = this.tbl.tHead.rows[0].cells;
  	for (var i=0; headings[i]; i++) {
  	  if (headings[i].className.match(/asc|dsc/)) {
  	  	this.lastSortedTh = headings[i];
  	  }
  	}
  	this.makeSortable();
  }
}

TableSort.prototype.makeSortable = function() {
  var headings = this.tbl.tHead.rows[0].cells;
  for (var i=0; headings[i]; i++) {
  	headings[i].cIdx = i;
  	var a = document.createElement('a');
  	a.href = '#';
  	a.innerHTML = headings[i].innerHTML;
  	a.onclick = function(that) {
  	  // 使用内嵌函数：为了处理 this 关键字的作用域问题 --> 当函数被一个事件调用时，
  	  // 比如我们这的 onclick ，this 会指向调用函数的那个对象，这里就是新创建的 a ，
  	  // 但是我们需要的是让 this 指向 TableSort 对象
  	  return function() {
  	  	that.sortCol(this);
  	  	return false;
  	  }
  	}(this);
  	headings[i].innerHTML = '';
  	headings[i].appendChild(a);
  }
}

TableSort.prototype.sortCol = function(el) {
  // 准备两个数组以及每个单元格的索引信息
  var rows = this.tbl.rows;
  var alpha = [], numeric = [];
  var aIdx = 0, nIdx = 0;
  var th = el.parentNode;
  var cellIndex = th.cIdx;

  // 开始遍历每列中的所有格子，将格子内容取出，分成数值型及文本，扩展的话加入更多类型
  for (var i=1; rows[i]; i++) {
  	var cell = rows[i].cells[cellIndex];
  	var content = cell.textContent ? cell.textContent : cell.innerText;
  	var num = content.replace(/(\$|\,|\s)/g, '');
  	if (parseFloat(num) == num) {
  	  numeric[nIdx++] = {  // 存的是一个对象数组
  	  	value: Number(num),
  	  	row: rows[i]
  	  }
  	} else {
  	  alpha[aIdx++] = {
  	  	value: content,
  	  	row: rows[i]
  	  }
  	}
  }

  // 经过上面步骤，单元格的内容已经被解析出来放到了对应的数组中，并等待排序
  // 我们将调用下面单独声明的 bubbleSort 进行排序

  // 判断要排序的列当前处于什么状态，如果已经处于升序排序状态，那么点击时被调用的应该
  // 是降序排序；否则，如果当前是处于降序排列或尚未排序状态，则应该对其进行升序排序
  var col = [], top, bottom;

  if (th.className.match('asc')) {
  	top = bubbleSort(alpha, -1);
  	bottom = bubbleSort(numeric, -1);
  	th.className = th.className.replace(/asc/,'dsc');
  } else {
  	top = bubbleSort(numeric, 1);
  	bottom = bubbleSort(alpha, 1);
  	if (th.className.match('dsc')) {
  	  th.className = th.className.replace(/dsc/,'asc');
  	} else {
  		th.className += 'asc';
  	}
  }

  // 管理表头的类，用于排序的只能有一列，要移除别的拥有 asc 或 dsc 类的列中的相应类
  if (this.lastSortedTh && th!= this.lastSortedTh) {
  	this.lastSortedTh.className = this.lastSortedTh.className.replace(/dsc|asc/g, '');
  }
  this.lastSortedTh = th;

  // 经过上面的准备，我们有了两个排好序的数组（top 和 bottom），以及可以正确反映最新排序
  // 和激活状态的列表头，剩下的就是将要排序的列的单元格重新排列，也就是“重新组织表格”
  col = top.concat(bottom);
  var tBody = this.tbl.tBodies[0];
  for (var i=0; col[i]; i++) {
  	tBody.appendChild(col[i].row);
  }
}

function bubbleSort(arr, dir) {
  // 预先计算排序方式，dir = 1 为升序，dir = -1 为降序
  var start, end;
  if (dir === 1) {
  	start = 0;
  	end = arr.length;
  } else if (dir === -1) {
  	start = arr.length - 1;
  	end = -1;
  }

  // 冒泡排序：http://en.wikipedia.org/wiki/Bubble_sort
  var unsorted = true;
  while (unsorted) {
  	unsorted = false;
  	for (var i=start; i!=end; i=i+dir) {
  	  if (arr[i+dir] && arr[i].value > arr[i+dir].value) {
  	  	var a = arr[i];
  	  	var b = arr[i+dir];
  	  	var tmp = a;
  	  	arr[i] = b;
  	  	arr[i+dir] = tmp;
  	  	unsorted = true;
  	  }
  	}
  }
  return arr;
}