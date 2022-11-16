import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";




/* import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig';
//import initializeApp from "firebase/app";

import { auth }from "firebase/auth";
import { storage} from "firebase/storage";
import { db } from "firebase/firestore";
//import { fs } from "firebase"
 */

import { firebaseConfig } from '../firebaseConfig';
initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const inicializarFirebase = () =>{
    initializeApp(firebaseConfig)
}
const fs  = app
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { inicializarFirebase, auth, db, fs, storage };

/* const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();
const fs = firebase
 */

