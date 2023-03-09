import { clientCredentials } from '../client';

const getSingleUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        uid: data.uid,
        firstName: data.first_name,
        lastName: data.last_name,
        about: data.about,
        profileImageUrl: data.profile_image_url,
        email: data.email,
      });
    })
    .catch((error) => reject(error));
});

const updateUser = (userObj, userId) => new Promise((resolve, reject) => {
  const newUserObj = {
    first_name: userObj.firstName,
    last_name: userObj.lastName,
    about: userObj.about,
    profile_image_url: userObj.profileImageUrl,
    email: userObj.email,
  };
  fetch(`${clientCredentials.databaseURL}/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(newUserObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(resolve)
    .catch(reject);
});

const deleteUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${userId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export { getSingleUser, updateUser, deleteUser };
