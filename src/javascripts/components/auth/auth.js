import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './auth.scss';
import googleImg from './Google-logo-2015-G-icon.png';

const loginClick = (loginId) => {
  $(`#${loginId}`).on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

const login = () => {
  const domString = `
    <button class="btn btn-dark" id="google-auth"><img id="auth-image" src="${googleImg}"/></button>
  `;
  $('#auth').html(domString);
  loginClick('google-auth');
};

export default { login };
