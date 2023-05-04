from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from . models import CustomUser, Student, Staff, AssignmentSubmission, Announcement

@receiver(post_save, sender=CustomUser)
def create_stud_staff_profile(sender, instance, created, **kwargs):
    if created:
        if instance.user_type == 'student':
            Student.objects.create(user=instance)
        elif instance.user_type == 'staff':
            Staff.objects.create(user=instance)
    else:
        if instance.user_type == 'student':
            instance.student.save()
        elif instance.user_type == 'staff':
            instance.staff.save()

@receiver(post_save, sender=AssignmentSubmission)
def create_announcement(sender, instance, **kwargs):
    if instance.approved:
        Announcement.objects.create(
            user=instance.user,
            text='Assignment approved',
            date_created=timezone.now().date()
        )