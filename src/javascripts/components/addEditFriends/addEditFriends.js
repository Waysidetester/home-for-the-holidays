// import axios from 'axios';
import $ from 'jquery';
import authHelpers from '../../../helpers/authHelpers';

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
        <label class="form-check-label" for="avoiding">Avoiding</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  `;
  return form;
};

const getFriendFormInput = () => {
  const newFriend = {
    name: $('#form-friend-name').val(),
    address: $('#form-friend-address').val(),
    email: $('#form-friend-email').val(),
    phoneNumber: $('#form-friend-phone').val(),
    isAvoiding: false,
    uid: authHelpers.getCurrentUID(),
  };
  console.log(newFriend);
};

export default { formBuilder, getFriendFormInput };
