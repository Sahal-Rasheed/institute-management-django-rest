import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-stud-profile-edit',
  templateUrl: './stud-profile-edit.component.html',
  styleUrls: ['./stud-profile-edit.component.css']
})
export class StudProfileEditComponent implements OnInit{

  profileForm: FormGroup;
  selectedFile: '' = "";
  data:any=[]

  constructor(private router: Router, private ss: StudentService, private fb: FormBuilder) {
    
    this.profileForm = this.fb.group({
      qualification: '', 
      dob: '', 
      profile_pic: '',
    })

  }

  ngOnInit(): void {
    this.ss.studentIndex().then(r=>r.json()).then(data=>this.getData(data))
  }

  onFileChange(e:any) {
    this.selectedFile = e.target.files[0];
  }

  onSubmit() {
      const formData = new FormData();
      formData.append('qualification', this.profileForm.value.qualification);
      formData.append('dob', this.profileForm.value.dob);
      formData.append('profile_pic', this.selectedFile);
  
      this.ss.addProfile(formData)
        .then(res => {
          console.log(res);
          alert('Profile Saved.');
          this.router.navigate(['student','my-profile'])
        })
        .catch(error => {
          console.error(error);
          alert('Failed to save profile.');
        });
  }

  getData(x:any) {
    this.data=x
  }

}
