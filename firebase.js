import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase/storage';
import { fileURLToPath } from 'url';

import {resolve  , dirname} from 'path';
import fs from 'fs';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCluBhH1vCrazJmlEI5wfUqU3yON03adpI",
    authDomain: "codecafe-2d38c.firebaseapp.com",
    projectId: "codecafe-2d38c",
    storageBucket: "codecafe-2d38c.appspot.com",
    messagingSenderId: "866777571485",
    appId: "1:866777571485:web:48f70515046eaec1013474",
    measurementId: "G-4FSMDKMG3Q"
  };
// Construct the path to your service account JSON file
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current module
const __dirname = dirname(__filename);
const serviceAccountPath = resolve(__dirname, 'codecafe-2d38c-firebase-adminsdk-zi2lx-a24e8cd817.json');

// Read the service account JSON file
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK
const app = initializeApp({
  credential: admin.credential.cert(serviceAccount),
  ...firebaseConfig
});

// Initialize Firestore
const db = admin.firestore();
const storage = admin.storage().bucket();


export { db, storage };
