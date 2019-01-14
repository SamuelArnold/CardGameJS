var express   =     require("express");
var app       =     express();
app.use(express.static(__dirname + '/public'));
app.use("/js", express.static(__dirname + '/js'));
//var server = require('http').createServer(app);
//var io = require('socket.io').listen(server);
//users = [];
//connections[];
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env. PORT || 80;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



http.listen(port, function(){
  console.log('listening on *:' + port);
});
