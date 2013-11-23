/* global document, window, io */


$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();

  $('#sign-in-button').on('click', clickSignIn);
  $('#register').on('click', clickRegister);
  $('#login').on('click', clickLogin);

  $('#add-resource-nav').on('click', clickNavAddResource);
  $('#add-resource-button').on('click', clickAddResource);
  $('.side-nav').on('click', 'a', clickNavResource);

  $('#add-note-button').on('click', clickAddNote);
  $('#save-note-button').on('click', clickSaveNote);

  $('#search-button').on('click', clickSearch);
  $('#merge-button').on('click', clickMerge);
  $('#pdf-button').on('click', clickPDF);

  $('#note-list').sortable({update: sortResourceNotes}).disableSelection();
}

// =============== Events ================= //
// ======================================== //
// ======================================== //

function clickSignIn(e){
  if($('#sign-in-button').attr('data-name') === 'guest'){
    $('#sign-in-form').toggleClass('hidden');
    $('input[name="name"]').focus();
  } else {
    url = '/logout';
    data = {};
    sendAjaxRequest(url, data, 'POST', 'DELETE', null, function(data){
      console.log(data);
      htmlLogoutCompleted(data);
    });
  }
  e.preventDefault();
}

function clickRegister(e){
  var url = '/users';
  var data = $('form#sign-in-form').serialize();
  sendAjaxRequest(url, data, 'POST', null, e, function(data){
    console.log(data);
    htmlRegisterCompleted(data);
  });
}

function clickLogin(e){
  var url = '/login';
  var data = $('form#sign-in-form').serialize();
  sendAjaxRequest(url, data, 'POST', 'PUT', e, function(data){
    console.log(data);
    htmlLoginCompleted(data);
  });
}

function clickNavAddResource(e){
  if($(this).hasClass('disabled-link')){
    e.preventDefault();
  } else {
    $('#resource-form').toggleClass('hidden');
    $('#resource-form input[name="title"]').focus();
  }
}

function clickAddResource(e){
  var url = '/resources';
  var data = $('form#resource-form').serialize();
  sendAjaxRequest(url, data, 'POST', null, e, function(data){
    console.log(data);
    htmlAddResourceCompleted(data);
  });
}

function clickNavResource(e){
  $('.active').removeClass('active');
  $(this).parent().addClass('active');

  var id = $(this).attr('data-id');
  if(!id){
    $('#resource-show').addClass('hidden');
    $('#search-show').removeClass('hidden');
  } else {
    var url = '/resources/' + id;
    sendAjaxRequest(url, {}, 'GET', null, e, function(data){
      console.log(data);
      htmlShowResource(data);
    });
  }
}

function clickAddNote(){
  $('#note-form').toggleClass('hidden');
}

function clickSaveNote(e){
  $('#note-form').addClass('hidden');

  var url = '/notes';
  var data = $('#add-note-form').serialize();
  sendAjaxRequest(url, data, 'POST', null, e, function(data){
    console.log(data);
  });
}

function clickSearch(){
  search = $('#search-show input[name="search"]').val();
  var url = '/notes?search=' + search;
  sendAjaxRequest(url, {}, 'GET', null, null, function(data){
    console.log(data);
    // htmlShowSearchResults(data.results);
  });
}

function sortResourceNotes(){
  var sortedNotes = [];
  var notes = $(this).children();
  for(i=0; i < notes.length; i++){
    sortedNotes.push($(notes[i]).data('id'));
  }

  var url = '/resourceNotes/sort';
  var data = {sortedNotes: sortedNotes};
  sendAjaxRequest(url, data, 'POST', 'PUT', null, function(data){
    console.log(data);
  });
}

function clickMerge(){
  $('#show-search-notes').addClass('hidden');
  var $merge = $('<div>');
  var notes = $('#show-search-notes').children().children();

  for(var i = 0; i < notes.length; i++){
    $merge.append($(notes[i]).children());
  }
  $('#search-show').append($merge);
}

function clickPDF(){
  var url = '/searchNotes/pdf';
  var text = 'note1 title';
  var data = {text: text};
  console.log(data);
  sendAjaxRequest(url, data, 'POST', 'PUT', null, function(data){
    console.log(data);
  });
}

// ========================================= //
// ================ HTML =================== //
// ========================================= //

function htmlRegisterCompleted(result){
  $('input[name="name"]').val('');
  $('input[name="password"]').val('');

  if(result.status === 'ok'){
    $('form#sign-in-form').toggleClass('hidden');
  }
  if(result.status === 'error'){
    $('input[name="name"]').focus();
  }
}

function htmlLoginCompleted(result){
  if(result.status === 'error'){
    $('input[name="name"]').val('');
    $('input[name="password"]').val('');
    $('input[name="name"]').focus();
  }
  if(result.status === 'ok'){
    $('form#sign-in-form').toggleClass('hidden');
    $('#sign-in-button').attr('data-name', result.name);
    $('#sign-in-button').text(result.name);
    $('#sign-in-button').addClass('alert');
    $('#add-resource-nav').removeClass('disabled-link');
    window.location.href = '/';
  }
}

function htmlLogoutCompleted(result){
  if(result.status === 'ok'){
    $('#sign-in-button').attr('data-name', 'guest');
    $('#sign-in-button').text('Sign In');
    $('#sign-in-button').removeClass('alert');
    $('#add-resource-nav').addClass('disabled-link')
    window.location.href = '/';
  }
}

function htmlAddResourceCompleted(result){
  $('form#resource-form').addClass('hidden');
  window.location.href = '/';
}

function htmlShowResource(result){
  // $('#resource-show').removeClass('hidden');
  $('#resource-show-notes').empty();
  console.log(result);
  $('#resource-show h2').text(result.resource.title);
  window.location.href = '/';
}

// function htmlShowSearchResults(result){

// }


function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  // console.log(data);
}
