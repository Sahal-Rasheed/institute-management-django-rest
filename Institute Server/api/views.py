from datetime import datetime, timezone

from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework import permissions
from rest_framework import status
from rest_framework.decorators import action

from . utils import *
from . permissions import *
from . serializers import *
from . models import *

# Create your views here.

# Register & Login Api

class UserRegisterView(APIView): # Only Manager can Register Staff or Stud / Manager should Login First
    permission_classes = [IsManager]

    def post(self,request,*args,**kwrags):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            send_mail(
            'ABC Institute',
            f'Thank you for registering with us, Your User Name is: {request.data.get("username")} and Password is: {request.data.get("password")}',
            settings.EMAIL_HOST_USER,
            [request.data.get("email")]
            )

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'msg':serializer.errors}, status=status.HTTP_404_NOT_FOUND)


class UserLoginView(APIView): # Any User Can Login with credentials provided by Manager
    def post(self,request,*args,**kwrags):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if not user:
            return Response({'status':'failed','error': 'Invalid Credentials !'}, status=status.HTTP_404_NOT_FOUND)
        
        refresh = RefreshToken.for_user(user)
        token = str(refresh.access_token)
        refresh_token = str(refresh)

        expiry = datetime.fromtimestamp(refresh.payload['exp'], tz=timezone.utc).strftime('%M')

        if user.user_type == 'manager':
            return Response({'token': token, 'user_type':'manager', 'refresh':refresh_token, 'expiry':expiry})
        elif user.user_type == 'student':
            return Response({'token': token, 'user_type':'student', 'refresh':refresh_token, 'expiry':expiry})
        else:
            return Response({'token': token, 'user_type':'staff', 'refresh':refresh_token, 'expiry':expiry})


# Manager Apis

class StudentView(ViewSet): # List all Students , Retrieve single_students_by_userid , Delete Students , And Assign Course to Stud Profile
    permission_classes = [IsManager]
 
    def list(self,request,*args,**kwargs): # http://127.0.0.1:8000/students/
        self.permission_classes = [IsManager] 
        students = CustomUser.objects.filter(user_type='student')
        serializer = StudentStaffUserSerializer(students, many=True)
        return Response(data=serializer.data)
    
    def retrieve(self,request,*args,**kwargs): # http://127.0.0.1:8000/students/user_id/
        id = kwargs.get('pk')
        user = CustomUser.objects.get(id=id)
        student = Student.objects.get(user_id=user.id)
        serializer = StudentSerializer(student)
        return Response(data=serializer.data)  
    
    def update(self,request,*args,**kwargs): # http://127.0.0.1:8000/students/user_id/ - PUT - Assign Course 
        id = kwargs.get('pk')
        user = CustomUser.objects.get(id=id)
        student = Student.objects.get(user_id=user.id)
        data = request.data.copy()
        course_name = data.get('course')
        if course_name:
            try:          
                course = Course.objects.get(course_name=course_name)
                data['course'] = course.course_name
            except Course.DoesNotExist:
                return Response({'error': 'Invalid Course Name'})

        serializer = StudentSerializer(data=data, instance=student, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)  
        else:
            return Response(data=serializer.errors)              

    def destroy(self,request,*args,**kwargs): # http://127.0.0.1:8000/students/user_id/ - DELETE
        id = kwargs.get('pk')
        user = CustomUser.objects.get(id=id)
        user.delete()
        return Response({'msg':'Deleted'})


class StaffView(ViewSet): # List all Staffs , Retrieve single_staff_by_userid , Delete Staffs
    permission_classes = [IsManager]

    def list(self,request,*args,**kwargs): # http://127.0.0.1:8000/staffs/
        self.permission_classes = [IsManager] 
        staffs = CustomUser.objects.filter(user_type='staff')
        serializer = StudentStaffUserSerializer(staffs, many=True)
        return Response(data=serializer.data)
    
    def retrieve(self,request,*args,**kwargs): # http://127.0.0.1:8000/staffs/user_id/
        id = kwargs.get('pk')
        user = CustomUser.objects.get(id=id)
        staff = Staff.objects.get(user_id=user.id)
        serializer = StaffSerializer(staff)
        return Response(data=serializer.data)  

    def destroy(self,request,*args,**kwargs): # http://127.0.0.1:8000/staffs/user_id/ - DELETE
        id = kwargs.get('pk')
        user = CustomUser.objects.get(id=id)
        user.delete()
        return Response({'msg':'Deleted'})


class CourseView(ModelViewSet): # Course CRUD - # http://127.0.0.1:8000/courses/ # All Users Can See The Courses Using this get Url, - We wont provide the url for other crud o/p to other users except manager
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    


class BatchView(ModelViewSet): # Batch CRUD - # http://127.0.0.1:8000/batches/
    serializer_class = BatchSerializer
    queryset = Batch.objects.all()
    permission_classes = [IsManager]

    def create(self, request, *args, **kwargs): # Create Batch & assigning Course to Batch - # http://127.0.0.1:8000/batches/?course=course_id/ - POST 
        # course_id = request.query_params.get('course')
        # course = Course.objects.get(id=course_id)
        data = request.data.copy()
        course_name = data.get('course')
        if course_name:
            try:          
                course = Course.objects.get(course_name=course_name)
                # print(course.id)
                # data['course'] = course.id
            except Course.DoesNotExist:
                return Response({'error': 'Invalid Course Name'})
        del data['course']

        serializer = BatchSerializer(data=data, context={'course':course})
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)


class StudentBatchView(ModelViewSet):
    serializer_class = StudentBatchSerializer
    queryset = StudentBatch.objects.all()
    permission_classes = [IsManager]

    @action(methods=['GET'], detail=True) # http://127.0.0.1:8000/student_batch/user_id/create_student_batch?batch=batch_id
    def create_student_batch(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        print('stud',id)
        try:
            student = Student.objects.get(user_id=id)
        except Student.DoesNotExist:
            return Response({'msg':'No Student Found'})

        batch_id = request.query_params.get('batch')
        print(batch_id)
        try:
            batch = Batch.objects.get(id=batch_id)
        except Batch.DoesNotExist:
            return Response({'msg':'No Batch Found'})
        
        if StudentBatch.objects.filter(student=student).exists():
            if StudentBatch.objects.filter(batch=batch, student=student).exists():
                return Response({'msg':'Student already added in this Batch'})
            else:
                return Response({'msg':'Student already added to a Batch'})
        else:
            StudentBatch.objects.create(batch=batch, student=student)
        return Response({'msg':'Student Added to Batch'})
    
    def retrieve(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        try:
            batch = Batch.objects.get(id=id)
        except Batch.DoesNotExist:
            return Response('No Batch Found')
        
        if StudentBatch.objects.filter(batch_id=batch.id).exists():
           students_b = StudentBatch.objects.filter(batch_id=batch.id)
           student_id = []
           for student in students_b:
               student_id.append(student.student_id)

           students = Student.objects.filter(id__in=student_id) 
           serializer = StudentSerializer(students, many=True)
           staff  = StaffBatch.objects.get(batch_id=batch.id) 
           return Response({'data':serializer.data,'teacher':f'{staff.staff.user.first_name} {staff.staff.user.last_name}'})
        else:
            return Response('No Students')


class StaffBatchView(ModelViewSet):
    serializer_class = StaffBatchSerializer
    queryset = StaffBatch.objects.all()
    permission_classes = [IsManager]

    @action(methods=['GET'], detail=True) # http://127.0.0.1:8000/staff_batch/user_id/create_staff_batch?batch=batch_id
    def create_staff_batch(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        try:
            staff = Staff.objects.get(user_id=id)
        except Staff.DoesNotExist:
            return Response({'msg':'No Staff Found'})

        batch_id = request.query_params.get('batch')
        try:
            batch = Batch.objects.get(id=batch_id)
        except Batch.DoesNotExist:
            return Response({'msg':'No Batch Found'})
        
        if StaffBatch.objects.filter(staff=staff).exists():
            if StaffBatch.objects.filter(batch=batch, staff=staff).exists():
                return Response({'msg':'Staff already added in this Batch'})
            else:
                return Response({'msg':'Staff already added to a Batch'})
        else:
            StaffBatch.objects.create(batch=batch, staff=staff)
            return Response({'msg':'Staff Added to Batch'})
        

class AddAnnouncements(APIView):

    permission_classes = [IsManager]

    def post(self,request,*args,**kwargs):
        id=kwargs.get('id')
        batch = Batch.objects.get(id=id)
        serializer = AnnocementSerializer(data=request.data,context={'batch':batch.id})
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)


# Student Api

class StudentIndexView(APIView):
    permission_classes = [IsStudent]

    def get(self,request,*args,**kwrags): # Student Index Page Based On Token Different Index will Come - http://127.0.0.1:8000/student_index
        user = get_user(request)
        student = Student.objects.get(user_id=user.id)

        try:
            student_batch = StudentBatch.objects.get(student_id=student.id)
            batch_name = student_batch.batch.batch_name
        except StudentBatch.DoesNotExist:
            batch_name = None

        serializer = StudentSerializer(student)
        ser_updated = serializer.data.copy()
        ser_updated['student_batch'] = batch_name

        return Response(data=ser_updated)
    
    def put(self,request,*args,**kwrags): # Student Profile Update - PUT - http://127.0.0.1:8000/student_index
        user = get_user(request)
        student = Student.objects.get(user_id=user.id)

        serializer = StudentSerializer(data=request.data, instance=student, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)  
        else:
            return Response(data=serializer.errors)   


class MyCourseView(APIView):
    permission_classes = [IsStudent]

    def get(self,request,*args,**kwrags): 
        user = get_user(request)
        student = Student.objects.get(user_id=user.id)
        course = Course.objects.get(id=student.course_id)
        serializer = CourseSerializer(course)
        return Response(data=serializer.data)
       

class MyBatchView(APIView):
    permission_classes = [IsStudent]

    def get(self,request,*args,**kwrags): # Students Batch Details with Other Students - http://127.0.0.1:8000/my_batch 
        user = get_user(request)
        student = Student.objects.get(user_id=user.id)

        student_batch = StudentBatch.objects.get(student_id=student.id)

        try:
            students = StudentBatch.objects.filter(batch_id=student_batch.batch_id)
        except StudentBatch.DoesNotExist:
            students = None

        serializer = StudentBatchSerializer(students, many=True)
        staff = StaffBatch.objects.get(batch_id=student_batch.batch_id)
        teacher = f'{staff.staff.user.first_name} {staff.staff.user.last_name}'

        return Response({'data':serializer.data,'teacher':teacher})


class GetAssignmentsView(APIView):

    permission_classes = [IsStudent]

    def get(self,request,*args,**kwargs):
        user = get_user(request)
        student = Student.objects.get(user_id=user.id)
        student_batch = StudentBatch.objects.get(student_id=student.id)
        assignment = Assignments.objects.filter(batch_id=student_batch.batch_id)
        serializer = AssignmentSerializer(assignment,many=True)
        return Response(data=serializer.data)


class SubmitAssignmentView(APIView):

    permission_classes = [IsStudent]   
  
    def post(self, request, *args, **kwargs):
        assignment_id = kwargs.get('id')
        username = request.query_params.get('username')
        user = CustomUser.objects.get(username=username)
        assignment = Assignments.objects.get(id=assignment_id)
        submission, created = AssignmentSubmission.objects.get_or_create(user=user, assignment=assignment)
        serializer = AssignmentSubmissionSerializer(submission, data=request.data)
        if serializer.is_valid():
            serializer.save()
            if created:
                message = 'Assignment submitted'
            else:
                message = 'Assignment updated'
            return Response({'data': serializer.data, 'msg': message})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyAssignmentsView(APIView):
    permission_classes = [IsStudent]   

    def get(self,request,*args,**kwargs):
        username = request.query_params.get('username')
        user = CustomUser.objects.get(username=username)
        assignment = AssignmentSubmission.objects.filter(user_id=user.id)
        serializer = AssignmentSubmissionSerializer(assignment,many=True)
        return Response({'data':serializer.data})
    

class AssignmentsAnnoucements(APIView):

    permission_classes = [IsStudent]        

    def get(self,request,*args,**kwargs):
        username = request.query_params.get('username')
        user = CustomUser.objects.get(username=username)
        announcement = Announcement.objects.filter(user_id=user.id)
        serializer = AnnocementSerializer(announcement,many=True)
        return Response(data=serializer.data)

class InboxAnnouncements(APIView):

    permission_classes = [IsStudent]

    def get(self,request,*args,**kwargs):
        username = request.query_params.get('username')
        user = CustomUser.objects.get(username=username)
        student = Student.objects.get(user_id=user.id)
        student_batch = StudentBatch.objects.get(student_id=student.id)
        batch = Batch.objects.get(id=student_batch.batch_id)
        annoucements = Announcement.objects.filter(batch_id=batch.id)
        serializer = AnnocementSerializer(annoucements,many=True)
        return Response(data=serializer.data)

    
# Staff Api

class StaffIndexView(APIView):
    permission_classes = [IsTeacher]

    def get(self,request,*args,**kwrags): # Staff Index Page Based On Token Different Index will Come - http://127.0.0.1:8000/staff_index  
        user = get_user(request)
        staff = Staff.objects.get(user_id=user.id)

        try:
            staff_batch = StaffBatch.objects.get(staff_id=staff.id)
            batch_name = staff_batch.batch.batch_name
        except StudentBatch.DoesNotExist:
            batch_name = None

        serializer = StaffSerializer(staff)
        ser_updated = serializer.data.copy()
        ser_updated['staff_batch'] = batch_name

        return Response(data=ser_updated)
    
    def put(self,request,*args,**kwrags): # Staff Profile Update - PUT - http://127.0.0.1:8000/staff_index
        user = get_user(request)
        staff = Staff.objects.get(user_id=user.id)

        serializer = StaffSerializer(data=request.data, instance=staff, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)  
        else:
            return Response(data=serializer.errors)   
        

class MyClassView(APIView):
    permission_classes = [IsTeacher]

    def get(self,request,*args,**kwrags): # Staffs Batch Details with their Students - http://127.0.0.1:8000/my_class
        user = get_user(request)
        staff = Staff.objects.get(user_id=user.id)

        staff_batch = StaffBatch.objects.get(staff_id=staff.id)

        try:
            students = StudentBatch.objects.filter(batch_id=staff_batch.batch_id)
        except StudentBatch.DoesNotExist:
            students = None

        serializer = StudentBatchSerializer(students, many=True)

        return Response({'data':serializer.data,'batch':staff_batch.batch.batch_name})
    

class AddAssignmentsView(APIView):

    permission_classes = [IsTeacher]

    def get(self,request,*args,**kwargs):
        user = get_user(request)
        staff = Staff.objects.get(user_id=user.id)
        staff_batch = StaffBatch.objects.get(staff_id=staff.id)
        assignment = Assignments.objects.filter(batch_id=staff_batch.batch_id)
        serializer = AssignmentSerializer(assignment,many=True)
        return Response(data=serializer.data)

    def post(self,request,*args,**kwargs):
        batch_name = request.query_params.get('batch')
        batch = Batch.objects.get(batch_name=batch_name)
        serializer = AssignmentSerializer(data=request.data, context={'batch':batch})
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'msg':'Assignment Added'})
        else:
            return Response({'msg':'Assignment Adding Failed'})


class AddRecordedClassView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self,request,*args,**kwargs):
        user = get_user(request)
        if user.user_type == 'staff':
            staff = Staff.objects.get(user_id=user.id)
            staff_batch = StaffBatch.objects.get(staff_id=staff.id)
            r_class = RecordedClass.objects.filter(batch_id=staff_batch.batch_id)
        elif user.user_type == 'student':
            student = Student.objects.get(user_id=user.id)
            student_batch = StudentBatch.objects.get(student_id=student.id)
            r_class = RecordedClass.objects.filter(batch_id=student_batch.batch_id)

        serializer = RecordedClassSerializer(r_class,many=True)
        return Response(data=serializer.data)
    
    def post(self,request,*args,**kwargs):
        batch_name = request.query_params.get('batch')
        batch = Batch.objects.get(batch_name=batch_name)
        serializer = RecordedClassSerializer(data=request.data, context={'batch':batch})
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'msg':'Video Added'})
        else:
            return Response({'msg':'Video Adding Failed'})


class DeleteAssignmentsView(APIView):

    permission_classes = [IsTeacher]        
    
    def delete(self,request,*args,**kwargs):
        id = kwargs.get('id')
        print(id)
        assignment = Assignments.objects.filter(id=id)
        assignment.delete()
        return Response({'data':'Deleted'})

class ShowAssignmentsView(APIView):
    
    permission_classes = [IsTeacher]        

    def get(self,request,*args,**kwargs):
        id = kwargs.get('id')
        assignment = Assignments.objects.get(id=id)
        assignment_submit = AssignmentSubmission.objects.filter(assignment_id=assignment.id)
        serializer = AssignmentSubmissionSerializer(assignment_submit,many=True)
        return Response({'data':serializer.data})


class AssignmentApprove(APIView):

    permission_classes = [IsTeacher]        

    def put(self,request,*args,**kwrags):
        id=kwrags.get('id')
        assignment = AssignmentSubmission.objects.get(id=id)
        assignment.approved = True
        assignment.save()
        return Response({'msg':'Approved'})
 
      
# Common

class ContextView(APIView):
    def get(self,request,*args,**kwrags): #  http://127.0.0.1:8000/context
        student_no = Student.objects.all().count()
        staff_no = Staff.objects.all().count()
        course_no = Course.objects.all().count()
        data = {
            'student_no' : student_no,
            'staff_no' : staff_no,
            'course_no' : course_no
        }
        return Response(data=data)



        


