from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    EDUCATION_LEVELS = [
        ('ilkokul', 'İlkokul'),
        ('ortaokul', 'Ortaokul'),
        ('lise', 'Lise'),
        ('universite', 'Üniversite'),
        ('profesyonel', 'Profesyonel'),
    ]

    wallet_address = models.CharField(max_length=42, unique=True, null=True, blank=True)
    education_level = models.CharField(
        max_length=20, 
        choices=EDUCATION_LEVELS,
        default='ilkokul'
    )
    points = models.IntegerField(default=0)

    # AbstractUser'dan gelen alanlar için related_name ekleyelim
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name='custom_user_set',
        related_query_name='custom_user'
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='custom_user_set',
        related_query_name='custom_user'
    )

    # Özel alanlarımız
    wallet_address = models.CharField(max_length=42, unique=True, null=True, blank=True)
    education_level = models.CharField(max_length=20, choices=EDUCATION_LEVELS, null=True)
    interests = models.JSONField(default=dict, blank=True)
    points = models.IntegerField(default=0)
    completed_courses = models.JSONField(default=list, blank=True)
    owned_nfts = models.JSONField(default=list, blank=True)
    achievements = models.JSONField(default=list, blank=True)
    quiz_history = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.username

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_education_level_display(self):
        return dict(self.EDUCATION_LEVELS).get(self.education_level, '')

    def add_points(self, points):
        self.points += points
        self.save()

    def update_wallet(self, wallet_address):
        self.wallet_address = wallet_address
        self.save()

    def add_completed_course(self, course_id):
        if self.completed_courses is None:
            self.completed_courses = []
        if course_id not in self.completed_courses:
            self.completed_courses.append(course_id)
            self.save()

    def add_nft(self, nft_id):
        if self.owned_nfts is None:
            self.owned_nfts = []
        if nft_id not in self.owned_nfts:
            self.owned_nfts.append(nft_id)
            self.save()

    def add_achievement(self, achievement_id):
        if self.achievements is None:
            self.achievements = []
        if achievement_id not in self.achievements:
            self.achievements.append(achievement_id)
            self.save()