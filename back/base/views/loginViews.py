from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import NotFound

from ..models import Company, Human, User


class LoginTokenSer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['staff'] = user.is_staff
        token['admin'] = user.is_superuser
        return token


class LoginToken(TokenObtainPairView):
    serializer_class = LoginTokenSer


@api_view(['POST'])
def register(req):
    data = req.data
    print(data)
    try:
        createdUser = User.objects.create_user(
            username=data["username"],
            password=data["pass"],
            email=data["email"],
            is_company=data["isCompany"],
        )
        if data["isCompany"]:
            Company.objects.create(
                name=data["comapny_name"] or None,
                image=data["img"] or None,
                user=createdUser
            )
        else:
            Human.objects.create(
                user=createdUser,
                last_name=data["last_name"] or None,
                first_name=data["first_name"] or None,
                image=data["image"] or None,
                skills=data["skills"] or None,
            )
    except Exception as e:
        print(f"something went wrong {e}")
        return HttpResponse(e)
    return HttpResponse('successfully created User')
