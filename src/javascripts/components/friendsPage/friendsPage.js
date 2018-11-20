import axios from 'axios';
import $ from 'jquery';
import apiKeys from '../../../../db/apiKeys.json';
import authHelpers from '../../../helpers/authHelpers';
import './friendsPage.scss';

const buildDropDown = (arrOfFriends) => {
  let dropDown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Friends
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  arrOfFriends.forEach((friend) => {
    dropDown += `<div class="dropdown-item">${friend.name}</div>`;
  });
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
      console.log(friendsArray);
    })
    .catch((err) => {
      console.error('Error getting friends', err);
    });
};

export default { friendsPage };
