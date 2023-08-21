from .models import *
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('_id', 'username', 'is_company', 'is_admin')


class FullUserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('_id', 'email', 'username', 'password', 'is_company', 'is_admin')


class HumanSerializer(ModelSerializer):
    user = UserSerializer(read_only=True, many=False)

    class Meta:
        model = Human
        fields = ('_id', 'first_name', 'last_name', 'image', 'skills', 'is_active', 'user')


class CompanySerializer(ModelSerializer):
    user = UserSerializer(read_only=True, many=False)

    class Meta:
        model = Company
        fields = ('_id', 'image', 'name', 'user')


class ConnectionSerializer(ModelSerializer):
    # company = CompanySerializer()
    human = HumanSerializer(read_only=True, many=False)

    class Meta:
        model = Connection
        fields = ('id', 'did_human_accept', 'did_job_accept', 'human')


class JobSerializer(ModelSerializer):
    company_to_job = ConnectionSerializer(many=True, read_only=True)
    company = CompanySerializer(many=False, read_only=True)

    class Meta:
        model = Job
        fields = ('_id', 'title', 'company', 'preferred_skills', 'company_to_job')
