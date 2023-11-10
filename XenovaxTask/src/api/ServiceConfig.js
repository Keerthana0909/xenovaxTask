import axios from 'axios';

export const apiCall = data => {
  return new Promise((resolve, reject) => {
    axios
      .get(data)
      .then(response => {
      //  console.log('apiCall', response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.log('apiCall', error);
        reject(error);
      });
  });
};
