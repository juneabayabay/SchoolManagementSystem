from django.db import models
from teachers.models import Teacher

class Subject(models.Model):
    subject_code = models.CharField(max_length=20, unique=True)
    subject_name = models.CharField(max_length=100)
    units = models.PositiveIntegerField()
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.subject_name
