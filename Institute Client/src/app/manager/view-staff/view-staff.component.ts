import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css']
})
export class ViewStaffComponent implements OnInit {

  id:any=''
  staff:any={}
  batches:any=[]

  constructor(private ar:ActivatedRoute, private ms:ManagerService, private fb:FormBuilder, private r:Router){
    ar.params.subscribe(data=>this.id=data['id'])
  }

  
  assignBatchForm = this.fb.group({
    batch:'',
  })

  ngOnInit(): void {

    this.ms.viewStaff(this.id).then(r=>r.json()).then(data=>this.getData(data))
    this.ms.getBatches().then(r=>r.json()).then(data=>this.getBatches(data))

  }

  batchSubmit () {
    if (this.assignBatchForm.valid) {

      this.ms.assignStaffBatch(this.id,this.assignBatchForm.value.batch)
      .then(res => res.json()).then( data => {
        console.log(data.msg)
        if (data.msg === 'Staff already added in this Batch') {
          alert(data.msg)
        } 
        else if (data.message === "Staff Added to Batch") {
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

  getData (staf:any) {
    this.staff=staf
  }

  getBatches (batch:any) {
    this.batches=batch
  }


}
