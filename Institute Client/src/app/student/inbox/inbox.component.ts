import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  messages:any=[]
  msg:any=[]

  constructor(private ss:StudentService) {}


  ngOnInit(): void {
    this.ss.inboxAssignmentsMsg().then(r=>r.json()).then(data=>this.getData(data))
    this.ss.inboxMsg().then(r=>r.json()).then(data=>this.getDetails(data))

  }

  getData(x:any) {
    this.messages = x
  }

  getDetails(y:any) {
    this.msg = y
  }

}
 