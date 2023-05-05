import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-stud-profile',
  templateUrl: './stud-profile.component.html',
  styleUrls: ['./stud-profile.component.css']
})
export class StudProfileComponent implements OnInit{

  profile:any = []

  constructor(private ss:StudentService) {}

  ngOnInit(): void {
    this.ss.studentIndex().then(res=>res.json()).then(data=>this.getData(data))
  }

  getData(profile:any) {
    console.log(profile)
    this.profile = profile
  }
}
