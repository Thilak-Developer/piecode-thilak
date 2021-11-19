import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDetails } from '../user-details.model';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { AngularFireList } from '@angular/fire/compat/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  
  databaseURL: "https://piecode-43cba-default-rtdb.firebaseio.com",
  apiKey: "AIzaSyDWK_w7PckdI1Api5LwDXQtMBitN3s5J2I",
  authDomain: "piecode-thilak.firebaseapp.com",
  projectId: "piecode-thilak",
  storageBucket: "piecode-thilak.appspot.com",
  messagingSenderId: "863260894011",
  appId: "1:863260894011:web:b94c3afc3d46cb33c3cd1e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  messages!: AngularFireList<any>;
  isLoggedIn = false

  constructor(public firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  }

  async signup(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  }

  logout() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }

  async getUsers() {
    const usersCollectionRef = collection(db, "listdetails");
    const data = await getDocs(usersCollectionRef);
    const dataFinal = data.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      role: doc.data().role,
      address: doc.data().address,
      phone: doc.data().phone,
      email: doc.data().email,
      password: doc.data().password,
    }))
    console.log('dsfdsfds', dataFinal);
    return dataFinal;
  }

  createUsers(userDetails: UserDetails) {
    console.log(userDetails);
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('listdetails').add(userDetails).then(response => {
        console.log(response);
      })
    })
  }






}
