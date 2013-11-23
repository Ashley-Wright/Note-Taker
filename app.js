var express = require('express');
var mongoose = require('mongoose');
var PDFDocument = require('pdfkit');
doc = new PDFDocument;

// model definitions
require('require-dir')('./models');

// define middleware
var middleware = require('./lib/middleware');

// route definitions
var home = require('./routes/home');
var users = require('./routes/users');
var resources = require('./routes/resources');
var resourceNotes = require('./routes/resourceNotes');
var searchNotes = require('./routes/searchNotes');
var notes = require('./routes/notes');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/note-taker');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', middleware.getResources, home.index);

app.post('/users', users.create);
app.put('/login', users.login);
app.delete('/logout', users.logout);

app.post('/resources', resources.create);

app.get('/resources/:id', resources.show);
app.put('/resourceNotes/sort', resourceNotes.sort);

app.post('/notes', notes.create);
app.get('/notes', notes.search);

app.put('/searchNotes/pdf', searchNotes.pdf);

// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);
