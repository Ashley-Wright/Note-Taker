/* global document, window, io */

$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('#register-link').on('click', clickRegisterLink);
  $('#register-form button').on('click', clickRegister);
  $('#sign-in-form button').on('click', clickSignIn);

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

    var url = '/users';
    var data = {username: username, password: password};
    sendAjaxRequest(url, data, 'POST', null, null, function(data){
      console.log(data);
      htmlRegisterCompleted(data);
    });
  }
}

function clickSignIn(){
  var url = '/login';
  var data = $('form#sign-in-form').serialize();
  sendAjaxRequest(url, data, 'POST', 'PUT', e, function(data){
    console.log(data);
    // htmlLoginCompleted(data);
  });
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