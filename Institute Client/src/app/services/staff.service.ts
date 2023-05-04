import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor() { }

  staffIndex(){
    
    return fetch('http://127.0.0.1:8000/staff_index/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

 myClass(){
    
    return fetch('http://127.0.0.1:8000/my_class/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  addProfile(formData: FormData) {
    
    return fetch('http://127.0.0.1:8000/staff_index/', {
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

  getAssignments(){
    
    return fetch(`http://127.0.0.1:8000/assignment/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  delAssignments(id:any){
    
    return fetch(`http://127.0.0.1:8000/del_assignment/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  addAssignment(data:any,batch:string) {
    
    return fetch(`http://127.0.0.1:8000/assignment/?batch=${batch}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
  }

  submittedAssignments(id:any){
    
    return fetch(`http://127.0.0.1:8000/show_assignment/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  approveAssignment(id:any){
    
    return fetch(`http://127.0.0.1:8000/approve_assignment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  addVideo(formData: FormData,batch:any) {
    
    return fetch(`http://127.0.0.1:8000/recorded_class/?batch=${batch}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
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

}
