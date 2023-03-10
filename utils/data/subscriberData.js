import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSubscribesByUser = (subscriberId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/subscribes?subscriber_id=${subscriberId}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const checkSubscribe = (userId, profileId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/subscribes?subscriber_id=${userId}&subscribed_id=${profileId}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createSubscribe = (userId, profileId) => new Promise((resolve, reject) => {
  const subscribeObj = {
    subscriber_id: userId,
    subscribed_id: profileId,
  };
  fetch(`${clientCredentials.databaseURL}/subscribes`, {
    method: 'POST',
    body: JSON.stringify(subscribeObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteSingleSubscribe = (subscribeId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/subscribes/${subscribeId}`)
    .then(() => {
      resolve('ok');
    })
    .catch((error) => reject(error));
});

export {
  getSubscribesByUser, createSubscribe, checkSubscribe, deleteSingleSubscribe,
};
