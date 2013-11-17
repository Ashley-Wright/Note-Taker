/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#sign-in-button').on('click', clickSignIn);
  $('#register').on('click', clickRegister);

}

// =============== Events ================= //
// ======================================== //
// ======================================== //

function clickSignIn(e){
  $('#sign-in-form').toggleClass('hidden');
  $('input[name="name"]').focus();
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




function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  // console.log(data);
}
