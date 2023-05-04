# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    choices = (
        ('manager', 'Manager'),
        ('staff', 'Staff'),
        ('student', 'Student'),
    )
    
    user_type    =  models.CharField(max_length=10, choices=choices)
    
    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    
    

class Course(models.Model):
    course_name  =  models.CharField(max_length=100)
    course_pic   =  models.ImageField(upload_to="course_images",null=True)
    description  =  models.TextField()
    fees         =  models.PositiveIntegerField()
    duration     =  models.CharField(max_length=200)
    is_active    =  models.BooleanField(default=True)

    def __str__(self):
        return self.course_name
    

class Batch(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    batch_name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active    =  models.BooleanField(default=True)

    def __str__(self):
        return self.batch_name
    

class Staff(models.Model):
    user          =  models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    role          =  models.CharField(max_length=100,null=True)
    profile_pic   =  models.ImageField(upload_to="staff_images",null=True)
    qualification =  models.CharField(max_length=200, null=True)
    phone_number  =  models.CharField(max_length=20, null=True)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
    
    
class StaffBatch(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("staff","batch")

    def __str__(self):
        return self.batch.batch_name


class Student(models.Model):
    user          =  models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    dob           =  models.DateField(null=True)
    profile_pic   =  models.ImageField(upload_to="student_images",null=True)
    qualification =  models.CharField(max_length=200, null=True)
    course        =  models.ForeignKey(Course, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
    

class StudentBatch(models.Model):
    student       =  models.ForeignKey(Student, on_delete=models.CASCADE)
    batch         =  models.ForeignKey(Batch, on_delete=models.CASCADE)

    class Meta:
        unique_together=("student","batch")

    def __str__(self):
        return self.batch.batch_name
    

class Assignments(models.Model):
    batch         =  models.ForeignKey(Batch, on_delete=models.CASCADE) 
    topic         =  models.CharField(max_length=400)

    def __str__(self):
        return self.topic
    
    
class AssignmentSubmission(models.Model):
    assignment      = models.ForeignKey(Assignments, on_delete=models.CASCADE)
    user            = models.ForeignKey(CustomUser, on_delete=models.CASCADE,null=True)
    student         = models.CharField(max_length=100)
    submission_file = models.FileField(upload_to='assignments')
    approved        = models.BooleanField(default=False)
    submitted_at    = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.assignment.topic
    

class Announcement(models.Model):
    user           = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True,blank=True)
    batch          = models.ForeignKey(Batch, on_delete=models.CASCADE, null=True)
    text           = models.CharField(max_length=255)
    date_created   = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.text
    

class RecordedClass(models.Model):
    batch          = models.ForeignKey(Batch, on_delete=models.CASCADE) 
    video          = models.FileField(upload_to='videos')
    date_created   = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.date_created)

