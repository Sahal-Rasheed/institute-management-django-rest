import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { StudentComponent } from './student/student.component';
import { StudHomeComponent } from './student/stud-home/stud-home.component';
import { StudBatchComponent } from './student/stud-batch/stud-batch.component';
import { StudProfileComponent } from './student/stud-profile/stud-profile.component';
import { StudProfileEditComponent } from './student/stud-profile-edit/stud-profile-edit.component';
import { StaffComponent } from './staff/staff.component';
import { StaffHomeComponent } from './staff/staff-home/staff-home.component';
import { StaffClassComponent } from './staff/staff-class/staff-class.component';
import { StaffProfileComponent } from './staff/staff-profile/staff-profile.component';
import { StaffProfileEditComponent } from './staff/staff-profile-edit/staff-profile-edit.component';
import { AssignmentSubmitComponent } from './student/assignment-submit/assignment-submit.component';
import { ViewAssignmentsComponent } from './staff/view-assignments/view-assignments.component';
import { InboxComponent } from './student/inbox/inbox.component';
import { AnnoucementsComponent } from './manager/annoucements/annoucements.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerComponent,
    RegisterComponent,
    HomeComponent,
    CourseComponent,
    ViewCourseComponent,
    AddCourseComponent,
    ViewStudentComponent,
    ViewStaffComponent,
    BatchesComponent,
    AddBatchComponent,
    ViewBatchComponent,
    StudentComponent,
    StudHomeComponent,
    StudBatchComponent,
    StudProfileComponent,
    StudProfileEditComponent,
    StaffComponent,
    StaffHomeComponent,
    StaffClassComponent,
    StaffProfileComponent,
    StaffProfileEditComponent,
    AssignmentSubmitComponent,
    ViewAssignmentsComponent,
    InboxComponent,
    AnnoucementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
