import axios from 'axios';
import $ from 'jquery';
import apiKeys from '../../../../db/apiKeys.json';
import authHelpers from '../../../helpers/authHelpers';
import './friendsPage.scss';

const printFriendObj = (friend) => {
  const newString = `<div id="selected-friend">
    <div>
      <h1>${friend.name}</h1>
      <h3>${friend.relationship}</h3>
      <p>${friend.address}</p>
      <p>${friend.email}</p>
      <p>${friend.phoneNumber}</p>
    </div>
    <button class="btn btn-danger delete-btn" data-delete-id=${friend.id}>X</button>
  </div>
  `;
  $('#single-container').html(newString);
};

const getSelectedFriend = (e) => {
  const friendId = e.target.dataset.dropdownId;
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/friends/${friendId}.json`)
    .then((result) => {
      const friendObject = result.data;
      friendObject.id = friendId;
      printFriendObj(friendObject);
    })
    .catch((err) => {
      console.error('Getting single friend failed', err);
    });
};

const buildDropDown = (arrOfFriends) => {
  let dropDown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    ${arrOfFriends.length ? 'Friends' : 'No Friends'}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (arrOfFriends.length) {
    arrOfFriends.forEach((friend) => {
      dropDown += `<div class="dropdown-item get-single" data-dropdown-id=${friend.id}>${friend.name}</div>`;
    });
  } else {
    dropDown += '<div class="dropdown-item">You are friendless</div>';
  }
  dropDown += `</div>
    </div>`;
  $('#drop-down-container').html(dropDown);
};

const friendsPage = () => {
  const uId = authHelpers.getCurrentUID();
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/friends.json?orderBy="uid"&equalTo="${uId}"`)
    .then((friends) => {
      const friendsObject = friends.data;
      const friendsArray = [];
      if (friendsObject !== null) {
        Object.keys(friendsObject).forEach((friendId) => {
          friendsObject[friendId].id = friendId;
          friendsArray.push(friendsObject[friendId]);
        });
      }
      buildDropDown(friendsArray);
    })
    .catch((err) => {
      console.error('Error getting friends', err);
    });
};

const deleteFriend = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  axios.delete(`${apiKeys.firebaseKeys.databaseURL}/friends/${idToDelete}.json`)
    .then(() => {
      friendsPage();
      $('#single-container').html('');
    })
    .catch((err) => {
      console.error(err);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSelectedFriend);
  $('body').on('click', '.delete-btn', deleteFriend);
};

const initFriends = () => {
  friendsPage();
  bindEvents();
};

export default { initFriends };
