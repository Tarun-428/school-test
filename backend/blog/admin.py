from django.contrib import admin
from .models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author', 'is_published', 'published_at')
    list_filter = ('category', 'is_published')
    search_fields = ('title', 'content', 'author')
    prepopulated_fields = {'slug': ('title',)}
