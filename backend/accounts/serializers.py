from rest_framework import serializers
from accounts.models import User



from accounts.utils import Util

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
        validate_data.pop("password2", None)
        return User.objects.create_user(**validate_data)
        

class UserLoginSerializer(serializers.ModelSerializer):   
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email', 'password'] 


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        user = self.context.get('user') 
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        user.set_password(attrs['password'])
        user.save()
        return attrs


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("You are not a registered user.")
        return value


class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
        

        
class UserLogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    class Meta:
        fields = ['refresh']
    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs
    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')
    
            