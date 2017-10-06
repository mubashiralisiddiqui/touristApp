import { AppRegistry } from 'react-native';
import App from './App';
import Navigations from './src/appNavigations/appNavigations'
// import firebase from 'firebase';

// var config = {
//     apiKey: "AIzaSyAs07zi5TZVdEk13sWrExIAB8M3z-RcgQU",
//     authDomain: "blood-bank-d4bbb.firebaseapp.com",
//     databaseURL: "https://blood-bank-d4bbb.firebaseio.com",
//     projectId: "blood-bank-d4bbb",
//     storageBucket: "",
//     messagingSenderId: "238002584387"
// };
// firebase.initializeApp(config);
AppRegistry.registerComponent('touristapp', () => Navigations);
