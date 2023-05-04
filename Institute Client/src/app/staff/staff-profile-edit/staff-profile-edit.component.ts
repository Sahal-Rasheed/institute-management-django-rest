import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff-profile-edit',
  templateUrl: './staff-profile-edit.component.html',
  styleUrls: ['./staff-profile-edit.component.css']
})
export class StaffProfileEditComponent implements OnInit{

  profileForm: FormGroup;
  selectedFile: '' = "";
  data:any=[]

  constructor(private router: Router, private ss: StaffService, private fb: FormBuilder) {
    
    this.profileForm = this.fb.group({
      qualification: '',  
      profile_pic: '',
      role: '',
      phone_number: '',
    })

  }

  ngOnInit(): void {
    this.ss.staffIndex().then(r=>r.json()).then(data=>this.getData(data))
  }

  onFileChange(e:any) {
    this.selectedFile = e.target.files[0];
  }

  onSubmit() {
      const formData = new FormData();
      formData.append('qualification', this.profileForm.value.qualification);
      formData.append('role', this.profileForm.value.role);
      formData.append('phone_number', this.profileForm.value.phone_number);
      formData.append('profile_pic', this.selectedFile);
  
      this.ss.addProfile(formData)
        .then(res => {
          console.log(res);
          alert('Profile Saved.');
          this.router.navigate(['staff','my-profile'])
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
