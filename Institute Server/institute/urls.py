"""institute URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
# from django.conf.urls.static import static
# from django.conf import settings

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers

from api.views import *

router = routers.DefaultRouter()
router.register('students', StudentView, basename="students")
router.register('staffs', StaffView, basename="staffs")
router.register('courses', CourseView, basename="courses")
router.register('batches', BatchView, basename="batches")
router.register('student_batch', StudentBatchView, basename="student_batch")
router.register('staff_batch', StaffBatchView, basename="staff_batch")



urlpatterns = [

    path('admin/', admin.site.urls),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('user_login/', UserLoginView.as_view(), name='login'),
    path('student_index/', StudentIndexView.as_view(), name='student_index'),
    path('my_course/', MyCourseView.as_view(), name='my_course'),
    path('my_batch/', MyBatchView.as_view(), name='my_batch'),
    path('staff_index/', StaffIndexView.as_view(), name='staff_index'),
    path('my_class/', MyClassView.as_view(), name='my_class'),
    path('assignment/', AddAssignmentsView.as_view(), name='assignment'),
    path('del_assignment/<int:id>', DeleteAssignmentsView.as_view(), name='del_assignment'),
    path('submit_assignment/<int:id>/', SubmitAssignmentView.as_view(), name='submit_assignment'),
    path('show_assignment/<int:id>', ShowAssignmentsView.as_view(), name='show_assignment'),
    path('approve_assignment/<int:id>', AssignmentApprove.as_view(), name='approve_assignment'),
    path('assignment_announcement/', AssignmentsAnnoucements.as_view(), name='assignment_announcement'),
    path('add_announcement/<int:id>', AddAnnouncements.as_view(), name='add_announcement'),
    path('view_announcement/', InboxAnnouncements.as_view(), name='view_announcement'),
    path('my_assignment/', MyAssignmentsView.as_view(), name='my_assignment'),
    path('get_assignment/', GetAssignmentsView.as_view(), name='get_assignment'),

    path('recorded_class/', AddRecordedClassView.as_view(), name='recorded_class'),



    path('context/', ContextView.as_view(), name='context'),

    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

] + router.urls 

urlpatterns += staticfiles_urlpatterns()