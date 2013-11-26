/* global document, window, io */

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#sign-in-username').focus();

  $('#register-link').on('click', clickRegisterLink);
  $('#register-form button').on('click', clickRegister);
  $('#sign-in-form button').on('click', clickSignIn);
  $('#username').on('click', clickSignOut);

  $('#add-source-form').on('click', clickAddSource);
  $('.source').on('click', clickShowSource);

  $('#add-note').on('click', clickAddNote);
}

// =============== Events ================= //
// ======================================== //
// ======================================== //

function clickRegisterLink(e){
  $('#sign-in-form').addClass('hidden');
  $('#register-form').removeClass('hidden');
  $('#register-username').focus();
  e.preventDefault();
}

function clickRegister(e){
  var username = $('#register-username').val();
  var password = $('#register-password1').val();
  var password2 = $('#register-password2').val();

  $('#register-error').addClass('hidden');
  $('#register-error').text('');

  e.preventDefault();

  // Form validation
  if(!username){
    updateRegisterError('Username is required')
    $('#register-username').focus();
  } else if(!password || !password2) {
    updateRegisterError('Password is required')
    $('#register-password1').focus();
  } else if(password !== password2){
    updateRegisterError('Passwords did not match')
    $('#register-password1').val('');
    $('#register-password2').val('');
    $('#register-password1').focus();
  } else {

    // Ajax Request
    var url = '/users';
    var data = {username: username, password: password};
    sendAjaxRequest(url, data, 'POST', null, null, function(data){
      console.log(data);
      htmlRegisterCompleted(data);
    });
  }
}

function clickSignIn(e){
  var url = '/login';
  var username = $('#sign-in-username').val();
  var password = $('#sign-in-password').val();
  var data = {username: username, password: password};

  sendAjaxRequest(url, data, 'POST', 'PUT', e, function(data){
    console.log(data);
    htmlLoginCompleted(data);
  });
}

function clickSignOut(e){
  var url = '/logout';
  sendAjaxRequest(url, {}, 'POST', 'DELETE', e, function(data){
    console.log(data);
    htmlLogoutCompleted(data);
  });
}

function clickAddSource(e){
  var title = $('#add-source-title').val();
  var url = '/sources';

  if(!title){
    e.preventDefault();
  } else {
    $('#add-source').foundation('reveal', 'close');
    sendAjaxRequest(url, {title: title}, 'POST', null, e, function(data){
      console.log(data);
      htmlAddSourceCompleted(data);
    });
  }
}

function clickShowSource(e){
  $('.pure-menu-selected').removeClass('pure-menu-selected');
  $(this).parent().addClass('pure-menu-selected');

  var id = $(this).attr('data-id');
  var url = '/sources/' + id;

  sendAjaxRequest(url, {}, 'GET', null, e, function(data){
    console.log(data);
    reloadPage();
  });
}

function clickAddNote(){
  $('#add-note-reveal').foundation('reveal', 'open');
}


// ========================================= //
// ================ HTML =================== //
// ========================================= //

function updateRegisterError(message){
  $('#register-error').removeClass('hidden');
  $('#register-error').text(message);
}

function htmlRegisterCompleted(result){
  if(result.status === 'error'){
    updateRegisterError('Username unavailable');
    $('#register-username').focus();
  }

  if(result.status === 'ok'){
    $('#register-form').addClass('hidden');
    $('#sign-in-form').removeClass('hidden');
  }
}

function htmlLoginCompleted(result){
  if(result.status === 'error'){
    $('#sign-in-username').val('');
    $('#sign-in-password').val('');
    $('#sign-in-username').focus();

    $('#sign-in-error').removeClass('hidden');
    $('#sign-in-error').text('Sign In Failed');
  }

  if(result.status === 'ok'){
    $('.welcome').addClass('hidden');
    $('.main').removeClass('hidden');

    $('#username').text(result.username);
    window.location.href = '/';
  }
}

function htmlLogoutCompleted(result){
  if(result.status === 'ok'){
    $('#username').text('');
    $('.welcome').removeClass('hidden');
  }
}

function htmlAddSourceCompleted(result){
  window.location.href = '/';
}

function reloadPage(){
  window.location.href = '/';
}