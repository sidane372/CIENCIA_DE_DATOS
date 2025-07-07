from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],  # puede ser nombre o algo similar
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        identifier = data.get('identifier')
        password = data.get('password')

        # Buscar por email o username
        user = User.objects.filter(email=identifier).first()
        if not user:
            user = User.objects.filter(username=identifier).first()

        if not user:
            raise serializers.ValidationError("Usuario no encontrado")

        if not user.check_password(password):
            raise serializers.ValidationError("Contraseña incorrecta")

        data['user'] = user
        return data