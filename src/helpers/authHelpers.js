import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#friends').hide();
      $('#holidays').show();
      $('#auth').hide();
      $('#navbar-link-login').hide();
      $('#navbar-link-holidays').show();
      $('#navbar-link-friends').show();
      $('#navbar-link-logout').show();
    } else {
      $('#friends').hide();
      $('#holidays').hide();
      $('#auth').show();
      $('#navbar-link-login').show();
      $('#navbar-link-holidays').hide();
      $('#navbar-link-friends').hide();
      $('#navbar-link-logout').hide();
    }
  });
};

export default { checkLoginStatus };
