import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.css']
})
export class StaffHomeComponent implements OnInit{

  data:any = []
  context:any = []

  constructor(private ss:StaffService) {}

  ngOnInit(): void {
    this.ss.staffIndex().then(res=>res.json()).then(data=>this.getData(data))

    this.ss.context().then(r => r.json()).then(data => this.getContext(data))
  }

  getData(x:any) {
    this.data = x
  }

  getContext(context:any){
    this.context=context
  } 

}
