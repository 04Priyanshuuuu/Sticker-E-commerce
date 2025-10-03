from rest_framework import serializers
from accounts.models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True) 
    class Meta:
        model = User
        fields = [ 'email','name', 'password','password2']
        extra_kwargs = {
            'password': {'write_only': True}
            }

# validate that both passwords match
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
     
    def create(self, validate_data):
        return User.objects.create_user(**validate_data)
        

class UserLoginSerializer(serializers.ModelSerializer):  
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email', 'password']      