from django.contrib import admin
from .models import User, Company, Job, Human, Connection
# Register your models here.

@admin.display(description="Name")
def upper_case_name(obj):
    return f"{obj.first_name} {obj.last_name}".upper()

class HumanAdmin(admin.ModelAdmin):
    list_display = [upper_case_name]

admin.site.register(User)
admin.site.register(Company)
admin.site.register(Job)
admin.site.register(Human, HumanAdmin)
admin.site.register(Connection)