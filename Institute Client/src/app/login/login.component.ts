import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user:any=''

  constructor(private router: Router, private ls: LoginServiceService, private fb: FormBuilder) {

  }

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })

  login() {

    if (this.loginForm.valid) {

      this.user=this.loginForm.value.username
      

      this.ls.getToken(this.loginForm.value).then((r) => r.json()).then(data => {
        if (data['token']) {
          // localStorage.removeItem('token')
          localStorage.setItem('token', data['token']) // store token in localstore
          localStorage.setItem('refresh', data['refresh']) // store refresh token in localstore
          if (data['user_type'] == 'manager') {
            localStorage.setItem('user', 'Admin')
            alert("Login Successfull !")
            this.router.navigate(['manager'])
          } 
          else if (data['user_type'] == 'student') {
            localStorage.setItem('user', this.user)
            alert("Login Successfull !")
            this.router.navigate(['student'])
          }
          else {
            localStorage.setItem('user', this.user)
            alert("Login Successfull !")
            this.router.navigate(['staff'])
          }
        }
        else {
          alert(data['error']) 
        }
      })
    }
    else {
      alert('Login Failed !')
    }

  }

}
