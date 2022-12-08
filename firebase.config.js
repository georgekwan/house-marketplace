import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDsgxcPJrKfWXQU5kSIq58fmfdvxVYIyFA',
  authDomain: 'house-marketplace-app-3b3d1.firebaseapp.com',
  projectId: 'house-marketplace-app-3b3d1',
  storageBucket: 'house-marketplace-app-3b3d1.appspot.com',
  messagingSenderId: '187035305632',
  appId: '1:187035305632:web:7183cafb0eecc721e12bc5',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
