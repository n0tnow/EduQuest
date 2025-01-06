from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    try:
        data = request.data
        print("Received data:", data)  # Debug için

        # Kullanıcı oluştur
        user = User.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        
        # Eğitim seviyesini ayrıca set et
        user.education_level = data['education_level']
        user.save()

        # Token oluştur
        refresh = RefreshToken.for_user(user)

        return Response({
            'token': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'education_level': user.education_level
            }
        }, status=status.HTTP_201_CREATED)

    except KeyError as e:
        return Response({
            'message': f'Missing field: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    try:
        data = request.data
        print("Received login data:", data)  # Debug için

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return Response({
                'message': 'Email ve şifre zorunludur'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Önce email ile kullanıcıyı bul
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({
                'message': 'Kullanıcı bulunamadı'
            }, status=status.HTTP_404_NOT_FOUND)

        # Şifre kontrolü
        user = authenticate(username=user.username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                'token': access_token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'education_level': user.education_level,
                    'wallet_address': user.wallet_address
                }
            })
        else:
            return Response({
                'message': 'Geçersiz şifre'
            }, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        print("Login error:", str(e))  # Debug için
        return Response({
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_wallet(request):
    try:
        data = request.data
        print("Received wallet update data:", data)  # Debug için

        wallet_address = data.get('wallet_address')
        if not wallet_address:
            return Response({
                'message': 'Cüzdan adresi zorunludur'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Cüzdan adresi başka bir kullanıcıda var mı kontrol et
        if User.objects.filter(wallet_address=wallet_address).exclude(id=request.user.id).exists():
            return Response({
                'message': 'Bu cüzdan adresi başka bir hesaba bağlı'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Kullanıcının cüzdan adresini güncelle
        request.user.wallet_address = wallet_address
        request.user.save()

        return Response({
            'message': 'Cüzdan adresi başarıyla güncellendi',
            'wallet_address': wallet_address
        })

    except Exception as e:
        print("Wallet update error:", str(e))  # Debug için
        return Response({
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    try:
        user = request.user
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'education_level': user.education_level,
                'wallet_address': user.wallet_address,
                'points': user.points,
                'completed_courses': user.completed_courses,
                'owned_nfts': user.owned_nfts,
                'achievements': user.achievements
            }
        })
    except Exception as e:
        print("Profile fetch error:", str(e))  # Debug için
        return Response({
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)