from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    _id = models.BigAutoField(primary_key = True)
    email = models.EmailField(blank=False,null=False, unique=True)
    username = models.CharField(max_length=30, blank=False, unique=True)
    password = models.CharField(max_length=20, blank=False)
    is_company = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username

class Human(models.Model):
    _id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to="pfpHuman", default="placeholderHuman.png")
    skills = models.JSONField(default=dict, blank=True)
    is_active = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.first_name + " " + self.last_name

class Company(models.Model):
    class Meta:
        verbose_name_plural = "Companies"

    _id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="pfpCompany", default="placeholderCompany.png")

    def __str__(self):
        return self.name

class Job(models.Model):
    _id = models.BigAutoField(primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=30, blank=False)
    preferred_skills = models.JSONField(default=dict)
    connections = models.ManyToManyField('Human', through="Connection", related_name = 'job_human')
    
    def __str__(self):
        return f'{self.title} - {self.company.name}'

class Connection(models.Model):
    company = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='company_to_job')
    human = models.ForeignKey(Human, on_delete=models.CASCADE, related_name='human_to_job')
    did_human_accept = models.BooleanField(default=False)
    did_job_accept = models.BooleanField(default=False)