from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Expert, UserAccount

admin.site.index_title = "Administration"
admin.site.site_header = "Administration"
admin.site.site_title = "Expert"

admin.site.register(UserAccount)
admin.site.register(Expert)
