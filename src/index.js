import firebase from 'firebase/app';
import $ from 'jquery';
import apiKeys from '../db/apiKeys.json';
import 'bootstrap';
import './index.scss';
import navbar from './javascripts/components/navbar/navbar';
import auth from './javascripts/components/auth/auth';
import authHelpers from './helpers/authHelpers';
import friendsPage from './javascripts/components/friendsPage/friendsPage';
import addEditFriend from './javascripts/components/addEditFriends/addEditFriends';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authHelpers.checkLoginStatus(friendsPage.initFriends);
  navbar.createNavbar();
  auth.login();
  $('#show-friend-form').on('click', addEditFriend.buildAddFriend);
};

init();
