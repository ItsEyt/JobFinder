from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import APIException

from ..serializers import HumanSerializer
from ..models import Human

# Create your views here.

@api_view(['GET'])
def getHuman(request, id=None):
    if id:
        try:
            humanToGet = Human.objects.get(_id=id)
            print(HumanSerializer.fullSerializer(humanToGet))
            return JsonResponse(HumanSerializer.fullSerializer(humanToGet), safe=False)
        except:
            return JsonResponse({"fuck":"shit"})
        

@api_view(['POST'])
def createHuman(request):
    data = request.data
    try:
        Human.objects.create(
            first_name = data["first_name"],
            last_name = data["last_name"],
            image = data["image"],
            skills = data["skills"]
        )
    except Exception as e:
        raise APIException(e)
    return JsonResponse(f"succesfully created user")

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteHuman(request, id=None):
    if id == request.user.id:
        try:
            humanToDelete = Human.objects.get(_id = id)
            humanToDelete.is_active = False
            humanToDelete.save()
        except Exception as e:
            raise APIException(e)
        return JsonResponse("deleted user {id}")
    return JsonResponse(f"failed to delete, no such id {id}")

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateHuman(request,id=None):
    data = request.data
    if id == request.user.id:
        try:
            updateHuman = Human.objects.get(_id = id)
            for value,key in data.entries():
                if key in updateHuman.keys(): updateHuman[key] = value
            updateHuman.save()
        except Exception as e:
            raise APIException(e)
        return JsonResponse(f"succesfully updated user {id}")
    return JsonResponse(f"failed to update user {id}")
    