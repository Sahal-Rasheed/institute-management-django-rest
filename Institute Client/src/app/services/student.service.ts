import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  myCourse(){
    
    return fetch('http://127.0.0.1:8000/my_course/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  studentIndex(){
    
    return fetch('http://127.0.0.1:8000/student_index/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

 myBatchStudent(){
    
    return fetch('http://127.0.0.1:8000/my_batch/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  addProfile(formData: FormData) {
    
    return fetch('http://127.0.0.1:8000/student_index/', {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
  }

  context(){
    
    return fetch('http://127.0.0.1:8000/context/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }

  getAssignment(){
    
    return fetch(`http://127.0.0.1:8000/get_assignment/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  submitAssignment(formData: FormData,id:any) {
    let user = localStorage.getItem('user')
    return fetch(`http://127.0.0.1:8000/submit_assignment/${id}/?username=${user}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
  }

  inboxAssignmentsMsg(){

    let username = localStorage.getItem('user')
    
    return fetch(`http://127.0.0.1:8000/assignment_announcement/?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  inboxMsg(){

    let username = localStorage.getItem('user')
    
    return fetch(`http://127.0.0.1:8000/view_announcement/?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  submittedVideos(){
    
    return fetch(`http://127.0.0.1:8000/recorded_class/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }


  // myAssignmentStatus(){
  //   let user = localStorage.getItem('user')
  //   return fetch(`http://127.0.0.1:8000/my_assignment/?username=${user}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     },
  //   })
  // }


  
}
