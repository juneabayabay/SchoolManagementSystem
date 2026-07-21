from django.db import models
from students.models import Student
from subjects.models import Subject

class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    semester = models.CharField(max_length=20)
    school_year = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.student} - {self.subject}"
