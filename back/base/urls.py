from django.urls import path
from .views import humanViews, loginViews
urlpatterns = [

    # AUTH paths
    path('register/', loginViews.register),
    path('login/', loginViews.LoginToken.as_view(), name='login'),

    # HUMAN paths
    path('createHuman/', humanViews.createHuman),
    path('deleteHuman/', humanViews.deleteHuman),
    path('getHuman/', humanViews.getHuman),
    path('getHuman/<str:id>', humanViews.getHuman),
    path('updateHuman/<str:id>', humanViews.updateHuman),
    path('pairjobstohuman/', humanViews.pairJobsToHuman),
    path('pairjobstohuman/<str:id>', humanViews.pairJobsToHuman),
]
