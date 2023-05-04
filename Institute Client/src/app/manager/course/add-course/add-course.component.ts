import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {

  courseForm: FormGroup;
  selectedFile: '' = "";

  constructor(private router: Router, private ms: ManagerService, private fb: FormBuilder) {
    
    this.courseForm = this.fb.group({
      course_name: '', 
      description: '', 
      course_pic: '',
      fees: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      duration: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    })

  }

  onFileChange(e:any) {
    this.selectedFile = e.target.files[0];
  }

  onSubmit() {
      const formData = new FormData();
      formData.append('course_name', this.courseForm.value.course_name);
      formData.append('description', this.courseForm.value.description);
      formData.append('course_pic', this.selectedFile);
      formData.append('fees', this.courseForm.value.fees);
      formData.append('duration', this.courseForm.value.duration);
  
      this.ms.addCourse(formData)
        .then(res => {
          console.log(res);
          alert('Course created successfully.');
          this.router.navigate(['manager','course'])
        })
        .catch(error => {
          console.error(error);
          alert('Failed to create course.');
        });
  }
} 


  // courseAdd () {
  //     console.log(this.courseForm.value)

  //   if (this.courseForm.valid) {
  //     this.ms.addCourse(this.courseForm.value).then((r) => r.json()).then(data => {
  //       if (data['course_name']) {
  //         alert('Course Added !')
  //         this.router.navigate(['manager','course'])
  //       }
  //       // else if (data['msg']) {
  //       //   alert(Object.entries(data.msg)[0][1])
  //       // } 
  //       else {
  //         alert('Course Adding Failed !')
  //         // this.router.navigate([''])
  //       }    
  //     })
  //   }
  //   else{
  //     alert('Inavlid Form !')
  //   }
  // }


