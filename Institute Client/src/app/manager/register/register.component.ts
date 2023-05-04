import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router, private ms: ManagerService, private fb: FormBuilder) {

  }

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    first_name:'',
    last_name:'',
    email:'',
    user_type:['student'],
  })

  register () {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      this.ms.registerUser(this.registerForm.value).then((r) => r.json()).then(data => {
        if (data['username']) {
          alert('Registration Successfull !')
          this.router.navigate(['manager'])
        }
        else if (data['msg']) {
          alert(Object.entries(data.msg)[0][1])
        } 
        else {
          alert('Registration Failed! Not Authorized !')
          this.router.navigate([''])
        }    
      })
    }
    else{
      alert('Inavlid Form !')
    }
  }
}
