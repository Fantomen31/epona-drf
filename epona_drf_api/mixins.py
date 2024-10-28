from rest_framework import status
from rest_framework.response import Response
from rest_framework.settings import api_settings

class MultipleSerializerMixin:
    """
    Mixin to use multiple serializers in a single view.
    """
    serializer_classes = {
        'default': None,
    }

    def get_serializer_class(self):
        # Return the appropriate serializer class based on the current action
        return self.serializer_classes.get(self.action, self.serializer_classes['default'])