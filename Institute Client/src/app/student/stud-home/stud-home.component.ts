import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-stud-home',
  templateUrl: './stud-home.component.html',
  styleUrls: ['./stud-home.component.css']
})
export class StudHomeComponent implements OnInit {

  course:any=[]
  data:any=[]
  context:any=[]
  user=localStorage.getItem('user')

  constructor(private ss:StudentService) {}

  ngOnInit(): void {
    this.ss.myCourse().then(r => r.json()).then(data => this.getData(data)).catch(error => console.error(error));
    
    this.ss.studentIndex().then(r => r.json()).then(data => this.getIndex(data))

    this.ss.context().then(r => r.json()).then(data => this.getContext(data))
  }

  getData(course:any){
    this.course=course
  }

  getIndex(x:any){
    this.data=x
  }

  getContext(context:any){
    this.context=context
  }


}
