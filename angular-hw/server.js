var express = require('express'),
  app = express(),
  port = 8818;

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/client'));
  app.use(app.router);
});

var homeworks_map = {
  "1": {
  	"id": "1",
  	"title": "20140104",
  	"due": "-2 days",
  	"items": [
  	  "选择题1-10",
  	  "填空题1-5",
  	  "简单题1-3"
  	],
  	"keys": [
  	  "CABDAADDBC",
  	  "32m, 110, >, 否, <",
  	  "无"
  	]
  },
  "2": {
  	"id": "2",
  	"title": "20140213",
  	"due": "3 days",
  	"items": [
  	  "判断对错1-5",
  	  "单选题1-5"
  	],
  	"keys": [
  	  "TFFTT",
  	  "ABCCD"
  	]
  }
};

var next_id = 3;

app.get('/hws', function(req, res) {
  var homeworks = [];
  for (var key in homeworks_map) {
  	homeworks.push(homeworks_map[key]);
  }
  setTimeout(function() {
  	res.send(homeworks);
  }, 500);
});

app.get('/hws/:id', function(req, res) {
  console.log('请求第 '+req.params.id+' 次作业');
  res.send(homeworks_map[req.params.id]);
});

app.post('/hws', function(req, res) {
  var homework = {};
  // TODO: 新建作业发起的post请求在此处理
});

app.listen(port);
console.log('服务器搁这跑呢 http://localhost:' + port + '/');
