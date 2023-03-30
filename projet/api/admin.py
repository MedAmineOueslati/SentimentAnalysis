from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Expert, UserAccount

# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton


admin.site.register(UserAccount)
admin.site.register(Expert)
