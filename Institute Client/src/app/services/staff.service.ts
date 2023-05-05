import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor() { }

  staffIndex(){
    
    return fetch('https://institutemanagement.onrender.com/staff_index/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

 myClass(){
    
    return fetch('https://institutemanagement.onrender.com/my_class/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  addProfile(formData: FormData) {
    
    return fetch('https://institutemanagement.onrender.com/staff_index/', {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
  }

  context(){
    
    return fetch('https://institutemanagement.onrender.com/context/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }

  getAssignments(){
    
    return fetch(`https://institutemanagement.onrender.com/assignment/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  delAssignments(id:any){
    
    return fetch(`https://institutemanagement.onrender.com/del_assignment/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  addAssignment(data:any,batch:string) {
    
    return fetch(`https://institutemanagement.onrender.com/assignment/?batch=${batch}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
  }

  submittedAssignments(id:any){
    
    return fetch(`https://institutemanagement.onrender.com/show_assignment/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  approveAssignment(id:any){
    
    return fetch(`https://institutemanagement.onrender.com/approve_assignment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  addVideo(formData: FormData,batch:any) {
    
    return fetch(`https://institutemanagement.onrender.com/recorded_class/?batch=${batch}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
  }

  submittedVideos(){
    
    return fetch(`https://institutemanagement.onrender.com/recorded_class/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

}
