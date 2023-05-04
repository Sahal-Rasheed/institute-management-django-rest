import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-class',
  templateUrl: './staff-class.component.html',
  styleUrls: ['./staff-class.component.css']
})
export class StaffClassComponent implements OnInit{

  class_data:any = []
  assignments:any = []
  data:any= []
  videos:any=[]
  videoForm: FormGroup;
  selectedFile: '' = "";



  constructor(private ss:StaffService, private fb:FormBuilder, private r:Router) {

    this.videoForm = this.fb.group({
      video: '',  
    })

  }

  assignmentForm = this.fb.group({
    topic:''

  })

  onFileChange(e:any) {
    this.selectedFile = e.target.files[0];
  }

  ngOnInit(): void {
    this.ss.myClass().then(res=>res.json()).then(data=>this.getData(data))
    this.ss.getAssignments().then(res=>res.json()).then(data=>this.getAssignment(data))
    this.ss.submittedVideos().then(res=>res.json()).then(data=>this.getVideo(data))
  }

  getData(x:any) {
    this.class_data = x.data
    this.data=x.batch
  }

  getAssignment(y:any) {
    this.assignments = y
  }

  getVideo(z:any) {
    this.videos = z
  }

  onSubmit() {
    this.ss.addAssignment(this.assignmentForm.value,this.class_data['0']['batch'])
    .then(res => {
      console.log(res);
      alert('Assignment Added');
      window.location.reload()
    })
    .catch(error => {
      console.error(error);
      alert('Failed to add assignment');
    });
  }

  deleteAssignment(e:any) {
    let id = e.target.id
    this.ss.delAssignments(id).then(r=>r.json()).then(data=>{
      if (data){
        alert(data.data)
        window.location.reload()
      }
      else {
        alert('Failed')
      }
    }) 
  }

  viewAssignment(e:any) {
    let id = e.target.id
    this.r.navigate(['staff','view-assignment',id])

  }

  Submit() {
    const formData = new FormData();
    formData.append('video', this.selectedFile);

    this.ss.addVideo(formData,this.class_data['0']['batch'])
      .then(res => res.json())
      .then(data =>  
      {
        console.log(data.msg);
        alert(data.msg);
        window.location.reload()
      })
      .catch(error => {
        console.error(error);
        alert('Failed to submit.');
      });
  }
  
}
