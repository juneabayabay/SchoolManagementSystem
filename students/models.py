from django.db import models

class Student(models.Model):
    GENDER_CHOICES = [('M', 'Male'), ('F', 'Female')]
    student_number = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(
    max_length=10,
    choices=GENDER_CHOICES,
    null=True,
    blank=True,)
    course = models.CharField(max_length=100)
    year_level = models.IntegerField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"