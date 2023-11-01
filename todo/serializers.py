from rest_framework import serializers
from . import models

class TodoSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Todo
        fields = '__all__'