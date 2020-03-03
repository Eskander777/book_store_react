import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://book-store-95eba.firebaseio.com/'
});

export default instance;
