import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-assignment-submit',
  templateUrl: './assignment-submit.component.html',
  styleUrls: ['./assignment-submit.component.css']
})
export class AssignmentSubmitComponent {

  id:any=''
  assignmentForm: FormGroup;
  selectedFile: '' = "";

  constructor(private ar:ActivatedRoute, private router: Router, private ss: StudentService, private fb: FormBuilder){
    ar.params.subscribe(data=>this.id=data['id'])

    this.assignmentForm = this.fb.group({
      student: '',  
      submission_file: '',
    })
  }

  onFileChange(e:any) {
    this.selectedFile = e.target.files[0];
  }

  onSubmit() {
      const formData = new FormData();
      formData.append('student', this.assignmentForm.value.student);
      formData.append('submission_file', this.selectedFile);
  
      this.ss.submitAssignment(formData,this.id)
        .then(res => res.json())
        .then(data =>  
        {
          console.log(data.msg);
          alert(data.msg);
          this.router.navigate(['student','my-batch'])
        })
        .catch(error => {
          console.error(error);
          alert('Failed to submit.');
        });
  }


}
