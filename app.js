'use strict';

var http = require('http');
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);

server.listen(process.env.PORT || 3000, function(){
  console.log("server started");
});
