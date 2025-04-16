import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {throwError} from 'rxjs';
import Swal from 'sweetalert2';
import {usersService} from "../../Services/users.service";
import {AuthService} from "../../Services/AuthService";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {
    userName: '',
    userPassword: '',
  }

  cartProducts: any;
  isCartProductsPresent: boolean = false;

  constructor(private fb: FormBuilder, private _userService: usersService, private authService: AuthService, private router: Router, private _Activatedroute: ActivatedRoute) {
    const rawData = this._Activatedroute.snapshot.queryParamMap.get('my_object');

    if (rawData) {
      this.isCartProductsPresent = true;
      try {
        this.cartProducts = JSON.parse(rawData);
        console.log('Parsed Data:', this.cartProducts);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }

  }

  ngOnInit(): void {
    localStorage.clear();
  }

  onSubmit() {
    if (!this.user.userName) {
      Swal.fire('', 'Please Fill Username', 'warning');
      return;
    } else if (!this.user.userPassword) {
      Swal.fire('', 'Please Fill Password', 'warning');
      return;
    }


    this._userService.login(this.user).subscribe(
      (response: any) => {
        console.log(response)
        this.saveToSession(response);
        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          if (this.isCartProductsPresent) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/home'], {queryParams: {my_object: JSON.stringify(this.cartProducts)}});
          }
        }
      },
      (error: any) => {
        Swal.fire('Oops', 'Username or Password Incorrect!', 'error');
      }
    );
  }

  saveToSession(data: any) {
    localStorage.setItem('roles', JSON.stringify(data.user.role));
    localStorage.setItem('jwtToken', data.jwtToken);
    localStorage.setItem('userName', data.user.userName);
    localStorage.setItem('tel', data.user.tel);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('address', data.user.adress);
    localStorage.setItem('role', data.user.role[0].roleName);
    localStorage.setItem('userID', data.user.userId);
  }


}


