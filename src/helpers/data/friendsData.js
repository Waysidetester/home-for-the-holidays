import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const getAllFriends = uId => new Promise((resolve, reject) => {
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
      resolve(friendsArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/friends/${friendId}.json`)
    .then((result) => {
      const friendObject = result.data;
      friendObject.id = friendId;
      resolve(friendObject);
    })
    .catch((err) => {
      reject(err);
    });
});

const deleteFriend = idToDelete => new Promise((resolve, reject) => {
  axios.delete(`${apiKeys.firebaseKeys.databaseURL}/friends/${idToDelete}.json`)
    .then((deleted) => {
      resolve(deleted);
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getSingleFriend, getAllFriends, deleteFriend };
