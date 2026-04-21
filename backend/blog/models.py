from django.db import models


class BlogPost(models.Model):
    CATEGORY_CHOICES = [
        ('exam_tips', 'Exam Preparation Tips'),
        ('career', 'Career Guidance'),
        ('news', 'News & Announcements'),
        ('achievement', 'Student Achievements'),
    ]

    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=280, unique=True)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='news')
    excerpt = models.TextField(max_length=500, blank=True)
    content = models.TextField()
    cover_image_url = models.URLField(blank=True, default='')
    author = models.CharField(max_length=150, default='Admin')
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-published_at']
        verbose_name_plural = 'Blog Posts'
