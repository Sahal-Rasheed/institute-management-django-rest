from rest_framework import serializers

from . models import *

class UserSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True)
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'email', 'user_type']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
    

class StudentStaffUserSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True)
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

  
class StudentSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    user = serializers.CharField(read_only=True)
    course = serializers.CharField(read_only=False)

    class Meta:
        model = Student
        fields = '__all__'

    # overiding update method that works when we call ser.save in update method
    def update(self, instance, validated_data): 
        course_name = validated_data.pop('course', None)
        if course_name:
            try:
                course = Course.objects.get(course_name=course_name)
            except Course.DoesNotExist:
                raise serializers.ValidationError('Invalid course name')
            validated_data['course'] = course
        return super().update(instance, validated_data)


class StaffSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    user = serializers.CharField(read_only=True)

    class Meta:
        model = Staff
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Course
        fields = '__all__'


class BatchSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    course = serializers.CharField(read_only=True)

    class Meta:
        model = Batch
        fields = ['id','course','batch_name','start_date','end_date']

    def create(self, validated_data):
        course = self.context.get('course')
        return course.batch_set.create(**validated_data)
    

class StudentBatchSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    batch = serializers.CharField(read_only=True)
    student = serializers.CharField(read_only=True)

    class Meta:
        model = StudentBatch
        fields = '__all__'


class StaffBatchSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    staff = serializers.CharField(read_only=True)
    batch = serializers.CharField(read_only=True)

    class Meta:
        model = StaffBatch
        fields = '__all__'


class AssignmentSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    batch = serializers.CharField(read_only=True)

    class Meta:
        model = Assignments
        fields = '__all__'
    
    def create(self, validated_data):
        batch = self.context.get('batch')
        return batch.assignments_set.create(**validated_data)
    
    
class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    user = serializers.CharField(read_only=True)
    assignment = serializers.CharField(read_only=True)

    class Meta:
        model = AssignmentSubmission
        fields = '__all__'


class AnnocementSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    user = serializers.CharField(read_only=True)
    batch = serializers.CharField(read_only=True)

    class Meta:
        model = Announcement
        fields = '__all__'

    def create(self, validated_data):
        batch = self.context.get('batch')
        return Announcement.objects.create(batch_id=batch,**validated_data)
    

class RecordedClassSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    batch = serializers.CharField(read_only=True)

    class Meta:
        model = RecordedClass
        fields = '__all__'
    
    def create(self, validated_data):
        batch = self.context.get('batch')
        return batch.recordedclass_set.create(**validated_data)


