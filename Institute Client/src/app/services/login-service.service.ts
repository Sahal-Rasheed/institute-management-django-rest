import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor() { 

  }

  getToken(data:any){
    
    return fetch('http://127.0.0.1:8000/user_login/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      // .then((r) => r.json()).then(data=>console.log(data))
  }

  refreshToken(){
    const refreshToken = localStorage.getItem('refresh');

    return fetch('http://127.0.0.1:8000/api/token/refresh/', {
      method: 'POST',
      body: JSON.stringify({refresh: refreshToken}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }



  
  


}
