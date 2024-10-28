from django.contrib import admin
from .models import RunUp

@admin.register(RunUp)
class RunUpAdmin(admin.ModelAdmin):
    list_display = ('host', 'city', 'date_time', 'visibility', 'is_active', 'distance', 'duration')
    list_filter = ('visibility', 'is_active', 'city')
    search_fields = ('host__username', 'city', 'location')
    date_hierarchy = 'date_time'
    ordering = ('-date_time',)

    fieldsets = (
        ('Basic Information', {
            'fields': ('host', 'description', 'location', 'city', 'date_time')
        }),
        ('Run Details', {
            'fields': ('distance', 'pace', 'duration', 'route')
        }),
        ('Visibility and Status', {
            'fields': ('visibility', 'is_active')
        }),
        ('Participants', {
            'fields': ('participants',)
        }),
    )

    readonly_fields = ('created_at', 'updated_at')

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('host')

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "host":
            kwargs["queryset"] = User.objects.order_by('username')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "participants":
            kwargs["queryset"] = User.objects.order_by('username')
        return super().formfield_for_manytomany(db_field, request, **kwargs)