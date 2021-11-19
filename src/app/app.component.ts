import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from './services/firebase.service';
import { UserDetails } from './user-details.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public userForm: FormGroup;
  title = 'piecode-thilak';
  isSignedIn = false;
  isAdmin = false;
  userDetails: UserDetails = new UserDetails;
  email: any = this.userDetails.email;
  password: any = this.userDetails.password;
  role: any = this.userDetails.email;
  address: any = this.userDetails.password;
  phone: any = this.userDetails.email;
  name: any = this.userDetails.password;


  @Output() isLogout = new EventEmitter<void>()
  constructor(
    public firebaseService: FirebaseService,
    public formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      role: [''],
      address: [''],
      phone: [''],
    })

  }
  ngOnInit() {
    if (this.role === 'Admin') {
      this.isAdmin = true;
    }
    if (localStorage.getItem('user') !== null)
      this.isSignedIn = true
    else
      this.isSignedIn = false
  }


  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email, password)
    if (this.firebaseService.isLoggedIn)
      this.isSignedIn = true
    const dataFromDB = await this.firebaseService.getUsers();
    const filterData: any =[];
    for (let i = 0; i < dataFromDB.length; i++) {
      if (dataFromDB[i].email === email) {
        filterData.push(i);
      }
    }
    this.email = dataFromDB[filterData[0]].email;
    this.password = dataFromDB[filterData[0]].password;
    this.role = dataFromDB[filterData[0]].role;
    this.name = dataFromDB[filterData[0]].name;
    this.address = dataFromDB[filterData[0]].address;
    this.phone = dataFromDB[filterData[0]].phone;
    if (this.role === 'Admin') {
      this.isAdmin = true;
    }
  }

  async onSubmit() {
    await this.firebaseService.signup(this.userForm.value.email, this.userForm.value.password);
    if (this.firebaseService.isLoggedIn)
      this.isSignedIn = true
    this.email = this.userForm.value.email;
    this.password = this.userForm.value.password;
    this.role = this.userForm.value.role;
    this.name = this.userForm.value.name;
    this.address = this.userForm.value.address;
    this.phone = this.userForm.value.phone;
    if (this.role === 'Admin') {
      this.isAdmin = true;
    }
    await this.firebaseService.createUsers(this.userForm.value);
  }

  handleLogout() {
    this.isSignedIn = false
  }

  logout() {
    this.firebaseService.logout()
    this.isLogout.emit()
    location.reload();
  }
}
