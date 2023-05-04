import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { ManagerComponent } from './manager/manager.component';
import { RegisterComponent } from './manager/register/register.component';
import { HomeComponent } from './manager/home/home.component';
import { CourseComponent } from './manager/course/course.component';
import { ViewCourseComponent } from './manager/course/view-course/view-course.component';
import { AddCourseComponent } from './manager/course/add-course/add-course.component';
import { ViewStudentComponent } from './manager/view-student/view-student.component';
import { ViewStaffComponent } from './manager/view-staff/view-staff.component';
import { BatchesComponent } from './manager/batches/batches.component';
import { AddBatchComponent } from './manager/batches/add-batch/add-batch.component';
import { ViewBatchComponent } from './manager/batches/view-batch/view-batch.component';
import { AnnoucementsComponent } from './manager/annoucements/annoucements.component';

import { StudentComponent } from './student/student.component';
import { StudHomeComponent } from './student/stud-home/stud-home.component';
import { StudBatchComponent } from './student/stud-batch/stud-batch.component';
import { StudProfileComponent } from './student/stud-profile/stud-profile.component';
import { StudProfileEditComponent } from './student/stud-profile-edit/stud-profile-edit.component';
import { AssignmentSubmitComponent } from './student/assignment-submit/assignment-submit.component';
import { InboxComponent } from './student/inbox/inbox.component';

import { StaffComponent } from './staff/staff.component';
import { StaffHomeComponent } from './staff/staff-home/staff-home.component';
import { StaffClassComponent } from './staff/staff-class/staff-class.component';
import { StaffProfileComponent } from './staff/staff-profile/staff-profile.component';
import { StaffProfileEditComponent } from './staff/staff-profile-edit/staff-profile-edit.component';
import { ViewAssignmentsComponent } from './staff/view-assignments/view-assignments.component';

const routes: Routes = [
  {path:'manager',component:ManagerComponent, children: [
    { path:'register', component:RegisterComponent },
    { path:'course', component:CourseComponent },
    { path:'view-course/:id', component: ViewCourseComponent },
    { path:'add-course', component: AddCourseComponent },
    { path:'view-student/:id', component: ViewStudentComponent },
    { path:'view-staff/:id', component: ViewStaffComponent },
    { path:'batches', component: BatchesComponent },
    { path:'add-batch', component: AddBatchComponent },
    { path:'view-batch/:id', component: ViewBatchComponent },
    { path:'add-announcement', component: AnnoucementsComponent },

    { path:'', component:HomeComponent },
  ]},

  {path:'student',component:StudentComponent, children: [
    { path:'course', component:CourseComponent },
    { path:'view-course/:id', component: ViewCourseComponent },
    { path:'my-batch', component:StudBatchComponent },
    { path:'my-profile', component:StudProfileComponent },
    { path:'my-profile-edit', component:StudProfileEditComponent },
    { path:'assignment-submit/:id', component:AssignmentSubmitComponent },
    { path:'inbox', component:InboxComponent },
    
    { path:'', component:StudHomeComponent },
  ]},

  {path:'staff',component:StaffComponent, children: [
    { path:'my-class', component:StaffClassComponent },
    { path:'my-profile', component:StaffProfileComponent },
    { path:'my-profile-edit', component:StaffProfileEditComponent },
    { path:'view-assignment/:id', component:ViewAssignmentsComponent },
    
    { path:'', component:StaffHomeComponent },
  ]},


  {path:'',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
