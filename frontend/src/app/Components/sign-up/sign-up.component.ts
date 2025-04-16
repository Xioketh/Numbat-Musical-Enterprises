import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import {usersService} from "../../Services/users.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  userNameValidate: boolean = false;
  userPasswordValidate: boolean = false;
  adressValidate: boolean = false;
  emailValidate: boolean = false;
  telValidate: boolean = false;
  userConfirmPasswordValidate: boolean = false;
  passwordAndConfirmPasswordValidate: boolean = false;

  user: any = {
    userName: '',
    userPassword: '',
    adress: '',
    email: '',
    tel: '',
    userConfirmPassword: ''
  }

  constructor(private _userService: usersService) { }

  onSubmit() {
    // console.log(this.user);

    if (this.validateForm()) {
      return;
    }


    this._userService.registerUser(this.user).subscribe(
      (response: any) => {
        this.user = {
          userName: '',
          userPassword: '',
          adress: '',
          email: '',
          tel: '',
          userConfirmPassword: ''
        }
        Swal.fire('Registerd!', '', 'success');
      },
      (error: any) => {
        // Swal.fire('Oops', 'Username or Password Incorrect!', 'error');
      }
    );

  }


  validateForm() {
    // console.log(this.user);

    this.userNameValidate = this.user.userName.trim() === '';
    this.adressValidate = this.user.adress.trim() === '';
    this.emailValidate = this.user.email === '';
    this.telValidate = this.user.tel.trim() === '';
    this.userPasswordValidate = this.user.userPassword.trim() === '';
    this.userConfirmPasswordValidate = this.user.userConfirmPassword.trim() === '';

    if (this.user.userPassword.trim() === this.user.userConfirmPassword.trim()) {
      this.passwordAndConfirmPasswordValidate = false;
    } else {
      this.passwordAndConfirmPasswordValidate = true;
    }

    return (
      this.userNameValidate ||
      this.adressValidate ||
      this.emailValidate ||
      this.telValidate ||
      this.userPasswordValidate ||
      this.userConfirmPasswordValidate ||
      this.passwordAndConfirmPasswordValidate
    );

  }

}
