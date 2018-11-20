import axios from 'axios';
import apiKeys from '../../../../db/apiKeys.json';

const friendsPage = () => {
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/friends.json`)
    .then((friends) => {
      const friendsObject = friends.data;
      const friendsArray = [];
      if (friendsObject !== null) {
        Object.keys(friendsObject).forEach((friendId) => {
          friendsObject[friendId].id = friendId;
          friendsArray.push(friendsObject[friendId]);
        });
      }
      console.log(friendsArray);
    })
    .catch((err) => {
      console.error('Error getting friends', err);
    });
};

export default { friendsPage };
