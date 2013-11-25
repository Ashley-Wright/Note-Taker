var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');

// route definitions
var home = require('./routes/home');
var users = require('./routes/users');
var sources = require('./routes/sources');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/note-taker');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', home.index);

app.post('/users', users.create);
app.put('/login', users.login);
app.delete('/logout', users.logout);

app.post('/sources', sources.create);

// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);