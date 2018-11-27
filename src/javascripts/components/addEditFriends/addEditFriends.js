// import axios from 'axios';
import $ from 'jquery';
import authHelpers from '../../../helpers/authHelpers';
import friendsData from '../../../helpers/data/friendsData';
import friendsPage from '../friendsPage/friendsPage';

const friendName = () => $('#form-friend-name').val();
const friendAddress = () => $('#form-friend-address').val();
const friendPhone = () => $('#form-friend-phone').val();
const friendEmail = () => $('#form-friend-email').val();
const friendRelationship = () => $('#form-friend-relationship').val();

const formBuilder = (friend) => {
  const form = `
    <div>
      <div class="form-group">
        <label for="form-friend-name">Name:</label>
        <input type="text" class="form-control" id="form-friend-name" value="${friend.name}" placeholder="John Smith">
      </div>
      <div class="form-group">
        <label for="form-friend-email">Email:</label>
        <input type="text" class="form-control" id="form-friend-email" value="${friend.email}" placeholder="email@example.com">
      </div>
      <div class="form-group">
        <label for="form-friend-phone">Phone Number:</label>
        <input type="text" class="form-control" id="form-friend-phone" value="${friend.phoneNumber}" placeholder="555-555-5555">
      </div>
      <div class="form-group">
        <label for="form-friend-address">Address:</label>
        <input type="text" class="form-control" id="form-friend-address" value="${friend.address}" placeholder="111 Example Way, City, ST ZIP">
      </div>
      <div class="form-group">
        <label for="form-friend-relationship">relationship:</label>
        <input type="text" class="form-control" id="form-friend-relationship" value="${friend.relationship}" placeholder="e.g. Brother, Spouse, ...">
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
  const emptyFriend = {
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    relationship: '',
    isAvoiding: true,
  };
  let domstring = '<h2>Add new Friend</h2>';
  domstring += formBuilder(emptyFriend);
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
    relationship: friendRelationship(),
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

// Edit
const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  friendsData.getSingleFriend(idToEdit)
    .then((friend) => {
      let domstring = '<h2>Edit new Friend</h2>';
      domstring += formBuilder(friend);
      domstring += `<button type="submit" class="btn btn-primary" id="update-friend" data-single-edit-id="${friend.id}">Update Friend</button>`;
      $('#friends').hide();
      $('#add-edit-friend').html(domstring).show();
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateFriend = (e) => {
  const editFriend = getFriendFormInput();
  const friendId = e.target.dataset.singleEditId;
  friendsData.updateExistingFriend(editFriend, friendId)
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
// end Edit

$('body').on('click', '#add-friend', addNewFriend);
$('body').on('click', '.edit-btn', (e) => {
  showEditForm(e);
});
$('body').on('click', '#update-friend', (e) => {
  updateFriend(e);
});

export default { buildAddFriend, addNewFriend };
