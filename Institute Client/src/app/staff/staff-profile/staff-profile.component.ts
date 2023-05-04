import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent implements OnInit{

  profile:any= []

  constructor(private ss:StaffService) {}

  ngOnInit(): void {
    this.ss.staffIndex().then(res=>res.json()).then(data=>this.getData(data))
  }

  getData(x:any) {
    this.profile=x
  }

}
