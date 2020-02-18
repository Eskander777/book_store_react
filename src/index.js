import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAIJvQfRKYpXrKrvdd7b-LFkxZkME8fDVk",
    authDomain: "book-store-95eba.firebaseapp.com",
    databaseURL: "https://book-store-95eba.firebaseio.com",
    projectId: "book-store-95eba",
    storageBucket: "book-store-95eba.appspot.com",
    messagingSenderId: "521851003605",
    appId: "1:521851003605:web:313c060519f784c23cb85c"
  };
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
