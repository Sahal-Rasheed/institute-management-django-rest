import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-view-batch',
  templateUrl: './view-batch.component.html',
  styleUrls: ['./view-batch.component.css']
})
export class ViewBatchComponent implements OnInit{

  id:any=''
  error:any=''
  course:any = ''
  teacher:any = ''
  students:any = []

  constructor(private ar:ActivatedRoute, private ms:ManagerService){
    ar.params.subscribe(data=>this.id=data['id'])
  }

  ngOnInit(): void {

    this.ms.viewBatch(this.id).then(r=>r.json()).then(data=>this.getData(data)).catch(error=>this.error=error)

  }

  getData(batch:any){
    this.students = batch.data; // get all student details
    this.course = batch.data[0].course; // get course name
    this.teacher = batch.teacher; // get teacher name
  }


}
 