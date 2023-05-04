import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit{

  batches:any=[]

  constructor(private ms:ManagerService, private r:Router){}

  ngOnInit(): void {
    this.ms.getBatches().then(r=>r.json()).then(data=>this.getData(data))

  } 

  getData(batches:any){
    this.batches=batches
  }

  addBatch() {
    this.r.navigate(['manager','add-batch',]);
  }

  viewBatch(e:any) {
    let id=e.target.id
    this.r.navigate(['manager','view-batch',id]);
  }

  delBatch(e:any) {
    let id = e.target.id
    this.ms.deleteBatch(id).then(response => response.json)
    .then((data) => {
      alert('Batch Deleted Successfully')
      window.location.reload();
    })
    .catch((error) => {
      alert('Batch Deletion Failed!')
    });
  }  

}
