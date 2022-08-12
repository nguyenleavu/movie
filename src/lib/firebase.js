// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBU7n2c9YYoZB9_RlKB1EI-Cbk08wzReEo',
    authDomain: 'movie-36af2.firebaseapp.com',
    projectId: 'movie-36af2',
    storageBucket: 'movie-36af2.appspot.com',
    messagingSenderId: '474147846296',
    appId: '1:474147846296:web:93912962239fd2a09bb8ed',
    measurementId: 'G-7050FGSXLH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
