import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';

export const config = firebase.initializeApp({
  "projectId": "photobox-project",
  "appId": "1:583803608429:web:c7eedffa36a017cafc8e64",
  "databaseURL": "https://photobox-project-default-rtdb.firebaseio.com",
  "storageBucket": "photobox-project.appspot.com",
  "locationId": "europe-west",
  "apiKey": "AIzaSyBFaF7psPuKloPoKcbat39bBFwW3JTQnQA",
  "authDomain": "photobox-project.firebaseapp.com",
  "messagingSenderId": "583803608429",
  "measurementId": "G-GRCFXQ6WCQ"
});

