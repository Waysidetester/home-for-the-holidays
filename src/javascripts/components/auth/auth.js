import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './auth.scss';

const loginClick = (loginId) => {
  $(`#${loginId}`).on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

const login = () => {
  const domString = `
    <button class="btn btn-secondary" id="google-auth">Login</button>
  `;
  $('#auth').html(domString);
  loginClick('google-auth');
};

export default { login };
