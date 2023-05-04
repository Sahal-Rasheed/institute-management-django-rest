import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit{

  id:any=''
  student:any={}
  courses:any=[]
  batches:any=[]

  constructor(private ar:ActivatedRoute, private ms:ManagerService, private fb:FormBuilder, private r:Router){
    ar.params.subscribe(data=>this.id=data['id'])
  }

  assignCourseForm = this.fb.group({
    course:'',
  })

  assignBatchForm = this.fb.group({
    batch:'',
  })

  

  ngOnInit(): void {

    this.ms.viewStudent(this.id).then(r=>r.json()).then(data=>this.getData(data))
    this.ms.getCourses().then(r=>r.json()).then(data=>this.getCourses(data))
    this.ms.getBatches().then(r=>r.json()).then(data=>this.getBatches(data))
    

  }

  onSubmit () {
    if (this.assignCourseForm.valid) {
      this.ms.assignCourse(this.assignCourseForm.value,this.id)
      .then(res => {
        console.log(res)
        alert('Course Assigned')
        window.location.reload()

      })
      .catch(error => {
        console.log(error)
        alert('Course Not Assigned')
      })
    } else {
      alert('Course Not Assigned')
    }
  }

  batchSubmit () {
    if (this.assignBatchForm.valid) {
 
      this.ms.assignBatch(this.id,this.assignBatchForm.value.batch)
      .then(res => res.json()).then( data => {
        console.log(data.msg)
        if (data.msg === 'Student already added in this Batch') {
          alert(data.msg)
        } 
        else if (data.message === "Student Added to Batch") {
          alert(data.message)
          window.location.reload()
        } 
        else {
          alert(data.msg)
        }   
      })

      .catch(error => {
        console.log(error)
        alert('Batch Not Assigned')
      })
    } else {
      alert('Batch Not Assigned')
    }
  }

  getData (stud:any) {
    this.student=stud
  }

  getCourses (course:any) {
    this.courses=course
  }

  getBatches (batch:any) {
    this.batches=batch
  }


}
