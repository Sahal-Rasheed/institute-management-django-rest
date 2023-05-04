from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken

from . models import CustomUser

def get_user(request):
    auth_header = request.META.get('HTTP_AUTHORIZATION')
    if auth_header is None:
        raise AuthenticationFailed('Authorization header missing')

    try:
        # Get the access token from the request header
        access_token = auth_header.split(' ')[1]
        # Decode the token payload
        token = AccessToken(access_token)
        payload = token.payload
        # Get the user ID from the token payload
        user_id = payload.get('user_id')
        # Retrieve the user object using the user ID
        user = CustomUser.objects.get(id=user_id)
        return user
    except (IndexError, AccessToken.DoesNotExist, CustomUser.DoesNotExist):
        raise AuthenticationFailed('Invalid access token')
