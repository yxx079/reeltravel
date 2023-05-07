from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.core import mail
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator

import users.views


class EmailConfirmationTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass'
        )

    def test_email_confirmation(self):
        # Send confirmation email
        users.views.send_confirmation_email(self.client, self.user.email)

        # Check that the email was sent
        self.assertEqual(len(mail.outbox), 1)

        # Get the confirmation URL from the email
        message = mail.outbox[0].body
        start = message.find('http://')
        end = message.find('\n', start)
        confirm_url = message[start:end]

        # Visit the confirmation URL
        response = self.client.get(confirm_url)

        # Check that the user is now authenticated and redirected to dashboard
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('dashboard'))
        user = User.objects.get(pk=self.user.pk)
        self.assertTrue(user.is_active)
