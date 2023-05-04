import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';


@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.css']
})
export class ViewAssignmentsComponent implements OnInit{

  id:any=''
  assignments:any=[]

  constructor(private ss:StaffService, private ar:ActivatedRoute) {
    ar.params.subscribe(data=>this.id=data['id'])
  }

  ngOnInit(): void {
    this.ss.submittedAssignments(this.id).then(r=>r.json()).then(data=>this.getData(data))
  }

  getData(x:any) {
    this.assignments=x.data
    console.log(this.assignments)
  }

  approve (e:any) {
    let id = e.target.id
    this.ss.approveAssignment(id).then(r=>r.json()).then(data=>{
      alert(data.msg)
    })
    window.location.reload()
  }
  
}
