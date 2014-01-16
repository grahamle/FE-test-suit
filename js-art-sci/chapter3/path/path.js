window.onload = init;

function init() {
  var canvas = document.getElementById('path');
  if (typeof canvas.getContext != 'undefined') {
  	var context = canvas.getContext('2d');

  	// 下面是先填充，后描绘边框：这样做是因为笔划通常落在形状边框中间，
  	// 如果先描绘边框再填充，边框的一半宽度会被填充的颜色覆盖

  	context.beginPath();  // 见到 closePath 停止，或者用 beginPath 重新开始一条新路径，结束当前路径
  	context.moveTo(150, 100);  // moveTo 就是你提起铅笔放在的开始点的位置
  	context.lineTo(200, 225);  // lineTo 只有明确使用移动操作才能画出东西

  	// 如果只画到上面这样就调用 stroke/fill 来渲染，那就是一条直线，太无趣了，多画几次，
  	// 像下面，三点构成三角形
  	context.lineTo(250, 100);
  	context.fillStyle = '#d3bea5';
  	context.fill();
  	context.stroke();

  	// 理论上来讲，路径不用再写一遍，写完 fill() 可以直接调用 stroke() 描边框，
  	// 但是由于 safari 比较sb，会忽略掉第二个操作，所以只能像下面一样再来一遍

  	/*
  	context.beginPath();
  	context.moveTo(150, 100);
  	context.lineTo(200, 225);
  	context.lineTo(250, 100);
  	// context.lineTo(150, 100);  // 这样可以闭合三角形的边
  	// context.closePath();  // 同样这样也能闭合三角形边，但这里我们只需要两边，下面你就知道了
  	context.stroke();
  	*/

  	// 绘制半圆：调用 arc(x, y, r, startAngle, endAngle, direction)
  	context.beginPath();
  	context.arc(200, 100, 50, 0, Math.PI, true);
  	// 引出一小段实线
  	context.lineTo(160, 100);
  	// 调用贝塞尔曲线: bezierCurveTo(startCtrlX, startCtrlY, endCtrlX, endCtrlY, endX, endY)
  	// 贝塞尔曲线会按照路径上的前一点作为起点，在这里是上面 lineTo 到达的 (160, 100) 为起点
  	context.bezierCurveTo(170, 100, 180, 110, 180, 120);
  	context.bezierCurveTo(180, 125, 173, 140, 185, 140);
  	context.bezierCurveTo(197, 140, 190, 125, 190, 120);
  	context.bezierCurveTo(190, 110, 200, 100, 210, 100);
  	context.fillStyle = '#fb6cf9';
  	context.fill();
  	context.closePath();
  	context.stroke();
  }
}