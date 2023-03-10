import { clientCredentials } from '../client';

const getAllCommentsByPost = (postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments?postId=${postId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createComment = (user, comment) => new Promise((resolve, reject) => {
  console.log('user, comment ===', user, comment);
  const commentObj = {
    post: comment.postId,
    author: user.uid,
    content: comment.content,
    created_on: new Date(),
  };
  fetch(`${clientCredentials.databaseURL}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteComment = (commentId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${commentId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const updateComment = (user, comment, formInput) => new Promise((resolve, reject) => {
  const commentObj = {
    post: comment.post.id,
    author: comment.author.id,
    content: formInput.content,
    user_id: user.uid,
    created_on: new Date(),
  };
  fetch(`${clientCredentials.databaseURL}/comments/${comment.id}`, {
    method: 'PUT',
    body: JSON.stringify(commentObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(() => resolve())
    .catch((error) => reject(error));
});

export {
  getAllCommentsByPost, deleteComment, updateComment, createComment,
};
