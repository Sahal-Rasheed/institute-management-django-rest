import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stud-batch',
  templateUrl: './stud-batch.component.html',
  styleUrls: ['./stud-batch.component.css']
})
export class StudBatchComponent implements OnInit {

  batch_data:any=[]
  batch_teacher:any=''
  assignments:any=[]
  videos:any=[]


  constructor(private ss:StudentService, private r:Router) {}

  ngOnInit(): void {
    this.ss.myBatchStudent().then(r => r.json()).then(data => this.getData(data))
    this.ss.getAssignment().then(r => r.json()).then(data => this.getAssignment(data))
    this.ss.submittedVideos().then(res=>res.json()).then(data=>this.getVideo(data))
  }

  getData(batch:any){
    console.log(batch)
    this.batch_data=batch.data
    this.batch_teacher=batch.teacher
  }

  getAssignment(assignment:any){
    this.assignments=assignment
  }

  getVideo(video:any) {
    this.videos=video
  }

  assignmentSubmit(e:any) {
    let id = e.target.id
    this.r.navigate(['student','assignment-submit',id])
  }

}
