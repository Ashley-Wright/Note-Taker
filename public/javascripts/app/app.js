/* global document, window, io */

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  // Go to register form
  $('#register-link').on('click', clickRegisterLink);
  $('#register-form button').on('click', clickRegister);
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

  if(!username){
    updateRegisterError('Username is required')
  } else if(!password || !password2) {
    updateRegisterError('Password is required')
  } else if(password !== password2){
    updateRegisterError('Passwords did not match')
  } else {

  }

  e.preventDefault();
}


// ========================================= //
// ================ HTML =================== //
// ========================================= //

function updateRegisterError(message){
  $('#register-error').removeClass('hidden');
  $('#register-error').text(message);
}

