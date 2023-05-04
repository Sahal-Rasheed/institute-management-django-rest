import { Component } from '@angular/core';
import { LoginServiceService } from './services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InstituteClient';

  constructor(private ls:LoginServiceService) {
    setInterval(() => {
      this.ls.refreshToken().then(response => {
        if (response.ok) {
          response.json().then(data => {
            localStorage.setItem('token', data.access);
          });
        } else {
       
          console.error(`Failed to refresh token: ${response.status} ${response.statusText}`);
        }
      }).catch(error => {
  
        console.error(`Failed to refresh token: ${error}`);
      });
    }, 1200000);
  }

}
