import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(18)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.pattern('[0-9]*'), Validators.min(18)]),
    phoneNum: new FormControl('', [Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)])
  });

  private isCreated: boolean = false;
  private userExist: boolean = false;


  constructor() { }





  ngOnInit() {

    this.isCreated = this.profileForm.valid;
  }
  get f() { return this.profileForm.controls; }
  createUser() {
    alert(JSON.stringify([this.profileForm.value, this.profileForm.valid]));
  }
}

