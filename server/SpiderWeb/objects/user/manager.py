from django.contrib.auth.models import (
    BaseUserManager,
)


class UserManager(BaseUserManager):
    def _create_user(self, username, email, password, **kwargs):
        """Create and return a `User` with an email, phone number, username and password."""
        if password is None:
            raise TypeError("Superusers must have a password.")
        if username is None:
            raise TypeError("Users must have a username.")

        user = self.model(username=username, email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, username, email, password, **kwargs):
        kwargs.setdefault("is_staff", False)
        kwargs.setdefault("is_superuser", False)
        self._create_user(username, email, password, kwargs)

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError("Superusers must have a password.")
        if username is None:
            raise TypeError("Superusers must have an username.")

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user
