import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/checkuser`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const registerUser = (userInfo, data) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/register`, {
    method: 'POST',
    body: JSON.stringify({
      about: data.about,
      uid: userInfo.uid,
      first_name: data.firstName,
      last_name: data.lastName,
      profile_image_url: data.profileImageUrl,
      email: data.email,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((res) => {
    if (res.user) {
      localStorage.setItem('user', JSON.stringify(res.user));
    }
  }).catch((err) => console.log('sign in error', err));
};

const signOut = () => {
  firebase.auth().signOut().then(() => localStorage.clear()).catch((err) => console.log('sign out err', err));
};

export {
  signIn, //
  signOut,
  checkUser,
  registerUser,
};
