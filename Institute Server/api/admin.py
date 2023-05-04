from django.contrib import admin
from . models import *

# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Course)
admin.site.register(Batch)
admin.site.register(Staff)
admin.site.register(Student)
admin.site.register(StaffBatch)
admin.site.register(StudentBatch)
admin.site.register(Assignments)
admin.site.register(AssignmentSubmission)
admin.site.register(Announcement)
admin.site.register(RecordedClass)


