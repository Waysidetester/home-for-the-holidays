import $ from 'jquery';
import authHelpers from '../../../helpers/authHelpers';
import './friendsPage.scss';
import friendsData from '../../../helpers/data/friendsData';
import holidayFriendsData from '../../../helpers/data/holidayFriendsData';
import holidaysData from '../../../helpers/data/holidaysData';

const holidayStringBuilder = (holidays) => {
  let holidayString = '<h3>Holidays:</h3>';
  holidays.forEach((holiday) => {
    holidayString += `<h5>${holiday.name} ${holiday.Date}</h5>`;
  });
  return holidayString;
};

const printFriendObj = (friend, holidays) => {
  const newString = `<div id="selected-friend">
    <div>
      <h1>${friend.name}</h1>
      <button class="btn btn-danger delete-btn" data-delete-id=${friend.id}>X</button>
      <button class="btn btn-primary edit-btn" data-edit-id=${friend.id}>Edit</button>
      <h3>${friend.relationship}</h3>
      <p>${friend.address}</p>
      <p>${friend.email}</p>
      <p>${friend.phoneNumber}</p>
      <div class="form-check form-check-inline">
        <label class="form-check-label" for="${friend.id}">Am I Avoiding Them?</label>
        <input class="form-check-input is-avoiding-checkbox" type="checkbox" id="${friend.id}" value="option1">
      </div>
    </div>
    <div class="holiday-container">${holidayStringBuilder(holidays)}</div>
  </div>
  `;
  $('#single-container').html(newString);
  if (friend.isAvoiding) {
    $('.is-avoiding-checkbox').attr('checked', true);
  }
};

const getSelectedFriend = (e) => {
  const friendId = e.target.dataset.dropdownId;
  const uid = authHelpers.getCurrentUID();
  friendsData.getSingleFriend(friendId)
    .then((singleFriend) => {
      holidayFriendsData.getHolidayIdsForFriend(friendId)
        .then((holidayIds) => {
          holidaysData.getHolidaysByArrayOfIds(uid, holidayIds)
            .then((holidays) => {
              printFriendObj(singleFriend, holidays);
            });
        })
        .catch((error) => {
          console.error(error);
        });
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
  friendsData.getAllFriends(uId)
    .then((friends) => {
      buildDropDown(friends);
    })
    .catch((err) => {
      console.error('Error getting friends', err);
    });
};

const deleteFriend = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  friendsData.deleteFriend(idToDelete)
    .then(() => {
      friendsPage();
      $('#single-container').html('');
    })
    .catch((err) => {
      console.error(err);
    });
};

const updateIsAvoiding = (e) => {
  const friendId = e.target.id;
  const checkedAttr = e.target.checked;
  friendsData.updatedIsAvoiding(friendId, checkedAttr)
    .then(() => {
      console.log('successfully updated flag');
    })
    .catch((error) => {
      console.error('error in updating flag', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSelectedFriend);
  $('body').on('click', '.delete-btn', deleteFriend);
  $('body').on('change', '.is-avoiding-checkbox', updateIsAvoiding);
};

const initFriends = () => {
  friendsPage();
  bindEvents();
};

export default { initFriends, getSelectedFriend };
