from rest_framework_simplejwt.authentication import (
    JWTAuthentication
)

from rest_framework_simplejwt.exceptions import (
    InvalidToken
)


class CookieJWTAuthentication(
    JWTAuthentication
):

    def authenticate(
        self,
        request
    ):

        print(
            "COOKIES:",
            request.COOKIES
        )

        raw_token = request.COOKIES.get(
            "access"
        )

        print(
            "TOKEN:",
            raw_token
        )

        if raw_token is None:

            print(
                "NO ACCESS COOKIE"
            )

            return None

        try:

            validated_token = (
                self.get_validated_token(
                    raw_token
                )
            )

            print(
                "TOKEN VALID"
            )

            user = self.get_user(
                validated_token
            )

            print(
                "USER:",
                user.email
            )

            return (
                user,

                validated_token
            )

        except InvalidToken as e:

            print(
                "INVALID TOKEN:",
                str(e)
            )

            return None

        except Exception as e:

            print(
                "AUTH ERROR:",
                str(e)
            )

            return None