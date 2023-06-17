from .models import *
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class HumanSerializer(ModelSerializer):
    class Meta:
        model = Human
        fields = '__all__'

    def fullSerializer(self):
        return {
            "_id": self._id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "image": self.image.url,
            "connections": ConnectionSerializer(self.connections, many=True).data,
            "skills": self.skills,
            "is_active": self.is_active,
            "user": UserSerializer(self.user).data
        }

class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

    def FullSerializer(self):
        return {
            "_id": self._id,
            "name": self.name,
            "user": UserSerializer(self.user).data,
            "image": self.image.url,
        }
    
class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"

    def FullSerializer(self):
        return {
            "company": self.company,
            "title": self.title,
            "preffered_skills": self.preffered_skills,
            "connections": ConnectionSerializer.fullSerializer(self.connections, many=True)
        }
    
class ConnectionSerializer(ModelSerializer):
    class Meta:
        model = Connection
        fields = "__all__"

    def fullSerializer(self):
        return {
            "human": HumanSerializer.fullSerializer(self.human),
            "didHumanAccept": self.didHumanAccept,
            "toConnectWith": CompanySerializer.FullSerializer(self.toConnectWith),
            "didJobAccept": self.didJobAccept
        }