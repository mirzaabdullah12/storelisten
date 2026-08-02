import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
  apiKey:            'AIzaSyAZM3TXFbD-DCaVeJmDjyq0qRAEHDC9hPs',
  authDomain:        'login-3040d.firebaseapp.com',
  projectId:         'login-3040d',
  storageBucket:     'login-3040d.firebasestorage.app',
  messagingSenderId: '151187096336',
  appId:             '1:151187096336:web:8c7f1dfc275a40e79f1b95',
}

const app  = initializeApp(firebaseConfig)
export const auth = getAuth(app)

const googleProvider    = new GoogleAuthProvider()
const microsoftProvider = new OAuthProvider('microsoft.com')

export const loginEmail     = (email, pw) => signInWithEmailAndPassword(auth, email, pw)
export const signupEmail    = (email, pw) => createUserWithEmailAndPassword(auth, email, pw)
export const loginGoogle    = ()          => signInWithPopup(auth, googleProvider)
export const loginMicrosoft = ()          => signInWithPopup(auth, microsoftProvider)
export const logout         = ()          => signOut(auth)
export const onAuth         = (cb)        => onAuthStateChanged(auth, cb)
