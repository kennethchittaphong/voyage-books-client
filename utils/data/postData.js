import { clientCredentials } from '../client';

const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'POST',
    body: JSON.stringify({
      user: payload.uid,
      title: payload.title,
      location: payload.location,
      // creation_date: payload.creationDate,
      photo_url: payload.photo_url,
      content: payload.content,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updatePost = (post) => new Promise((resolve, reject) => {
  console.log('update post ===', post);
  fetch(`${clientCredentials.databaseURL}/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: post.title,
      edited_on: new Date(),
      photo_url: post.photo_url,
      content: post.content,
      location: post.location,
      creation_date: post.creation_date,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const getSinglePost = (postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${postId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user: data.user,
        title: data.title,
        creationDate: data.creation_date,
        photoUrl: data.photo_url,
        content: data.content,
        location: data.location,
        editedOn: data.edited_on,
      });
    })
    .catch((error) => reject(error));
});

const getCustomFeed = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${userId}/getSubscribedPosts`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'GET',
    headers: {
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPostsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts?user=${userId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const deletePost = (postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${postId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  createPost, updatePost, getSinglePost, getCustomFeed, getPosts, getPostsByUser, deletePost,
};
