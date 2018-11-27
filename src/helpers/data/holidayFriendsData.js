import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getHolidayIdsForFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/holidayFriends.json?orderBy="friendId"&equalTo="${friendId}"`)
    .then((result) => {
      const holidayFriendsObject = result.data;
      const holidayIds = [];
      if (holidayFriendsObject !== null) {
        Object.keys(holidayFriendsObject).forEach((hFId) => {
          holidayIds.push(holidayFriendsObject[hFId].holidayId);
        });
      }
      resolve(holidayIds);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getHolidayIdsForFriend };
