import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-annoucements',
  templateUrl: './annoucements.component.html',
  styleUrls: ['./annoucements.component.css']
})
export class AnnoucementsComponent implements OnInit {

  batches:any=[]

  constructor(private fb:FormBuilder, private r:Router,private ms:ManagerService) {}

  announcementForm = this.fb.group({
    text:'',
    batch:''
  })

  ngOnInit(): void {
    this.ms.getBatches().then(r=>r.json()).then(data=>this.getBatches(data))   
  }

  getBatches(x:any) {
    this.batches=x
  }

  onSubmit () {
    if (this.announcementForm.valid) {
      this.ms.addAnnouncement(this.announcementForm.value,this.announcementForm.value.batch)
      .then(res => {
        console.log(res)
        alert('Announcement posted')
        this.r.navigate(['manager'])

      })
      .catch(error => {
        console.log(error)
        alert('Announcement not posted')
      })
    } else {
      alert('Announcement not posted')
    }
  } 
}
