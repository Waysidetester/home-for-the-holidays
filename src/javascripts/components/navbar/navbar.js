import $ from 'jquery';
import './navbar.scss';
import firebase from 'firebase/app';
import 'firebase/auth';

const navButtEvents = () => {
  $('.nav-link').on('click', (e) => {
    const targetId = (e.currentTarget.id);
    switch (targetId) {
      case 'navbar-link-logout':
        firebase.auth().signOut()
          .then((result) => {
            console.log('logged out', result);
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      default:
        console.error(targetId);
    }
  });
};

const createNavbar = () => {
  const domString = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Home For The Holidays</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link google-auth" id="navbar-link-login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="navbar-link-holidays">Holidays</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="navbar-link-friends">Friends</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="navbar-link-logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>`;

  $('#navbar').html(domString);
  navButtEvents();
};


// const logout = () => {
//   firebase.auth().signOut();
// };

export default { createNavbar };
