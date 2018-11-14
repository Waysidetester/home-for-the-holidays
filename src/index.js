import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import 'bootstrap';
import './index.scss';
import navbar from './javascripts/components/navbar/navbar';
import auth from './javascripts/components/auth/auth';
import authHelpers from './helpers/authHelpers';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar.createNavbar();
  authHelpers.checkLoginStatus();
  auth.login();
};

init();
