var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');

// define middleware
var middleware = require('./lib/middleware');

// route definitions
var home = require('./routes/home');
var users = require('./routes/users');
var sources = require('./routes/sources');
var notes = require('./routes/notes');
var sourceNotes = require('./routes/sourceNotes');
var searchNotes = require('./routes/searchNotes');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/note-taker');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', middleware.getSources, middleware.getNotes, home.index);

app.post('/users', users.create);
app.put('/login', users.login);
app.delete('/logout', users.logout);

app.post('/sources', sources.create);
app.get('/sources/:id', sources.show);

app.post('/notes', notes.create);
app.put('/sourceNotes/sort', sourceNotes.sort);

app.get('/searchNotes', searchNotes.index);
app.get('/notes', notes.search);
app.put('/searchNotes/sort', searchNotes.sort);

// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);