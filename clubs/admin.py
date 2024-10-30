from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import Club, ClubMembership, ClubJoinRequest, ClubStatistics, ClubRunUp

User = get_user_model()

@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    list_display = ('name', 'main_city', 'creator', 'visibility', 'membership_type', 'created_at')
    list_filter = ('visibility', 'membership_type', 'main_city')
    search_fields = ('name', 'description', 'main_city__name', 'creator__username')
    date_hierarchy = 'created_at'
    filter_horizontal = ('sister_cities',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description', 'creator')
        }),
        ('Location', {
            'fields': ('main_city', 'sister_cities')
        }),
        ('Settings', {
            'fields': ('visibility', 'membership_type')
        }),
        ('Contact Information', {
            'fields': ('contact_email', 'website', 'social_links')
        }),
        ('Schedule', {
            'fields': ('weekly_meetup_schedule',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(ClubMembership)
class ClubMembershipAdmin(admin.ModelAdmin):
    list_display = ('user', 'club', 'role', 'joined_at', 'total_distance', 'average_pace')
    list_filter = ('role', 'joined_at', 'club')
    search_fields = ('user__username', 'club__name')
    date_hierarchy = 'joined_at'
    readonly_fields = ('joined_at',)

@admin.register(ClubJoinRequest)
class ClubJoinRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'club', 'status', 'created_at', 'processed_at', 'processed_by')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'club__name')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'processed_at')

@admin.register(ClubStatistics)
class ClubStatisticsAdmin(admin.ModelAdmin):
    list_display = ('club', 'total_members', 'total_distance', 'total_runups', 'last_updated')
    list_filter = ('last_updated',)
    search_fields = ('club__name',)
    readonly_fields = ('last_updated',)

    fieldsets = (
        ('Club Information', {
            'fields': ('club',)
        }),
        ('Member Statistics', {
            'fields': ('total_members',)
        }),
        ('Distance Statistics', {
            'fields': ('total_distance', 'weekly_distance', 'monthly_distance', 'yearly_distance')
        }),
        ('RunUp Statistics', {
            'fields': ('total_runups', 'average_runup_attendance', 'average_pace')
        }),
        ('Timestamps', {
            'fields': ('last_updated',),
            'classes': ('collapse',)
        }),
    )

@admin.register(ClubRunUp)
class ClubRunUpAdmin(admin.ModelAdmin):
    list_display = ('title', 'club', 'date_time', 'distance', 'created_by')
    list_filter = ('date_time', 'club', 'created_by')
    search_fields = ('title', 'description', 'club__name', 'created_by__username')
    date_hierarchy = 'date_time'
    filter_horizontal = ('participants',)
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'club', 'created_by')
        }),
        ('Run Details', {
            'fields': ('date_time', 'meeting_point', 'distance', 'pace')
        }),
        ('Participants', {
            'fields': ('participants',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('club', 'created_by')