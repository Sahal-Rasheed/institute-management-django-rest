import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';


@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent implements OnInit {

  courses:any = []

  batchForm = this.fb.group({
    batch_name:'',
    course:'',
    start_date:'',
    end_date:''
})


  constructor(private r:Router, private ms:ManagerService, private fb:FormBuilder){}


  ngOnInit(): void {

    this.ms.getCourses().then(r=>r.json()).then(data=>this.getData(data))

  }

  getData(course:any){
    this.courses=course
  }

  onSubmit() {
    console.log(this.batchForm.value)
    if (this.batchForm.valid) {
      this.ms.addBatch(this.batchForm.value)
      .then(res => {
        console.log(res)
        alert('Batch Added Successfully')
        this.r.navigate(['manager','batches'])
      })
      .catch(error => {
        console.log(error)
        alert('Batch Adding Failed')
      })
    } 
    else {
      alert('Invalid Form !')
    }
  }



}
