import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, addDoc, collection } from "firebase/firestore";
import {
    getAuth,
    Auth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, StorageReference, listAll } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID
};

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;
let user: User | null = null;

if (typeof window !== "undefined" && !getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    auth = getAuth();
    firestore = getFirestore();
    onAuthStateChanged(auth, (userData) => {
      user = userData;
    })
}

export const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return error;
    }
}

export const login = async (email: string, password: string) => {
    try {
      let userCredential = await signInWithEmailAndPassword(auth, email, password);
      user = userCredential.user
      return user;
    } catch (error) {
      return error;
    }
}

export const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      return error;
    }
}

export { firebaseApp, auth, firestore, user };

const db = getFirestore();
const d = firebase.firestore();
const storage = getStorage();

export const addUser = async (name: string, email: string) => {
  const userRef = d.collection('users').doc(user?.uid);
  userRef.set({
    name: name,
    email: email,
  });
}

export const setIcon = async (file: File) => {
  const storageRef = ref(storage, `users/${user?.uid}`);
  await uploadBytes(storageRef, file);
}

export const getIcon = async () => {
  const storageRef = ref(storage, `users/${user?.uid}`);
  const url = getDownloadURL(storageRef);
  return url;
}

export const uploadPhoto = async (name: string, file: File) => {
    const storageRef = ref(storage, `images/${name}`);

    await uploadBytes(storageRef, file);

    await addDoc(collection(db, "Images"), {
      fileName: name,
      timestamp: new Date(),
    });
}

export const displayImages = async() => {
  const listRef = ref(storage, 'images/');

  const res = await listAll(listRef);
  const urls = await Promise.all(
    res.items.map((itemRef) => getDownloadURL(itemRef))
  );
  return urls;
}

