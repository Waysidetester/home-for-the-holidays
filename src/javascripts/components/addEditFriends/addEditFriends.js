// import axios from 'axios';
import $ from 'jquery';
import authHelpers from '../../../helpers/authHelpers';
import friendsData from '../../../helpers/data/friendsData';
import friendsPage from '../friendsPage/friendsPage';

const friendName = () => $('#form-friend-name').val();
const friendAddress = () => $('#form-friend-address').val();
const friendPhone = () => $('#form-friend-phone').val();
const friendEmail = () => $('#form-friend-email').val();

const formBuilder = () => {
  const form = `
    <div>
      <div class="form-group">
        <label for="form-friend-name">Name:</label>
        <input type="text" class="form-control" id="form-friend-name" placeholder="John Smith">
      </div>
      <div class="form-group">
        <label for="form-friend-email">Email:</label>
        <input type="text" class="form-control" id="form-friend-email" placeholder="email@example.com">
      </div>
      <div class="form-group">
        <label for="form-friend-phone">Phone Number:</label>
        <input type="text" class="form-control" id="form-friend-phone" placeholder="555-555-5555">
      </div>
      <div class="form-group">
        <label for="form-friend-address">Address:</label>
        <input type="text" class="form-control" id="form-friend-address" placeholder="111 Example Way, City, ST ZIP">
      </div>
      <div class="form-group">
        <label for="form-friend-relationship">relationship:</label>
        <input type="text" class="form-control" id="form-friend-relationship" placeholder="e.g. Brother, Spouse, ...">
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="avoiding">
        <label class="form-check-label" for="avoiding">Avoiding?</label>
      </div>
    </div>
  `;
  return form;
};

const buildAddFriend = () => {
  let domstring = '<h2>Add new Friend</h2>';
  domstring += formBuilder();
  domstring += '<button type="submit" class="btn btn-primary" id="add-friend">Add Friend</button>';
  $('#friends').hide();
  $('#add-edit-friend').html(domstring).show();
};

const getFriendFormInput = () => {
  const newFriend = {
    name: friendName(),
    address: friendAddress(),
    email: friendEmail(),
    phoneNumber: friendPhone(),
    isAvoiding: false,
    uid: authHelpers.getCurrentUID(),
  };
  return newFriend;
};

const addNewFriend = () => {
  const newFriend = getFriendFormInput();
  friendsData.addNewFriend(newFriend)
    .then((result) => {
      $('#add-edit-friend').html('').hide();
      friendsPage.initFriends();
      $('#friends').show();
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

// const updateExistingFriend = () => {

// }

$('body').on('click', '#add-friend', addNewFriend);

export default { buildAddFriend, addNewFriend };
