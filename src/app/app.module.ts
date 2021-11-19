import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { FirebaseService } from './services/firebase.service';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      databaseURL: "https://piecode-43cba-default-rtdb.firebaseio.com",
      apiKey: "AIzaSyDWK_w7PckdI1Api5LwDXQtMBitN3s5J2I",
      authDomain: "piecode-thilak.firebaseapp.com",
      projectId: "piecode-thilak",
      storageBucket: "piecode-thilak.appspot.com",
      messagingSenderId: "863260894011",
      appId: "1:863260894011:web:b94c3afc3d46cb33c3cd1e"
    }),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }