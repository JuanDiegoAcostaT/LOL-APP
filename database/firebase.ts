// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCFak-ZlDf2RIURB0DhMvxUpU3mUgBfWdQ',
  authDomain: 'leage-of-legends.firebaseapp.com',
  databaseURL: 'https://leage-of-legends-default-rtdb.firebaseio.com',
  projectId: 'leage-of-legends',
  storageBucket: 'leage-of-legends.appspot.com',
  messagingSenderId: '377113166532',
  appId: '1:377113166532:web:ab77df938cf4e4b8ee3f91',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
