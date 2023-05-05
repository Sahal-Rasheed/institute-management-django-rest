import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor() { }

  registerUser(data:any){
    
    return fetch('https://institutemanagement.onrender.com/register/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  getStudents(){
    
    return fetch('https://institutemanagement.onrender.com/students/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  getStaffs(){
    
    return fetch('https://institutemanagement.onrender.com/staffs/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  getCourses(){
    
    return fetch('https://institutemanagement.onrender.com/courses/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  viewCourse(id:any){
    
    return fetch(`https://institutemanagement.onrender.com/courses/${id}/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  // addCourse(data: any) {
  //   console.log(data.course_pic.file)
  //   const formData = new FormData();
  //   formData.append('course_name', data.course_name);
  //   formData.append('description', data.description);
  //   formData.append('course_pic',  data.course_pic.replace(/\\/g, '\\\\'));
  //   formData.append('fees', data.fees);
  //   formData.append('duration', data.duration);
  
  //   return fetch('https://institutemanagement.onrender.com/courses/', {
  //     method: 'POST',
  //     body: formData,
  //     headers: {
        
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     },
  //   })
  // }

  addCourse(formData: FormData) {
    
    return fetch('https://institutemanagement.onrender.com/courses/', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
  }

  viewStudent(id:any){
    
    return fetch(`https://institutemanagement.onrender.com/students/${id}/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  deleteStudent(id:any){
    
    return fetch(`https://institutemanagement.onrender.com/students/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }
 
  assignCourse(data:any,id:any){
    
    return fetch(`https://institutemanagement.onrender.com/students/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  viewStaff(id:any){
    
    return fetch(`https://institutemanagement.onrender.com/staffs/${id}/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  deleteStaff(id:any){
    
    return fetch(`https://institutemanagement.onrender.com/staffs/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  getBatches(){
    
    return fetch('https://institutemanagement.onrender.com/batches/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  addBatch(data:any){
    
    return fetch('https://institutemanagement.onrender.com/batches/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  viewBatch(id:any){
    
    return fetch(`https://institutemanagement.onrender.com/student_batch/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  assignBatch(u_id:any,b_id:any){
    
    return fetch(`https://institutemanagement.onrender.com/student_batch/${u_id}/create_student_batch?batch=${b_id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  assignStaffBatch(u_id:any,b_id:any){
    
    return fetch(`https://institutemanagement.onrender.com/staff_batch/${u_id}/create_staff_batch?batch=${b_id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  addAnnouncement(data:any,id:any){

    console.log(data)
    
    return fetch(`https://institutemanagement.onrender.com/add_announcement/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }

  deleteBatch(id:any){
    
    return fetch(`https://institutemanagement.onrender.com/batches/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }
  
}
