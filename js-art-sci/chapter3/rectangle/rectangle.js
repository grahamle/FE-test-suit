window.onload = init;

function init() {
  var canvas = document.getElementById('square');
  if (typeof canvas.getContext != 'undefined') {
  	var context = canvas.getContext('2d');
  	// 以下是图形上下文提供的三种绘制矩形的方法，能对矩形做的只有这么多
  	// 想要有更多的形状，只能通过画线（路径）来画出来
  	context.fillStyle = '#0066cc';
  	context.fillRect(0,0,400,400);

  	context.clearRect(75,75,250,250);

  	context.strokeStyle = '#ff0000';
  	context.strokeRect(150.5,150.5,100,100);
  }
}