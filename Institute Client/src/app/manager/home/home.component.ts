import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  students:any=[]
  staffs:any=[]
  courses:any=[]

  constructor(private ms:ManagerService, private r:Router){}

  ngOnInit(): void {
    this.ms.getStudents().then(r=>r.json()).then(data=>this.getData(data))
    this.ms.getStaffs().then(r=>r.json()).then(data=>this.getStaffData(data))
    this.ms.getCourses().then(r=>r.json()).then(data=>this.getCourseData(data))


  }

  getData(stud:any){
    this.students=stud
  }

  getStaffData(staff:any){
    this.staffs=staff
  }

  getCourseData(course:any){
    this.courses=course
  }

  viewStud(e:any) {
    let id=e.target.id
    this.r.navigate(['manager','view-student',id]);
  }

  viewStaf(e:any) {
    let id=e.target.id
    this.r.navigate(['manager','view-staff',id]);
  }

  delStudent(e:any) {
    let id=e.target.id
    this.ms.deleteStudent(id)
    .then(res =>{
      console.log(res);
      alert('User deleted successfully.');    
      window.location.reload()
    })
    .catch(error =>{
      console.error(error);
      alert('User deletion Failed');
    })
  }

  delStaff(e:any) {
    let id=e.target.id
    this.ms.deleteStaff(id)
    .then(res =>{
      console.log(res);
      alert('User deleted successfully.');    
      window.location.reload()
    })
    .catch(error =>{
      console.error(error);
      alert('User deletion Failed');
    })
  }

}

