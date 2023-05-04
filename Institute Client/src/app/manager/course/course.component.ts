import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses:any=[]
  user:any=''

  constructor(private ms:ManagerService, private router:Router){}

  ngOnInit(): void {
    this.ms.getCourses().then(r=>r.json()).then(data=>this.getData(data))
    this.user=localStorage.getItem('user')

  } 

  getData(course:any){
    this.courses=course
    console.log(this.courses)
  }

  viewCourse(e:any) {
    let id=e.target.id
    if (localStorage.getItem('user')==='Admin') {
      this.router.navigate(['manager','view-course',id]);
    }
    else {
      this.router.navigate(['student','view-course',id]);
    }
  }

  addCourse() {
    this.router.navigate(['manager','add-course',]);
  }

}
