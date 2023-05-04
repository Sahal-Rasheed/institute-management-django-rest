import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
 
@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {

  id:any=''
  course:any={}

  constructor(private ar:ActivatedRoute, private ms:ManagerService){
    ar.params.subscribe(data=>this.id=data['id'])
  }

  ngOnInit(): void {

    this.ms.viewCourse(this.id).then(r=>r.json()).then(data=>this.getData(data))
  }

  getData(course:any){
    this.course=course
  }

}
